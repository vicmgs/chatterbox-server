$( document ).ready(function() {
  var httpService = new HttpService();

  var chatrooms = [
    new ChatModel('lobby', httpService),
    new ChatModel(undefined, httpService),
    new ChatModel('Lobby', httpService),
  ];
  
  httpService.getNewMessages();
  setTimeout(function() {
    for (var i = 0; i < chatrooms.length; i++) {
      chatrooms[i].populateRoom();
      chatrooms[i].addMessages();
    }
  }, 500);

  setInterval(function() {
    httpService.getNewMessages();
    for (var i = 0; i < chatrooms.length; i++) {
      chatrooms[i].addMessages();
    }
    renderFriends();
  }, 500);

  setInterval(function() {
    for (var i = 0; i < chatrooms.length; i++) {
      chatrooms[i].populateRoom();
    }
  }, 5000);
  
  var renderFriends = function() {
    var friends = ChatModel.prototype.friends;

    $('#friendsWrapper').empty();

    for (var i = 0; i < friends.length; i++) {
      var $friend = $('<li class="friends label label-primary"></li>');
      $friend.text(friends[i] + ' ');

      var $addFriendBtn = $('<span class="friendRemove">x</span>');
      $addFriendBtn.click(function(event) {
        var $element = $(event.currentTarget).parent();
        $element.remove();

        var elementText = $element.text().slice(0, -2);
        ChatModel.prototype.removeFriend(elementText);

        for (var i = 0; i < chatrooms.length; i++) {
          chatrooms[i].changeRoom(chatrooms[i].roomname);
        }

      }.bind(this));

      $friend.append($addFriendBtn);

      $friend.appendTo('#friendsWrapper');
    }
  };

  $('.username').click(function(event) {
    console.log('username clicked');
    for (var i = 0; i < chatrooms.length; i++) {
      chatrooms[i].changeRoom(chatrooms[i].roomname);
    }
  }.bind(this));
});