import Ember from 'ember';
import routeReducer from 'ember-redux-router/redux/reducers/route-reducer';
import * as actions from 'ember-redux-router/redux/actions/router-actions';

const {isEmpty, typeOf } = Ember;

const errorHandler = (error, transition) => {
  this.get('redux').dispatch({
    type: '@ROUTER:TRANSITION_REJECTED',
    error,
    transition
  });
};

/**
 * getParameters
 *
 * takes all the possible inputs to "transitionTo" and boils it
 * down to a minimal set. Without this the transitionTo function will
 * complain for anything but the most complex routes
 */
const getParameters = function getParameters(stuff = []) {
  const hasOptions = typeOf(stuff[stuff.length - 1]) === 'object';
  return hasOptions
    ? { dynamicSegments: stuff.slice(0, -1), options: stuff.slice(-1) }
    : { dynamicSegments: stuff.slice(0, -1), options: {} };
};

export function initialize(app) {
  const router = app.lookup('router:main');
  const redux = app.lookup('service:redux');
  const navigator = app.lookup('service:navigator');
  const _transitionTo = router.transitionTo.bind(router);
  const _willTransition = router.willTransition.bind(router);
  const _didTransition = router.didTransition.bind(router);
  redux.addAddonReducer('@router', routeReducer);

  const replacementTransitionTo = function transitionTo(...args) {
    redux.dispatch(actions.requestTransition(navigator, args));
  };
  const replacementWillTransition = function willTransition(oldInfos, newInfos, transition) {
    _willTransition(oldInfos, newInfos, transition);
  };
  const replacementDidTransition = function didTransition(oldInfos, newInfos, transition) {
    _didTransition(oldInfos, newInfos, transition);
  };

  // Intercept
  router._transitionTo = _transitionTo;
  router.transitionTo = replacementTransitionTo.bind(router);
  router.willTransition = replacementWillTransition.bind(router);
  router.didTransition = replacementDidTransition.bind(router);

  // Listen for state changes
  const changeListener = (pre, postChange, change) => {
    if(postChange['@router'].get('state') === 'requesting-change') {
      const { requestedName, requestedDynamicSegments, requestedOptions } = postChange['@router'].toJS();
      const args = [];
      if (requestedDynamicSegments.length > 0) { args.push(requestedDynamicSegments); }
      if (Object.keys(requestedOptions).length > 0) { args.push(requestedOptions); }
      const transitionState = args.length > 0
        ? router._transitionTo(requestedName,  ...args)
        : router._transitionTo(requestedName[0]);

      redux.dispatch(actions.transitioning());
      transitionState
        .then(data => {
          redux.dispatch(actions.successfulTransition(navigator, data));
        })
        .catch(err => {
          redux.dipatch(actions.failedTransition(navigator, err));
        });
    } else {
      // TODO handle other states
    }
  };
  redux.subscribe(changeListener.bind(this));
}

export default {
  name: 'redux-router',
  initialize
};

