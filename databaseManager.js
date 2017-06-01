'use strict';

const uuidV1 = require('uuid/v1');
const AWS = require('aws-sdk');
const promisify = require('es6-promisify');
const dynamo = new AWS.DynamoDB.DocumentClient();

module.exports.saveOrderToDatabase = function(coffeeType, coffeeSize) {
  console.log('saveOrderToDatabase');

  const item = {};
  item.orderId = uuidV1();
  item.drink = coffeeType;
  item.size = coffeeSize;

  const params = {
    TableName: 'coffee-order-table',
    Item: item
  };

  const putAsync = promisify(dynamo.put, dynamo);

  return putAsync(params).then(() => {
    console.log(`Saving order ${JSON.stringify(item)}`);
    return item;
  }).catch((error) => {
    Promise.reject(error);
  });
}
