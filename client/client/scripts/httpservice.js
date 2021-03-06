var HttpService = function(url) {
  this.messages = {};
  this.url = url;
};

/**
  Helper function to get the username from the url

  @param sParam is the key for the query param
  @returns the value of the query param
*/
var _getUrlParameter = function(sParam) {
  var sPageURL = decodeURIComponent(window.location.search.substring(1));
  var sURLVariables = sPageURL.split('&');
  var sParameterName;
  
  for (var i = 0; i < sURLVariables.length; i++) {
    sParameterName = sURLVariables[i].split('=');

    if (sParameterName[0] === sParam) {
      return sParameterName[1] === undefined ? true : sParameterName[1];
    }
  }
};

HttpService.prototype.getNewMessages = function () {
  var _this = this;

  var addElements = function(data) {
    data = JSON.parse(data);

    for (var i = 0; i < data.results.length; i++) {
      var element = data.results[i];
      var roomname = element.roomname;
      if (_this.messages[roomname] !== undefined) {
        var isFound = false;
        for (var j = 0; j < _this.messages[roomname].length; j++) {
          if (_this.messages[roomname][j]['objectId'] === element.objectId) {
            isFound = true;
            break;
          }
        }

        if (!isFound) {
          _this.messages[roomname].push(element);
        }
      } else {
        _this.messages[roomname] = [element];
      }
    }
  };

  $.ajax({
    url: this.url,
    type: 'GET',
    data: {
      //order: '-createdAt'
    },
    success: addElements
  });
};

HttpService.prototype.getRooms = function () {
  return Object.keys(this.messages);
};

HttpService.prototype.getRoom = function (roomName) {
  return this.messages[roomName];
};

HttpService.prototype.sendMessage = function (text, roomName) {
  var messageData = {
    username: _getUrlParameter('username'),
    text: text,
    roomname: roomName
  };

  $.ajax({
    type: 'POST',
    url: this.url,
    data: JSON.stringify(messageData),
    dataType: 'json'
  });
};