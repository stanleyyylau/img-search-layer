var express = require('express');
var router = express.Router();
var config = require('./config.js');
var rp = require('request-promise');


router.get('/latest', function(req, res){
  console.log('I will go to db and get the latest search query');
  config.dbModel.find({},function(err, docs){
    if(err) return console.log(err);
    var sortedArray = [];
    for(var i = 1; i<11; i++){
      if(docs[docs.length-i]){
        sortedArray.push(docs[docs.length-i])
      }else{
        break;
      }
    }
    var pureArray = [];
    sortedArray.forEach(function(value){
      var obj = {
        search_query: value.search_query,
        search_at: value.created_at
      }
      pureArray.push(obj);
    })
    res.json(pureArray);
  })
});

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

      // console.log(optimisedData);
      //save string to db and json it back to client
      var newQuery = new config.dbModel({
        search_query: query
      });
      newQuery.save(function(err, doc){
        if(err){
          return console.log(err);
        }else {
          console.log(doc);
          console.log('new query save');
          res.json(optimisedData);
        }
      })

    })
    .catch(function (err) {
        // API call failed...
        return err;
    });

});






module.exports = router;
