'use strict';

// This route is used to add a new subscriber to the database

const express = require("express"),
      router = express.Router(),
      mongoose = require('mongoose'),
      User = require('../schemas/user')('user'),
      TwilioTransport = require('../lib/twilioTransport');

// This is a demo account
mongoose.connect('mongodb://mongodb://trump:donaldtrump@ds161159.mlab.com:61159/auth0-webtask');
const db = mongoose.connection;
      
router.post('/create-subscription', (req, res, next) => {
    let user = new User({
        phone_number: req.body.phone_number,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email 
    });
    
    TwilioTransport(req.body.phone_number, 'Thank you for subscribing, to Donald Trumps Tweets');
    
    // store the new subscription as a user
    user.save();
    res.render('created');
});

router.get('/create-subscription', (req, res, next) => {
    res.render('created');
});

module.exports = router;