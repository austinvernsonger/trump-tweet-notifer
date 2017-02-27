'use strict';

// This is an api endpoint that will be called by webtask to fetch the latest tweet
// If a newer tweet is found it will use twillio to send these out to all subscribers.

const Twitter = require('twitter'),
      config = require('../config/config'),
      express = require('express'),
      router = express.Router(), 
      TwilioTransport = require('../lib/twilioTransport'),
      mongoose = require('mongoose'),
      User = require('../schemas/user')('user'),
      fs = require('fs');


const client = new Twitter({
  consumer_key: config.twitter.consumer_key,
  consumer_secret: config.twitter.consumer_secret,
  access_token_key: config.twitter.access_token_key,
  access_token_secret: config.twitter.access_token_secret
});

router.get('/collate-tweets', (req, res, next) => {
  
  let latestID = fs.readFileSync('./latest-tweet-id.txt', 'UTF-8');
  console.log(latestID);
  
  var params = {screen_name: 'realDonaldTrump', since: latestID};
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error && tweets && tweets[0].id != latestID) {
      latestID = tweets[0].id;
      fs.writeFileSync('./latest-tweet-id.txt', latestID, 'UTF-8');
      res.status(200).send('Done');
      User.find((err, users) => {
        users.forEach( u => {
          TwilioTransport(u.phone_number, tweets[0].text);
        });
      });
    } else {
      res.status(200).send('Done');
    }
  });
});
 
module.exports = router;