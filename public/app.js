new Vue({
  el: '#app',

  data: {
    newMsg: '',
    cookie: localStorage.getItem("cookie"),
    chatContent: '',
    Type: "controller",
    lastPost: '',
    username: localStorage.getItem("username"),
    usericon: "https://vignette.wikia.nocookie.net/tangled-fanon/images/0/0f/Hiro.jpg",
    controllericon: "https://www.shareicon.net/data/2016/05/24/770117_people_512x512.png",
    controllername: "Controller",
    servername: "Server",
    servericon: "https://support.upwork.com/hc/article_attachments/360040474034/chatbot-data.png"
  },

  created: function() {

    var self = this;
    if (self.cookie != null) {
      self.refresh(0)
    } else {
      window.location = "/login"
    }


  },

  methods: {
    logout: function(id) {
      var self = this;
      self.cookie = '';
      localStorage.clear();
      window.location = "/"
    },

    refresh: function(id) {
      var self = this;
      if (id == 0) {
        self.chatContent = ''
        var id = "non"
      }
      var cookie = self.cookie
      var options = {
        method: 'POST',
        headers: {
          "informations": cookie,
          "lastpost": id
        },
      }
      fetch("/refresh", options).then(function(json) {
        json.json().then(function(final) {
          var posts = final.posts
          for (var i = 0; i < posts.length; i++) {
            var post = posts[i]
            self.lastPost = post.post._id
            self.log(post.post.user.username, post.post.content, post.likes, post.post.date)
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
        self.refresh(0);
      }
    },

    more: function() {
      var self = this;
      self.refresh(self.lastPost)
    },
    log: function(username, content, likes, date) {

      var self = this;
      var avatar = self.controllericon
      if (username == self.username) {
        var avatar = self.usericon
      }
      var msg = content
      self.chatContent += '<div class="card">' +
        '<img class="avatar" src="' + avatar + '" width="50px" style="border-radius: 50%">' +
        '<div class="caption">' +
        '<div class="username">' + username + '</div>' +
        '<div class="content">' + content + '</div>' +
        '<div class="likes">' + "💚" + likes + '</div>' +
        '<div class="date">' + date + '</div>' +
        '</div>' +
        '</div><br>';

      var element = document.getElementById('chat-messages');
      element.scrollTop = element.scrollHeight; // Auto scroll to the bottom
    },

  }
});


var mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {
  scrollFunction()
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}