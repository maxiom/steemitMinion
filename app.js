/*jshint esversion: 6 */

const steem = require('steem');
const sync = require('synchronize');
const db = require('./base.js');
const logger = require('./logger.js');

steem.api.setOptions({url: 'https://api.steemit.com'});

db.query('SELECT * FROM accounts', null, function(data, err){
  for(var i = 0; i < data.length; i++){

    logger.info(data[i]);
  }
});

var fiber = sync.fiber;
var await = sync.await;
var defer = sync.defer;

try{
    fiber(function(){

      var obj = await(steem.api.getAccounts(['dan'], defer()));
      logger.info(obj);
    });

} catch (err){
  console.log(err);
}
