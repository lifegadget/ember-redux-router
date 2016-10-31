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
