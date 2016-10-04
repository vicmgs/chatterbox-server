var fs = require('fs');

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

var results = [];

var PageController = {
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

var Messages = {
  get: function(request, response) {
    response.writeHead(200, defaultCorsHeaders);
    response.end(JSON.stringify({results: results}));
  },
  post: function(request, response) {
    var data = [];
    request.on('data', function(chunck) {
      data.push(chunck);
    }).on('end', function() {
      data = Buffer.concat(data).toString();
      results.push(JSON.parse(data));

      response.writeHead(201, defaultCorsHeaders);
      response.end(data);
    }).on('error', function(error) {
      console.log(error);
      response.writeHead(400, defaultCorsHeaders);
      response.end(error);
    });
  }
};

var Room = {
  get: function(request, response) {
    response.writeHead(200, defaultCorsHeaders);
    response.end(JSON.stringify({results: results}));
  },
  post: function(request, response) {
    var data = [];
    request.on('data', function(chunck) {
      data.push(chunck);
    }).on('end', function() {
      data = Buffer.concat(data).toString();
      results.push(JSON.parse(data));

      response.writeHead(201, defaultCorsHeaders);
      response.end(data);
    }).on('error', function(error) {
      console.log(error);
      response.writeHead(400, defaultCorsHeaders);
      response.end(error);
    });
  }
};

module.exports.requestHandler = function(request, response) {

  var routes = {
    '/': {
      'GET': PageController.get
    },
    '/api/classes/messages': {
      'GET': Messages.get,
      'POST': Messages.post
    },
    '/api/classes/room': {
      'GET': Room.get,
      'POST': Room.post
    }
  };

  if (!(request.url in routes)) {
    response.writeHead(404, defaultCorsHeaders);
    response.end(JSON.stringify({
      'status': 404,
      'message': 'File not found...'
    }));
    return;

  } else if (!(request.method in routes[request.url])) {
    response.writeHead(405, defaultCorsHeaders);
    response.end(JSON.stringify({
      'status': 405,
      'message': 'Method not allowed...'
    }));
    return;

  } 
  
  routes[request.url][request.method](request, response);  

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

