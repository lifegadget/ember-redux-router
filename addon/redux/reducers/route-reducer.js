const routeReducer = (state, action) => {
  console.log('route reducer', action);

  const defaultValue = {
    name: 'index',
    model: 'index',
    options: {}
  };

  switch(action.type) {
    case '@ROUTER:TRANSITION_REQUESTED':
      console.log('transition requested');

      return {
        state: 'change-requested',
        transition: action.transition,
        lastUpdated: new Date(),
      };

    case '@ROUTER:TRANSITION_COMPLETED':
      return {
        url: 'xyz',
        route: 'x.y.z',
        state: 'transitioned',
      };

    case '@ROUTER:TRANSITION_REJECTED':
      return {
        url: 'xyz',
        route: 'x.y.z',
        state: 'rejected',
        transition: action.transition
      };

    default:
      return state || defaultValue;
  }
};

export default routeReducer;
