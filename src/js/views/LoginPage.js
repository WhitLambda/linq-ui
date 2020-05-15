import React, {Component} from "react";
import {Session} from 'bc-react-session';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.validateForm = this.validateForm.bind(this);
  }

  validateForm(e) {
    e.preventDefault(); // prevent form submitting via action

    // make request to backend to validate user
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    // temporarily use dummy data from json file
    const data = require("../../dummy_config.json");
    Session.start({
      payload: {
        username: username,
        password: password,
        config: data
      }
    })
    window.location.href = "/";

    /* authenticate and get data from backend
    fetch("http://127.0.0.1:8000/users/getkeywords/",
    {
      method: "POST",
      body: JSON.stringify({"username": username, "password": password}),
    })
    .then(response => {
      return response.json();
    })
    .then(
      (result) => {
        if (result.success === "false") {
          alert("Invalid username/password.");
        } else {
          Session.start({
            payload: {
              username: username,
              password: password,
              config: result.keywords
            }
          });
          window.location.href = "/";
        }

    });
    */
  }

  render() {
    return (
      <div className="login">
        <h1>Linq</h1>
        <form name="login" className="login-form" >
          <input type="text" name="username" id="username" placeholder="Username" required autoFocus />
          <input type="password" name="username" id="password" placeholder="Password" required />
          <input type="submit" value="Login" onClick={this.validateForm} />
        </form>
      </div>
    )
  }
}

export default LoginPage;
