'use strict';

const handleDialogCodeHook = require('./manageDialogs');
const handleFulfillmentCodeHook = require('./manageFullfilment');

module.exports = function(intentRequest) {
  const source = intentRequest.invocationSource;

  if (source === 'DialogCodeHook') {
    return handleDialogCodeHook(intentRequest);
  }

  if (source === 'FulfillmentCodeHook') {
    return handleFulfillmentCodeHook(intentRequest);
  }
};
