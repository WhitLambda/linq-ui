import React, {Component} from "react";
import {
  Route,
  Switch,
  Link
} from "react-router-dom";
import {Session} from "bc-react-session";

import AllCommentsView from "./AllCommentsView";
import SortedCommentsView from "./SortedCommentsView";

class LoggedInView extends Component {

  handleLogout() {
    Session.destroy();
    window.location.href = "/"
  }

  render() {
    const { payload } = Session.get();
    const username = payload.username;

    return(
      <div>
        <div>
          <ul>
            <li><Link to="/all">All</Link></li>
            <li><Link to="/sorted">Sorted</Link></li>
          </ul>

          <h1>Linq</h1>
          <button>Settings</button>
          <div>
            <h3>{username}</h3>
            <button onClick={this.handleLogout}>Logout</button>
          </div>
        </div>

        <Switch>
          <Route path="/all" component={AllCommentsView}></Route>
          <Route path="/sorted" component={SortedCommentsView}></Route>
        </Switch>
      </div>
    )
  }
}

export default LoggedInView;
