var defaultCorsHeaders = require('../models/CorsModel');
var ErrorController = require('./ErrorController');

module.exports = {
  get: function(request, response) {
    var url = request.url.split('?')[0];

    if (url.contains('bower_components')) {
      url = './client' + url;
    } else {
      url = './client/client' + url;
    }

    fs.readFile(url, 'binary', function(error, file) {
      if (error) {
        ErrorController.INTERNAL_SERVER_ERROR(request, response);
        return;
      }

      var dataType = url.split('.');
      defaultCorsHeaders['Content-Type'] = 'text/' + dataType[dataType.length - 1];
      response.writeHead(200, defaultCorsHeaders);
      response.write(file, 'binary');
      response.end();
      return;
    });
  }
};