var ChatModel = function(roomname, httpService) {
  this.roomname = roomname;
  this.httpService = httpService;
  this.messages = [];
  this.lastIndex = 0;

  this.$dropdown = $('<select></select>').addClass('col-xs-5');

  var _this = this;
  this.$dropdown.change(function() {
    _this.changeRoom(this.value);
  });

  this.$newRoomButton = $('<button></button>').addClass('btn')
                                              .addClass('col-xs-1')
                                              .addClass('btn-success')
                                              .addClass('newRoomBtn')
                                              .text('+');

  this.$newRoomButton.on('click', function () {
    _this.changeRoom(prompt('Type in new roomname: '));
  });

  this.$menu = $('<div></div>').addClass('menu')
                               .addClass('row')
                               .append($('<label></label>').addClass('col-xs-6')
                                                           .text('Chatroom name: '))
                               .append(this.$dropdown)
                               .append(this.$newRoomButton);

  this.$messages = $('<div></div>').addClass('chatMessages')
                                   .addClass('row');

  this.$chatText = $('<input>').addClass('col-xs-9')
                               .addClass('chatInput')
                               .attr('type', 'text');

  this.$chatButton = $('<button></button>').addClass('btn')
                                           .addClass('col-xs-2')
                                           .addClass('btn-success')
                                           .addClass('chatInputBtn')
                                           .attr('type', 'submit')
                                           .text('Send');
  this.$chatButton.on('click', _this.sendMessage.bind(this));

  this.$chatInput = $('<div></div>').addClass('row')
                                    .append(this.$chatText)
                                    .append(this.$chatButton);

  this.$node = $('<div></div>').addClass('chatbox')
                               .addClass('col-xs-3')
                               .append(this.$menu)
                               .append(this.$messages)
                               .append(this.$chatInput);

  $('#wrapper').append(this.$node);
};

ChatModel.prototype.populateRoom = function() {
  var _this = this;
  var rooms = this.httpService.getRooms() || [];
  rooms.unshift(this.roomname);

  this.$dropdown.empty();

  $.each(rooms, function(key, value) {   
    _this.$dropdown.append($('<option></option>')
      .attr('value', value)
      .text(value)); 
  });

};

ChatModel.prototype.addMessages = function() {
  this.messages = this.httpService.getRoom(this.roomname) || [];

  for (var i = this.lastIndex; i < this.messages.length; i++) {
    var $timestamp = $('<span></span>').addClass('timestamp')
                                       .addClass('small')
                                       .text(this.messages[i].createdAt);

    var $username = $('<p></p>').addClass('username')
                                .text(this.messages[i].username);
                                //.append($timestamp);
    if (ChatModel.prototype.friends.includes(this.messages[i].username)) {
      $username.addClass('friend');
    }
    $username.on('click', this.friendClickedEvent.bind(this));

    var $message = $('<p></p>').addClass('messageContent')
                               .text(this.messages[i].text);

    var $finalMessage = $('<div></div>').addClass('row')
                                        .addClass('message')
                                        .addClass('well')
                                        .append($('<div></div>').addClass('col-xs-12')
                                                                .append($username)
                                                                .append($message));
    this.$messages.prepend($finalMessage);
  }
  this.lastIndex = this.messages.length;
};

ChatModel.prototype.changeRoom = function(roomname) {
  this.messages = [];
  this.lastIndex = 0;
  this.roomname = roomname;
  this.$messages.empty();
  this.addMessages();
};

ChatModel.prototype.sendMessage = function(event) {
  this.httpService.sendMessage(this.$chatText.val(), this.roomname);
  this.$chatText.val('');
};

ChatModel.prototype.friends = [];

ChatModel.prototype.addFriend = function(username) {
  ChatModel.prototype.friends.push(username);
};

ChatModel.prototype.removeFriend = function(username) {
  var index = ChatModel.prototype.friends.indexOf(username);
  if (index > -1) {
    ChatModel.prototype.friends.splice(index, 1);
  }
};

ChatModel.prototype.friendClickedEvent = function(event) {
  var username = $(event.currentTarget).text();
  var index = ChatModel.prototype.friends.indexOf(username);
  if (index > -1) {
    this.removeFriend(username);
  } else {
    this.addFriend(username);
  }
  this.changeRoom(this.roomname);
};








