/* jshint node: true */
'use strict';

const chalk       = require('chalk');

module.exports = {
  name: 'ember-redux-router',
  description: 'adds routing to the redux state machine',
  included(app, parentAddon) {
    const target = (parentAddon || app);
    this._super.included(target);
  }
};
