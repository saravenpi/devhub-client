function login() {
  var username = document.getElementById("username").value
  if (username.trim() == '') return console.log("username can't be empty")
  var password = document.getElementById("password").value
  if (password.trim() == '') return console.log("password can 't be empty")
  console.log(username);
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    "username": username,
    "password": password
  })

  var json = {
    method: 'POST',
    mode: 'no-cors',
    headers: myHeaders,
    body: raw
  }

  fetch("https://devhub-driaug.herokuapp.com/api/auth/login", json).then(function() {
    console.log("requested")
  });

}