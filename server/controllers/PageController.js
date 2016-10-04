var defaultCorsHeaders = require('../models/CorsModel');

module.exports = {
  get: function(request, response) {
    fs.readFile('./client/index.html', 'binary', function(error, file) {
      if (error) {
        response.writeHead(500, defaultCorsHeaders);
        response.end(JSON.stringify({
          'status': 500,
          'message': 'Internal server error reading file index.html'
        }));
        return;
      }

      defaultCorsHeaders['Content-Type'] = 'text/html';
      response.writeHead(200, defaultCorsHeaders);
      response.write(file, 'binary');
      response.end();
    });
  }
};