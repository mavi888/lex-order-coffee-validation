'use strict';

const dispatch = require('./dispatch');

module.exports.intents = (event, context, callback) => {
  try {
    console.log(`event.bot.name=${event.bot.name}`);
    dispatch(event, (response) => callback(null, response));
  } catch (err) {
    callback(err);
  }
};
