import Immutable from 'immutable';

const routeReducer = (state, action) => {

  const defaultValue = Immutable.OrderedMap({
    route: null,
    params: {},
    state: 'initializing'
  });

  switch(action.type) {
    case '@ROUTER:TRANSITION_REQUESTED':
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
      return Immutable.OrderedMap(action)
        .delete('type')
        .set('requestedAt', state.get('requestedAt'))
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
