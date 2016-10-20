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


export const requestTransition = function requestTransition(navigator, name, ...rest) {
  const { dynamicSegments, options } = getParameters(rest);
  return {
    type: '@ROUTER:TRANSITION_REQUESTED',
    state: 'requesting-change',
    route: get(navigator, 'currentPath'),
    routeContexts: get(navigator, 'routeContexts'),
    routeIsIndex: get(navigator, 'isIndexRoute'),
    url: get(navigator, 'signature'),
    requestedName: name,
    requestedDynamicSegments: dynamicSegments,
    requestedOptions: options,
  };
};

export const transitioning = function transitioning() {
  return {
    type: '@ROUTER:TRANSITIONING',
    state: 'transitioning'
  };
};

export const successfulTransition = function successfulTransition(navigator) {
  return {
    type: '@ROUTER:TRANSITION_SUCCESSFUL',
    state: 'completed',
    route: get(navigator, 'currentPath'),
    routeContexts: get(navigator, 'routeContexts'),
    routeIsIndex: get(navigator, 'isIndexRoute'),
    url: get(navigator, 'signature')
  };
};

export const failedTransition = function failedTransition(navigator, err) {
  return {
    type: '@ROUTER:TRANSITION_FAILED',
    state: 'static-after-failure',
    error: err
  };
};
