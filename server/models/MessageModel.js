module.exports = {
  messages: [],

  addMessage: function(message) {
    message.createdAt = new Date();
    message.updatedAt = new Date();
    message.objectId = this.messages.length;
    this.messages.push(message);
  },

  getMessages: function() {
    if (this.messages.length < 100) {
      return this.messages;
    } else {
      return this.messages.splice(messages.length - 100, messages.length);
    }
  }
};