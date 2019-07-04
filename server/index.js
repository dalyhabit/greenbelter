var express = require('express');
var path = require('path');
var app = express();
var compression = require('compression')

var allowedUrls = {
  '/': true,
  "/hill-of-life": true,
  "/sculpture-falls": true,
  "/twin-falls": true,
  "/gus-fruh": true,
  "/campbells-hole": true,
  "/the-flats": true,
  "/barton-springs": true,
  "/lost-creek": true,
  "/loop-360": true,
  "/above-barton-springs": true
};

app.use(compression());
app.use(express.static(__dirname + '/../client/dist'));

app.get('/*', function(req, res) {
  if (!allowedUrls[req.url]) {
    res.redirect('/');
  } else {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'), function(err) {
      if (err) {
        res.status(500).send(err)
      }
    });
  }
})

app.listen(3000, function() {
  console.log('listening on port 3000!');
});
