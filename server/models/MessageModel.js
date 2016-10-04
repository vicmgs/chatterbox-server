module.exports = {
  messages: [],

  addMessage: function(message) {
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