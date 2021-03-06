const express = require("express");
const app = express();
const colors = require("colors/safe")
const axios = require("axios")
const rp = require("request-promise")
app.use(express.static("public"));


app.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/index.html");
});
app.get("/register", (request, response) => {
  response.sendFile(__dirname + "/views/register/index.html");
});
app.get("/login", (request, response) => {
  response.sendFile(__dirname + "/views/login/index.html");
});

app.get("/app", (request, response) => {
  response.sendFile(__dirname + "/views/app/index.html");
});


app.post("/refresh", (request, response) => {

  var cookie = request.headers.informations
  if (request.headers.lastpost && request.headers.lastpost != "non") {
    var id = request.headers.lastpost
    var lastpost = "?id=" + id

  } else {
    var lastpost = ''
  }
  var options = {
    body: JSON.stringify({}),
    headers: {
      "Content-Type": "application/json",
      cookie: cookie,
    },
    method: "GET",
    uri: `https://devhub-driaug.herokuapp.com/api/posts/post${lastpost}`,
  }
  rp(options).then(function(body) {

    var final = JSON.parse(body);
    var posts = final.data;
    response.json({
      posts: posts
    })


  });
});


app.post("/post", (request, response) => {

  var cookie = request.headers.informations
  var content = request.headers.content

  var options = {
    body: JSON.stringify({
      content: content
    }),
    headers: {
      "Content-Type": "application/json",
      cookie: cookie,
    },
    method: "POST",
    uri: "https://devhub-driaug.herokuapp.com/api/posts/post",
  }

  rp(options).then(function(body) {

    var final = JSON.parse(body);
    response.json({
      res: final
    })


  });
});


app.post("/rlogin", (request, response) => {
  var username = request.headers.username
  var password = request.headers.password
  const data = {
    username,
    password
  }
  axios
    .post("https://devhub-driaug.herokuapp.com/api/auth/login", data)
    .then(function(res) {
      var cookie = res.headers["set-cookie"][0];
      var resp = {
        cookie: cookie,
        data: res.data.data
      }
      response.json(resp)

    });


});
const listener = app.listen(process.env.PORT, () => {
  console.log("🌵" + colors.rainbow(" - SERVER RUNNING ON PORT: ") + colors.cyan(listener.address().port));
});