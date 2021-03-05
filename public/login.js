function login() {
  var username = document.getElementById("username").value
  if (username.trim() == '') return console.log("username can't be empty")
  var password = document.getElementById("password").value
  if (password.trim() == '') return console.log("password can 't be empty")
  const json = {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Access-Control-Allow-Origin': '*',
      "Content-type": "application/json"
    },
    body: JSON.stringify({
      username: username,
      password: password
    })

  }

  fetch("https://devhub-driaug.herokuapp.com/api/auth/login", json).then(update());

}