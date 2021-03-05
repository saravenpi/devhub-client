new Vue({
  el: '#app',

  data: {
    socket: null, // Our websocket
    newMsg: '', // Holds new messages to be sent to the server
    chatContent: '', // A running list of chat messages displayed on the screen
    Type: "controller",
    username: "hiro",
    usericon: "https://vignette.wikia.nocookie.net/tangled-fanon/images/0/0f/Hiro.jpg",
    controllericon: "http://images6.fanpop.com/image/photos/37600000/transparent-Honey-Lemon-icon-Fantasy-Football-big-hero-6-37654514-273-273.png",
    controllername: "Controller",
    servername: "Server",
    servericon: "https://support.upwork.com/hc/article_attachments/360040474034/chatbot-data.png"
  },

  created: function() {
    var self = this;


  },

  methods: {

    initsocket: function() {

    },

    send: function() {
      var self = this;
      if (this.newMsg != '') {

        var query = this.newMsg
        this.newMsg = ''; // Reset newMsg


      }




    },

    log: function(content) {

      var self = this;

      var msg = content
      self.chatContent += '<div class="chip">' +
        '<img src="' + this.controllericon + '">' // Avatar
        +
        this.controllername +
        '</div>' +
        msg + '<br/>';

      var element = document.getElementById('chat-messages');
      element.scrollTop = element.scrollHeight; // Auto scroll to the bottom
    },
    slog: function(content) {

      var self = this;

      var msg = content
      self.chatContent += '<div class="chip">' +
        '<img src="' + this.servericon + '">' // Avatar
        +
        this.servername +
        '</div>' +
        msg + '<br/>';

      var element = document.getElementById('chat-messages');
      element.scrollTop = element.scrollHeight; // Auto scroll to the bottom
    },
    disp: function(content) {

      var self = this;

      var msg = content
      self.chatContent += '<div class="chip">' +
        '<img src="' + this.usericon + '">' // Avatar
        +
        this.username +
        '</div>' +
        msg + '<br/>';

      var element = document.getElementById('chat-messages');
      element.scrollTop = element.scrollHeight; // Auto scroll to the bottom
    },
    emit: function(event, content, data) {
      this.socket.send(
        JSON.stringify({
          content: content,
          type: this.Type,
          event: event,
          data: data
        }));
    }
  }
});