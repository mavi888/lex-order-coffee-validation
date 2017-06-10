'use strict';

const databaseManager = require('../databaseManager');

module.exports = function(userId, drink, size) {
  console.log(userId + ' ' + drink + ' ' + size);

  databaseManager.saveUserToDatabase(userId, drink, size).then(item => {
    console.log(item);
  });
};
