if (localStorage.getItem("cookie") != null) {
  window.location = "/app"
} else {
  //
}

function login() {
  var username = document.getElementById("username").value
  if (username.trim() == '') return console.log("username can't be empty")
  var password = document.getElementById("password").value
  if (password.trim() == '') return console.log("password can 't be empty")
  var options = {
    method: 'POST',
    headers: {
      "username": username,
      "password": password
    }
  }

  fetch("/rlogin", options).then(function(json) {
    json.json().then(function(final) {
      var cookie = final.cookie
      var username = final.data.username
      localStorage.setItem("cookie", cookie);
      localStorage.setItem("username", username);
      window.location = "/app"
    })



  })


}