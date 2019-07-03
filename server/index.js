var express = require('express');
var path = require('path');
var app = express();

app.use(express.static(__dirname + '/../client/dist'));

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})

app.listen(3000, function() {
  console.log('listening on port 3000!');
});
