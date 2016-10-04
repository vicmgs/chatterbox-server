var defaultCorsHeaders = require('../models/CorsModel');

module.exports = {
  BAD_REQUEST: function(require, response) {

  },
  NOT_FOUND: function(request, response) {
    response.writeHead(404, defaultCorsHeaders);
    response.end(JSON.stringify({
      'status': 404,
      'message': 'File not found...'
    }));
  },
  METHOD_NOT_ALLOWED: function(request, response) {
    response.writeHead(405, defaultCorsHeaders);
    response.end(JSON.stringify({
      'status': 405,
      'message': 'Method not allowed...'
    }));
  },
  INTERNAL_SERVER_ERROR: function(request, response) {
    response.writeHead(500, defaultCorsHeaders);
    response.end(JSON.stringify({
      'status': 500,
      'message': 'Internal server error reading file index.html'
    }));
  }
};