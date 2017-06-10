'use strict';

const uuidV1 = require('uuid/v1');
const AWS = require('aws-sdk');
const promisify = require('es6-promisify');
const dynamo = new AWS.DynamoDB.DocumentClient();

module.exports.saveOrderToDatabase = function(userId, coffeeType, coffeeSize) {
  console.log('saveOrderToDatabase');

  const item = {};
  item.orderId = uuidV1();
  item.drink = coffeeType;
  item.size = coffeeSize;
  item.userId = userId;

  return saveItemToTable('coffee-order-table', item);
};

module.exports.saveUserToDatabase = function(userId, coffeeType, coffeeSize) {
  console.log('saveUserToDatabase');

  const item = {};
  item.drink = coffeeType;
  item.size = coffeeSize;
  item.userId = userId;

  return saveItemToTable('coffee-user-table', item);
};

function saveItemToTable(tableName, item) {
  const params = {
    TableName: tableName,
    Item: item
  };

  const putAsync = promisify(dynamo.put, dynamo);

  return putAsync(params)
    .then(() => {
      console.log(`Saving item ${JSON.stringify(item)}`);
      return item;
    })
    .catch(error => {
      Promise.reject(error);
    });
}
