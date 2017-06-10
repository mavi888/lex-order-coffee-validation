'use strict';

const dispatch = require('./dispatch');
const userFavorites = require('./userFavorites/userFavorites');

module.exports.intents = (event, context, callback) => {
  try {
    console.log(`event.bot.name=${event.bot.name}`);
    dispatch(event).then(response => {
      callback(null, response);
    });
  } catch (err) {
    callback(err);
  }
};

module.exports.saveUserFavorites = (event, context, callback) => {
  console.log('saveUserFavorites lambda called');

  var item = event.Records[0].dynamodb.NewImage;
  console.log(item);

  userFavorites(item.userId.S, item.drink.S, item.size.S);
  callback(null, null);
};
