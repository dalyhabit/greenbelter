var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');

var app = express();

app.use(express.static(__dirname + '/../client/dist'));

app.get('/greenbelt-data', function (req, res) {
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

      dataObj.oakHill.displayName = 'Barton Creek @ SH 71';
      dataObj.oakHill.name = data.value.timeSeries[0].sourceInfo.siteName;
      dataObj.oakHill.flow = Number(data.value.timeSeries[0].values[0].value[0].value);
      dataObj.oakHill.depth = Number(data.value.timeSeries[1].values[0].value[0].value);

      dataObj.lostCreek.displayName = 'Barton Creek @ Lost Creek Blvd.';
      dataObj.lostCreek.name = data.value.timeSeries[2].sourceInfo.siteName;
      dataObj.lostCreek.flow = Number(data.value.timeSeries[2].values[0].value[0].value);
      dataObj.lostCreek.depth = Number(data.value.timeSeries[3].values[0].value[0].value);
      
      dataObj.loop360.displayName = 'Barton Creek @ Loop 360';
      dataObj.loop360.name = data.value.timeSeries[4].sourceInfo.siteName;
      dataObj.loop360.flow = Number(data.value.timeSeries[4].values[0].value[0].value);
      dataObj.loop360.depth = Number(data.value.timeSeries[5].values[0].value[0].value);
      
      dataObj.aboveBartonSprings.displayName = 'Barton Creek above Barton Springs';
      dataObj.aboveBartonSprings.name = data.value.timeSeries[6].sourceInfo.siteName;
      dataObj.aboveBartonSprings.flow = Number(data.value.timeSeries[6].values[0].value[0].value);
      dataObj.aboveBartonSprings.depth = Number(data.value.timeSeries[7].values[0].value[0].value);

      dataObj.belowBartonSprings.displayName = 'Barton Springs';
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

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

