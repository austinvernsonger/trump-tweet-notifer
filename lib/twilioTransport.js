const config = require('../config/config');
 
//require the Twilio module and create a REST client 
var client = require('twilio')(config.twilio.account_sid, config.twilio.auth_token); 

module.exports = function(number, message) {
    
    if(number.charAt(0) === '0') {
        number = '+44' + number.substring(1, number.length);
    }
    
    client.messages.create({ 
        to: number, 
        from: "17085411926", 
        body: message
    }, function(err, message) { 
        if(err) console.log(err);
    });
};