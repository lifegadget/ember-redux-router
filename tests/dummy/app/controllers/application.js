import Ember from 'ember';

export default Ember.Controller.extend({

  actions: {
    navigate(route) {
      this.transitionToRoute(route);
    }
  }
});
