'use strict';

const orderCoffee = require('./orderCoffeeBot/orderCoffee');

module.exports = function(intentRequest) {
  console.log(`dispatch userId=${intentRequest.userId}, intentName=${intentRequest.currentIntent.name}`);
  const intentName = intentRequest.currentIntent.name;

  if (intentName === 'CoffeeOrder') {
    console.log(intentName + ' was called');
    return orderCoffee(intentRequest);
  }

  throw new Error(`Intent with name ${intentName} not supported`);
};
