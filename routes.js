var express = require('express');
var router = express.Router();
var config = require('./config.js');
var rp = require('request-promise');


router.get('/:string', function(req, res){
  var query = req.params.string;
  var offset;
  if(req.query.offset){
    offset = Number(req.query.offset);
  }
  var apiAddress = config.setSearchQuery(query, offset);
  console.log(apiAddress);

  //get data from bing API
  var options = {
    uri: apiAddress,
    headers: {
        'Ocp-Apim-Subscription-Key': config.getApiKey()
    },
    json: true // Automatically parses the JSON string in the response
  };
  rp(options)
    .then(function (data) {
      //Do something with that Data back from Bing API
      var optimisedData = [];
      console.log(data);
      var toBeProcess = data.value;
      toBeProcess.forEach(function(value){
        var obj = {
          url:value.contentUrl,
          altText:value.name,
          thumbnail:value.thumbnailUrl,
          context:value.hostPageUrl
        }
        optimisedData.push(obj);
      })
      res.send(optimisedData);
    })
    .catch(function (err) {
        // API call failed...
        return err;
    });

});

router.get('/latest', function(req, res){
  console.log('I will go to db and get the latest search query');
});




module.exports = router;
