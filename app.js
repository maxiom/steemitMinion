/*jshint esversion: 6 */
const logger = require('./logger.js');
const steem = require('steem');
const sync = require('synchronize');

steem.api.setOptions({url: 'https://api.steemit.com'});

try{
    sync.fiber(function(){
      var res = sync.await(steem.api.getAccounts(['dan'], sync.defer()));
      console.log(res);
      res = sync.await(steem.api.getAccounts(['maxiom'], sync.defer()));
      console.log(res);
    });

} catch (err){
  console.log(err);
}
