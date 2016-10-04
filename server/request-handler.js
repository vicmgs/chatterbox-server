var PageController = require('./controllers/PageController');
var MessageController = require('./controllers/MessageController');
var ErrorController = require('./controllers/ErrorController');

/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/

module.exports.requestHandler = function(request, response) {
  var url = request.url.split('?')[0];

  // Page Call
  if (!url.includes('/api/')) {
    if (request.method !== 'GET') {
      ErrorController.METHOD_NOT_ALLOWED(request, response);
    }
    PageController.get(request, response);
    return;
  }

  var routes = {
    '/api/classes/messages': {
      'GET': MessageController.get,
      'POST': MessageController.post
    }
  };

  if (!(url in routes)) {
    ErrorController.NOT_FOUND(request, response);
    return;

  } else if (!(request.method in routes[url])) {
    ErrorController.METHOD_NOT_ALLOWED(request, response);
    return;

  } 
  
  routes[url][request.method](request, response);  

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

