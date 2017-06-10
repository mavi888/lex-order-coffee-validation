'use strict';

const lexResponses = require('../lexResponses');
const databaseManager = require('../databaseManager');

function buildFulfilmentResult(fullfilmentState, messageContent) {
  return {
    fullfilmentState,
    message: { contentType: 'PlainText', content: messageContent }
  };
}

function fullfilOrder(userId, coffeeType, coffeeSize) {
  return databaseManager.saveOrderToDatabase(userId, coffeeType, coffeeSize).then(item => {
    console.log(item.orderId);
    return buildFulfilmentResult('Fulfilled', `Thanks, your orderid ${item.orderId} has been placed and will be ready for pickup in the bar`);
  });
}

module.exports = function(intentRequest) {
  var coffeeType = intentRequest.currentIntent.slots.coffee;
  var coffeeSize = intentRequest.currentIntent.slots.size;
  var userId = intentRequest.userId;

  return fullfilOrder(userId, coffeeType, coffeeSize).then(fullfiledOrder => {
    return lexResponses.close(intentRequest.sessionAttributes, fullfiledOrder.fullfilmentState, fullfiledOrder.message);
  });
};
