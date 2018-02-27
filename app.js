console.log('Hello World!')
var steem = require('steem');

steem.api.setOptions({url: 'https://api.steemit.com'});

steem.api.getAccounts(['maxiom', 'dan'], function(err, res){
  console.log(err, res);
})
