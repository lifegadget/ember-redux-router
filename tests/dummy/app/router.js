import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('foo');
  this.route('bar');
  this.route('baz', function() {
    this.route('second');
    this.route('dynamic', { path: 'dynamic/:dynamic_segment'});
    this.route('hidden', { path: '/:hidden'});
  });
});

export default Router;
