var MessageModel = require('../models/MessageModel');
var defaultCorsHeaders = require('../models/CorsModel');

module.exports = {
  get: function(request, response) {
    response.writeHead(200, defaultCorsHeaders);
    response.end(JSON.stringify({results: MessageModel.getMessages()}));
  },
  post: function(request, response) {
    var data = [];
    request.on('data', function(chunck) {
      data.push(chunck);
    }).on('end', function() {
      data = Buffer.concat(data).toString();
      MessageModel.addMessage(JSON.parse(data));

      response.writeHead(201, defaultCorsHeaders);
      response.end(data);
    }).on('error', function(error) {
      console.log(error);
      response.writeHead(400, defaultCorsHeaders);
      response.end(error);
    });
  }
};