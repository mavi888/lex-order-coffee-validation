'use strict';

const lexResponses = require('./lexResponses');

const types = ['latte', 'americano', 'cappuccino', 'expresso'];
const sizes = ['double', 'normal', 'large'];

function buildValidationResult(isValid, violatedSlot, messageContent) {
    if (messageContent == null) {
        return {
            isValid,
            violatedSlot,
        };
    }
    return {
        isValid,
        violatedSlot,
        message: { contentType: 'PlainText', content: messageContent },
    };
}

function validateCoffeeOrder(coffeeType, coffeeSize) {
    if (coffeeType && types.indexOf(coffeeType.toLowerCase()) === -1) {
      return buildValidationResult(false, 'coffee', `We do not have ${coffeeType}, would you like a different type of coffee?  Our most popular coffee is americano.`);
    }

    if (coffeeSize && sizes.indexOf(coffeeSize.toLowerCase()) === -1) {
      return buildValidationResult(false, 'size', `We do not have ${coffeeSize}, would you like a different size of coffee? Our most popular size is normal.`);
    }

    if (coffeeType && coffeeSize) {
      //Latte and cappuccino can be normal or large
      if ((coffeeType.toLowerCase() === 'cappuccino' || coffeeType.toLowerCase() === 'latte')
          && !(coffeeSize.toLowerCase() === 'normal' || coffeeSize.toLowerCase() === 'large')) {
        return buildValidationResult(false, 'size', `We do not have ${coffeeType} in that size. Normal or large are the available sizes for that drink.`);
      }

      //Expresso can be normal or double
      if ((coffeeType.toLowerCase() === 'expresso')
          && !(coffeeSize.toLowerCase() === 'normal' || coffeeSize.toLowerCase() === 'double')) {
        return buildValidationResult(false, 'size', `We do not have ${coffeeType} in that size. Normal or double are the available sizes for that drink.`);
      }

      //Americano is always normal
      if ((coffeeType.toLowerCase() === 'americano') && (coffeeSize.toLowerCase() !== 'normal')) {
        return buildValidationResult(false, 'size', `We do not have ${coffeeType} in that size. Normal is the available sizes for that drink.`);
      }
    }

    return buildValidationResult(true, null, null);
}

module.exports = function(intentRequest, callback) {
  var coffeeType = intentRequest.currentIntent.slots.coffee;
  var coffeeSize = intentRequest.currentIntent.slots.size;
  console.log(coffeeType + ' ' + coffeeSize);

  const source = intentRequest.invocationSource;

  if (source === 'DialogCodeHook') {
    const slots = intentRequest.currentIntent.slots;
    const validationResult = validateCoffeeOrder(coffeeType, coffeeSize);

    if (!validationResult.isValid) {
      slots[`${validationResult.violatedSlot}`] = null;
      callback(lexResponses.elicitSlot(intentRequest.sessionAttributes, intentRequest.currentIntent.name, slots, validationResult.violatedSlot, validationResult.message));
      return;
    }

    //If size is not define then set it as normal
    if (coffeeSize == null) {
      intentRequest.currentIntent.slots.size = 'normal';
    }
    console.log(intentRequest.currentIntent.slots);

    callback(lexResponses.delegate(intentRequest.sessionAttributes, intentRequest.currentIntent.slots));
    return;
  }
}
