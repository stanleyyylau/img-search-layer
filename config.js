
var config = (function(){
  var endpoint = 'https://api.cognitive.microsoft.com/bing/v5.0/images/search';
  var apiKey = 'da2f1901e3704dd794c9a9335a00f975';
  var mlab = 'mongodb://stanley:stanley@ds033056.mlab.com:33056/imagelayer'
  var setSearchQuery = function(query, offset){
    //query is a string, offset has to be a number
    if(typeof offset === 'number'){
      return endpoint + '?q=' + query + '&count=10' + '&offset=' + offset;
    }else {
      return endpoint + '?q=' + query + '&count=10';
    }
  }
  var getMlabAddress = function(){
    return mlab;
  }
  var getApiKey = function(){
    return apiKey;
  }
  //setting up mongodb
  var mongoose = require('mongoose');
  var Schema = mongoose.Schema;
  var imagelayerSchema = new Schema({
    search_query: {type:String, required: true}
    created_at: {type:Date, default: new Data()}
  });
  var imageLayer = mongoose.model('imgLayer', imagelayerSchema);

  return {setSearchQuery: setSearchQuery,
          getApiKey: getApiKey,
          getMlabAddress: getMlabAddress,
          dbModel: imageLayer
          };
})();

module.exports = config;
