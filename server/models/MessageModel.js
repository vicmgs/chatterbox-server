var fs = require('fs');

module.exports = {
  messages: null,

  addMessage: function(message) {
    message.createdAt = new Date();
    message.updatedAt = new Date();
    message.objectId = this.messages.length;

    this.messages.push(message);
    fs.writeFile('./server/data/message.js', JSON.stringify(this.messages), function(error) {
      console.log(error);
    });
  },

  getMessages: function() {
    if (this.messages === null) {
      this.messages = JSON.parse(fs.readFileSync('./server/data/message.js', 'utf-8'));
    }
    if (this.messages.length < 100) {
      return this.messages;
    } else {
      return this.messages.splice(messages.length - 100, messages.length);
    }
  }
};