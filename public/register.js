if (localStorage.getItem("cookie") != null) {
  window.location = "/app"
} else {
  //
}

function register() {
  var username = document.getElementById("username").value
  if (username.trim() == '') return alert("username can't be empty")
  var password = document.getElementById("password").value
  if (password.trim() == '') return alert("password can 't be empty")
  var cpassword = document.getElementById("cpassword").value
  if (cpassword.trim() == '') return alert("password can 't be empty")

  if (cpassword != password) return alert("Passwords are not the same!")
  var options = {
    method: 'POST',
    headers: {
      "username": username,
      "password": password
    }
  }

  fetch("/rregister", options).then(function(json) {
    window.location = "/login"
  })


}