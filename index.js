/* jshint node: true */
'use strict';

const chalk       = require('chalk');

module.exports = {
  name: 'ember-redux-router',
  description: 'adds routing to the redux state machine',
  included(app, parentAddon) {
    const target = (parentAddon || app);
    this._super.included(target);

    if (!app.registry.availablePlugins['ember-redux-thunk']) {
      console.log(`${chalk.red.bold('WARNING: ')} the ${chalk.bold('ember-redux-router')} addon requires use of a thunking middleware. Typically this means ${chalk.green.bold('ember-redux-thunk')} but you're free to use whichever one you like. If you have an alternative you're using and want to remove this message then add "ember-redux-router.notify" in your environment to false.`);
      console.log();
    }
  }
};
