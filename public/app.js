new Vue({
  el: '#app',

  data: {
    newMsg: '',
    cookie: localStorage.getItem("cookie"),
    chatContent: '',
    Type: "controller",
    username: localStorage.getItem("username"),
    usericon: "https://vignette.wikia.nocookie.net/tangled-fanon/images/0/0f/Hiro.jpg",
    controllericon: "https://www.shareicon.net/data/2016/05/24/770117_people_512x512.png",
    controllername: "Controller",
    servername: "Server",
    servericon: "https://support.upwork.com/hc/article_attachments/360040474034/chatbot-data.png"
  },

  created: function() {
    var self = this;
    self.refresh()

  },

  methods: {


    refresh: function() {
      var self = this;
      self.chatContent = ''
      var cookie = self.cookie
      var options = {
        method: 'POST',
        headers: {
          "informations": cookie
        },
      }
      fetch("/refresh", options).then(function(json) {
        json.json().then(function(final) {
          var posts = final.posts
          for (var i = 0; i < posts.length; i++) {
            var post = posts[i]
            self.log(post.post.user.username, post.post.content)
          }
        });
      });
    },
    send: function() {
      var self = this;
      if (this.newMsg != '') {

        var content = this.newMsg
        var cookie = self.cookie

        var options = {
          method: 'POST',
          headers: {
            "informations": cookie,
            "content": content
          },

        }
        fetch("/post", options)
        this.newMsg = '';
        self.refresh();



      }




    },

    log: function(username, content) {

      var self = this;
      var avatar = self.controllericon
      if (username == self.username) {
        var avatar = self.usericon
      }
      var msg = content
      self.chatContent += '<div class="chip">' +
        '<img src="' + avatar + '">' // Avatar
        +
        username +
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