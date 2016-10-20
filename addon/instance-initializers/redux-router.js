import Ember from 'ember';
import routeReducer from 'ember-redux-router/redux/reducers/route-reducer';

const { get, set, typeOf } = Ember;

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
  const _transitionTo = router.transitionTo.bind(router);

  const replacementTransitionTo = function transitionTo(name, ...rest) {
    return redux.dispatch(transitionActionThunk(name, ...rest)(redux.dispatch.bind(redux)));
  };

  // Add reducer and intercept route transition
  redux._transitionTo = _transitionTo;
  router.transitionTo = replacementTransitionTo.bind(router);
  redux.addAddonReducer('@router', routeReducer);

  /**
   * Returns a "thunk" for all async aspects of the transition
   * Note: this necessitates that a thunk middleware
   * is in place to handle this
   */
  const transitionActionThunk = (name, ...rest) => (dispatch) => {
    const { dynamicSegments, options } = getParameters(rest);
    const transition = _transitionTo(name, ...rest);
    console.log('starting thunk', dynamicSegments, options);
    dispatch({
      type: '@ROUTER:TRANSITION_REQUESTED',
      name,
      dynamicSegments,
      options,
      transition
    });

    transition
      .then(data => {
        dispatch({
          type: '@ROUTER:TRANSITION_COMPLETED',
          routeName: data.routeName,
          name,
          dynamicSegments,
          options
        });
      })
      .catch(err => {

      });

    // based on structure of transition we can determine whether transition has
    // been accepted
    console.log(transition);
    transition
      .then(data => {
        console.log('transition promise', data);
        dispatch({
          type: '@ROUTER:TRANSITION_COMPLETED',
          routeName: data.routeName,
          name,
          dynamicSegments
        });
      })
      .catch(err => {
        dispatch({
          type: '@ROUTER:TRANSITION_ERROR',
          error: err,
          name,
          dynamicSegments,
          options
        });
      });

  };
}

export default {
  name: 'redux-router',
  initialize
};

