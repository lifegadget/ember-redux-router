import routeReducer from 'ember-redux-router/redux/reducers/route-reducer';
import * as actions from 'ember-redux-router/redux/actions/router-actions';

export function initialize(app) {
  const router = app.lookup('router:main');
  const redux = app.lookup('service:redux');
  const _willTransition = router.willTransition.bind(router);
  const _didTransition = router.didTransition.bind(router);
  redux.addAddonReducer('@router', routeReducer);

  const replacementWillTransition = function willTransition(oldRoute, newRoute, transition) {
    redux.dispatch(actions.requestTransition(_willTransition, oldRoute, newRoute, transition));
  };

  const replacementDidTransition = function didTransition(...args) {
    const [oldRoute, newRoute, transition] = args;
    redux.dispatch(actions.successfulTransition(_didTransition, oldRoute, newRoute, transition));
  };

  // Intercept Hooks
  router.willTransition = replacementWillTransition.bind(router);
  router.didTransition = replacementDidTransition.bind(router);

  // Listen for state changes
  // const changeListener = (pre, postChange /** , change */ ) => {
  //   if(postChange['@router'].get('state') === 'requesting-change') {
  //     const { requestedName, requestedDynamicSegments, requestedOptions } = postChange['@router'].toJS();
  //     const args = [];
  //     if (requestedDynamicSegments.length > 0) { args.push(requestedDynamicSegments); }
  //     if (Object.keys(requestedOptions).length > 0) { args.push(requestedOptions); }
  //     const transitionState = args.length > 0
  //       ? router._transitionTo(requestedName,  ...args)
  //       : router._transitionTo(requestedName[0]);

  //     redux.dispatch(actions.transitioning());
  //     transitionState
  //       .then(data => {
  //         redux.dispatch(actions.successfulTransition(navigator, data));
  //       })
  //       .catch(err => {
  //         redux.dipatch(actions.failedTransition(navigator, err));
  //       });
  //   } else {
  //     // TODO handle other states
  //   }
  // };
  // redux.subscribe(changeListener.bind(this));
}

export default {
  name: 'redux-router',
  initialize
};

