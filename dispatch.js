'use strict';

const orderCoffee = require('./orderCoffeeBot/orderCoffee');
const greetUser = require('./greetUser');

module.exports = function(intentRequest) {
  console.log(`dispatch userId=${intentRequest.userId}, intentName=${intentRequest.currentIntent.name}`);
  const intentName = intentRequest.currentIntent.name;

  console.log(intentName + ' was called');
  if (intentName === 'CoffeeOrder') {
    return orderCoffee(intentRequest);
  }

  if (intentName === 'GreetingIntent') {
    return greetUser(intentRequest);
  }

  throw new Error(`Intent with name ${intentName} not supported`);
};
