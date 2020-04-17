import React, {Component} from "react";
import {Session} from "bc-react-session";

class LoggedInView extends Component {
  handleLogout() {
    Session.destroy();
    window.location.href = "/"
  }

  render() {
    return(
      <div>
        <p>You are currently logged in!</p>
        <button text="Logout" onClick={this.handleLogout}>Logout</button>
      </div>
    )
  }
}

export default LoggedInView;
