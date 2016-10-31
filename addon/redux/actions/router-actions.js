import Ember from 'ember';
const { get, typeOf } = Ember;

/**
 * getParameters
 *
 * takes all the possible inputs to "transitionTo" and boils it
 * down to a minimal set. Without this the transitionTo function will
 * complain for anything but the most complex routes
 */
const getParameters = function getParameters(stuff) {
  if (!stuff) {
    return { dynamicSegments: [], options: {} };
  }
  const hasOptions = typeOf(stuff[stuff.length - 1]) === 'object';
  return hasOptions
    ? { dynamicSegments: stuff.slice(0, -1), options: stuff.slice(-1) }
    : { dynamicSegments: stuff.slice(0, -1), options: {} };
};


export const requestTransition = function requestTransition(willTransition, oldRoute, newRoute, transition) {
  const oldClone = oldRoute.slice(0).pop();
  const newClone = newRoute.slice(0).pop();
  const currentRoute = oldRoute && oldRoute.length > 0 ? oldClone.name : '';
  const requestedRoute = newClone.name;
  willTransition(oldRoute, newRoute, transition);
  return {
    type: '@ROUTER:TRANSITION_REQUESTED',
    state: 'transition-requested',
    route: currentRoute,
    requested: {
      route: requestedRoute,
      params: newClone.params
    }
  };
};

export const successfulTransition = function successfulTransition(didTransition, oldRoute, newRoute, transition) {
  const context = oldRoute.slice(0).pop();
  const route = context.name;
  const params = context.params;
  didTransition(oldRoute, newRoute, transition);
  return {
    type: '@ROUTER:TRANSITION_SUCCESSFUL',
    state: 'transitioned',
    params,
    route
  };
};

export const failedTransition = function failedTransition(navigator, err) {
  return {
    type: '@ROUTER:TRANSITION_FAILED',
    state: 'static-after-failure',
    error: err
  };
};
