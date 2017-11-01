var request = require('request');
var express = require('express');
var path = require('path');
var routes = express.Router();

function waterStatus (flow, depth) {
  if (flow < 10) {
    return "Too slow"
  } else if (flow <= 250) {
    return "Swimmable"
  } else if (flow <=325) {
    return "Not swimmable, but maybe floatable"
  } else {
    return "Turn around, don't drown"
  }
}

//
// Static assets (html, etc.)
//
var assetFolder = path.resolve(__dirname, '../client/');
routes.use(express.static(assetFolder));

routes.get('/usgs', function(req, res){
  request('https://waterservices.usgs.gov/nwis/iv/?format=json&indent=on&sites=08155200,%2008155240,%2008155300,%2008155400,%2008155500&parameterCd=00060,00065&siteStatus=all', function (error, response, body) {
    var dataObj = {
      oakHill: {},
      lostCreek: {},
      loop360: {},
      aboveBartonSprings: {},
      belowBartonSprings: {}
    };

    if (!error && response.statusCode == 200) {
      var data = JSON.parse(body);

      dataObj.oakHill.name = data.value.timeSeries[0].sourceInfo.siteName;
      dataObj.oakHill.flow = Number(data.value.timeSeries[0].values[0].value[0].value);
      dataObj.oakHill.depth = Number(data.value.timeSeries[1].values[0].value[0].value);

      dataObj.lostCreek.name = data.value.timeSeries[2].sourceInfo.siteName;
      dataObj.lostCreek.flow = Number(data.value.timeSeries[2].values[0].value[0].value);
      dataObj.lostCreek.depth = Number(data.value.timeSeries[3].values[0].value[0].value);
      
      dataObj.loop360.name = data.value.timeSeries[4].sourceInfo.siteName;
      dataObj.loop360.flow = Number(data.value.timeSeries[4].values[0].value[0].value);
      dataObj.loop360.depth = Number(data.value.timeSeries[5].values[0].value[0].value);
      
      dataObj.aboveBartonSprings.name = data.value.timeSeries[6].sourceInfo.siteName;
      dataObj.aboveBartonSprings.flow = Number(data.value.timeSeries[6].values[0].value[0].value);
      dataObj.aboveBartonSprings.depth = Number(data.value.timeSeries[7].values[0].value[0].value);

      dataObj.belowBartonSprings.name = data.value.timeSeries[8].sourceInfo.siteName;
      dataObj.belowBartonSprings.flow = Number(data.value.timeSeries[8].values[0].value[0].value);
      dataObj.belowBartonSprings.depth = Number(data.value.timeSeries[9].values[0].value[0].value);

      console.log("Success!:\n", dataObj);
      res.send(dataObj);
    } else {
      console.error(error);
    }
  });
});


if (process.env.NODE_ENV !== 'test') {
  //
  // The Catch-all Route
  // This is for supporting browser history pushstate.
  // NOTE: Make sure this route is always LAST.
  //
  routes.get('/*', function(req, res){
    res.sendFile( assetFolder + '/index.html' );
  })

  //
  // We're in development or production mode;
  // create and run a real server.
  //
  var app = express();

  // Parse incoming request bodies as JSON
  app.use( require('body-parser').json() );

  // Mount our main router
  app.use('/', routes);

  // Start the server!
  var port = process.env.PORT || 4000
  app.listen(port);
  console.log("Listening on port", port);
}
else {
  // We're in test mode; make this file importable instead.
  module.exports = routes
}
