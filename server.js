const express = require('express'),
      app = express(), 
      hbs = require('hbs'),
      index = require('./routes/index'),
      tweets = require('./routes/twitter'),
      create = require('./routes/createSubscription'),
      remove = require('./routes/removeSubscription'),
      PORT = process.env.PORT || 8080,
      path = require('path'),
      bodyParser = require("body-parser");
      
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(express.static('assets'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

app.use('/', index);
app.use('/', create);
app.use('/', tweets);
app.use('/', remove);


app.listen(PORT, () => {
  console.log(`Application is running on port ${PORT}`);
});

