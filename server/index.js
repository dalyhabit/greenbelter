var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(express.static(__dirname + '/../client/dist'));


app.get('/greenbelt-data', function (req, res) {
  
});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

