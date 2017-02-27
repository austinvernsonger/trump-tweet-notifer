// A basic route to remove yourself from the subscription

const express = require("express"),
      router = express.Router(),
      mongoose = require('mongoose'),
      User = require('../schemas/user')('user');
      
router.get('/remove-subscription', (req, res, next) => {
    res.render('remove');
});

router.post('/remove-subscription', (req, res, next) => {
    User.find({email: req.body.email, phone_number: req.body.phone_number}, function(err, users) {
        users.forEach( u => {
           u.remove(); 
        });
    });
    res.render('index');
});

module.exports = router;