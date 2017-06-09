const assert = require('chai').assert;

const orderCoffee = require('../orderCoffeeBot/orderCoffee');

describe('DialogCodeHook witn no slots', () => {
  it('Inital message - I will like to have a drink', done => {
    const intentRequest = {
      messageVersion: '1.0',
      invocationSource: 'DialogCodeHook',
      userId: 'faav875icgkzqzocqbluv1v2r4vf0l20',
      sessionAttributes: null,
      bot: { name: 'CaffeBotio', alias: null, version: '$LATEST' },
      outputDialogMode: 'Text',
      currentIntent: {
        name: 'CoffeeOrder',
        slots: { size: null, coffee: null },
        confirmationStatus: 'None'
      },
      inputTranscript: 'I will like to have a drink'
    };

    const expectedResponse = {
      sessionAttributes: null,
      dialogAction: { type: 'Delegate', slots: { size: 'normal', coffee: null } }
    };

    orderCoffee(intentRequest).then(response => {
      assert.equal(JSON.stringify(expectedResponse), JSON.stringify(response));
      done();
    });
  });
});

describe('DialogCodeHook with drink slot', () => {
  it('Inital message - I will like to order latte', done => {
    const intentRequest = {
      messageVersion: '1.0',
      invocationSource: 'DialogCodeHook',
      userId: 'faav875icgkzqzocqbluv1v2r4vf0l20',
      sessionAttributes: null,
      bot: { name: 'CaffeBotio', alias: null, version: '$LATEST' },
      outputDialogMode: 'Text',
      currentIntent: {
        name: 'CoffeeOrder',
        slots: { size: null, coffee: 'latte' },
        confirmationStatus: 'None'
      },
      inputTranscript: 'I will like to order latte'
    };

    const expectedResponse = {
      sessionAttributes: null,
      dialogAction: { type: 'Delegate', slots: { size: 'normal', coffee: 'latte' } }
    };

    orderCoffee(intentRequest).then(response => {
      assert.equal(JSON.stringify(expectedResponse), JSON.stringify(response));
      done();
    });
  });
});

describe('DialogCodeHook with 2 valid slot', () => {
  it('latte + normal', done => {
    const intentRequest = {
      messageVersion: '1.0',
      invocationSource: 'DialogCodeHook',
      userId: 'zn5e6pwc06gfk08i8e9dvi1i5t0hfxyr',
      sessionAttributes: null,
      bot: { name: 'CaffeBotio', alias: null, version: '$LATEST' },
      outputDialogMode: 'Text',
      currentIntent: {
        name: 'CoffeeOrder',
        slots: { size: 'normal', coffee: 'latte' },
        confirmationStatus: 'Confirmed'
      },
      inputTranscript: 'yes'
    };

    const expectedResponse = {
      sessionAttributes: null,
      dialogAction: { type: 'Delegate', slots: { size: 'normal', coffee: 'latte' } }
    };

    orderCoffee(intentRequest).then(response => {
      assert.equal(JSON.stringify(expectedResponse), JSON.stringify(response));
      done();
    });
  });
});

describe('DialogCodeHook with 2 invalid slot', () => {
  it('latte + normal', done => {
    const intentRequest = {
      messageVersion: '1.0',
      invocationSource: 'DialogCodeHook',
      userId: 'zn5e6pwc06gfk08i8e9dvi1i5t0hfxyr',
      sessionAttributes: null,
      bot: { name: 'CaffeBotio', alias: null, version: '$LATEST' },
      outputDialogMode: 'Text',
      currentIntent: {
        name: 'CoffeeOrder',
        slots: { size: 'double', coffee: 'latte' },
        confirmationStatus: 'None'
      },
      inputTranscript: 'i will like to have a double latte'
    };

    const expectedResponse = {
      sessionAttributes: null,
      dialogAction: {
        type: 'ElicitSlot',
        intentName: 'CoffeeOrder',
        slots: { size: null, coffee: 'latte' },
        slotToElicit: 'size',
        message: {
          contentType: 'PlainText',
          content: 'We do not have latte in that size. Normal or large are the available sizes for that drink.'
        }
      }
    };

    orderCoffee(intentRequest).then(response => {
      assert.equal(JSON.stringify(expectedResponse), JSON.stringify(response));
      done();
    });
  });
});

describe('FulfillmentCodeHook with 2 valid slot', () => {
  it('latte + normal', done => {
    const intentRequest = {
      messageVersion: '1.0',
      invocationSource: 'FulfillmentCodeHook',
      userId: 'javddgb05spb4iu06nsu29jax6lphg9n',
      sessionAttributes: null,
      bot: { name: 'CaffeBotio', alias: null, version: '$LATEST' },
      outputDialogMode: 'Text',
      currentIntent: {
        name: 'CoffeeOrder',
        slots: { size: 'normal', coffee: 'latte' },
        confirmationStatus: 'Confirmed'
      },
      inputTranscript: 'yes'
    };

    orderCoffee(intentRequest).then(response => {
      assert.equal(response.dialogAction.type, 'Close');
      assert.equal(response.dialogAction.fulfillmentState, 'Fulfilled');
      done();
    });
  });
});
