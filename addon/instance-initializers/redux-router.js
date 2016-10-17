export function initialize(app) {
  const router = app.lookup('router:main');
  const _transitionTo = router.transitionTo.bind(router);
  const redux = app.lookup('service:redux');

  const transitionTo = function transitionTo(name, models, options) {
    console.log('transitionTo');
    redux.dispatch({
      type: '@@ROUTER:TRANSITION_REQUESTED',
      name,
      models,
      options
    });
  };

  const routeReducer = (state, action) => {
    console.log('reducer', action);
    switch(action.type) {
      case '@@ROUTER:TRANSITION_REQUESTED':
        const transition = _transitionTo(action.name, action.models, action.options);
        if(transition.error) {
          redux.dispatch({
            type: '@@ROUTER:TRANSITION_REJECTED',
            transition
          });
        } else {
          redux.dispatch({
            type: '@@ROUTER:TRANSITION_COMPLETED',
            transition
          });
        }
        return state;

      case '@@ROUTER:TRANSITION_COMPLETED':
        return {
          url: 'xyz',
          route: 'x.y.z'
        }

    }
  };
  //   const transition = _transitionTo(...arguments);

  //   // return transition;


  router._transitionTo = _transitionTo;
  router.transitionTo = transitionTo.bind(router);
  redux.addAddonReducer('route', routeReducer, {
    route: 'index',
    url: '/'
  });
}


export default {
  name: 'redux-router',
  initialize
};
