import Immutable from 'immutable';

const routeReducer = (state, action) => {

  const defaultValue = {
    name: 'index',
    model: undefined,
    options: {}
  };

  switch(action.type) {
    case '@ROUTER:TRANSITION_REQUESTED':
      console.log('transition requested');

      return Immutable.OrderedMap(action)
        .delete('type')
        .set('requestedAt', new Date())
        .set('lastUpdated', undefined);

    case '@ROUTER:TRANSITIONING':

      return Immutable.OrderedMap(action)
        .delete('type')
        .merge(state)
        .set('state', 'transitioning');

    case '@ROUTER:TRANSITION_SUCCESSFUL':
      console.log('success');

      return Immutable.OrderedMap(action)
        .delete('type')
        .merge(state)
        .set('state', 'complete')
        .set('lastUpdated', new Date());

    case '@ROUTER:TRANSITION_REJECTED':
      return Immutable.OrderedMap(action)
        .delete('type')
        .merge(state)
        .set('state', 'rejected')
        .set('lastUpdated', new Date());

    default:
      return state || defaultValue;
  }
};

export default routeReducer;
