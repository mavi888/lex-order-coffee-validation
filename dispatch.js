'use strict';

const orderCoffee = require('./orderCoffee');

module.exports = function(intentRequest, callback) {
  console.log(`dispatch userId=${intentRequest.userId}, intentName=${intentRequest.currentIntent.name}`);
  const intentName = intentRequest.currentIntent.name;

  if (intentName === 'CoffeeOrder') {
    console.log(intentName + ' was called');
    return orderCoffee(intentRequest, callback);
  }

  throw new Error(`Intent with name ${intentName} not supported`);
}
