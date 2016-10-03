/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/
var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'application/JSON'
};

var processGET = function() {
  response.writeHead(statusCode, headers);
  response.end(JSON.stringify({'test': 'yay it works?'}));
};

var processPOST = function() {
  response.writeHead(statusCode, headers);
  response.end('Hello, World!');
};

module.exports = function(request, response) {

  var routes = {
    '/classes/messages': {
      'GET': processGET,
      'POST': processPOST
    }
  };

  if (!routes[request.url]) {
    response.writeHead(404, headers);
    response.end(JSON.stringify({
      'status': 404,
      'message': 'File not found...'
    }));
  }
  if (!routes[request.url][request.method]) {
    response.writeHead(405, headers);
    response.end(JSON.stringify({
      'status': 405,
      'message': 'Method not allowed...'
    }));
  }
  

};

// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.

