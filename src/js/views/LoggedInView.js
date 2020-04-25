import React, {Component} from "react";
import {
  Route,
  Switch,
  Link
} from "react-router-dom";
import {Session} from "bc-react-session";
import ReactModal from "react-modal";

import AllCommentsView from "./AllCommentsView";
import SortedCommentsView from "./SortedCommentsView";
import Settings from "./Settings";

class LoggedInView extends Component {
  constructor(props) {
    super(props);
    this.state = { showSettings: false };

    this.handleSettingsOpen = this.handleSettingsOpen.bind(this);
    this.handleSettingsClose = this.handleSettingsClose.bind(this);
  }

  handleLogout() {
    Session.destroy();
    window.location.href = "/"
  }
  handleSettingsOpen() {
    this.setState({ showSettings: true });
  }

  handleSettingsClose() {
    this.setState({ showSettings: false });
  }

  render() {
    const { payload } = Session.get();
    const username = payload.username;

    return(
      <div>
        <div className="top-bar-nav">
          <ul className="comments-views">
            <li className="view-choices"><Link to="/all">All</Link></li>
            <li className="view-choices"><Link to="/sorted">Sorted</Link></li>
          </ul>

          <h1>Linq</h1>
          <button className="settings-button" onClick={this.handleSettingsOpen}>Settings</button>
          <div>
            <ReactModal
              isOpen={this.state.showSettings}
              shouldCloseOnOverlayClick={false}
              shouldCloseOnEsc={true}
              contentLabel="User Settings"
            >
              <button onClick={this.handleSettingsClose}>x</button>
              <Settings />
            </ReactModal>
          </div>
          <div className="user-loggedin">
            <h3>{username}</h3>
            <button onClick={this.handleLogout} className="logout-button">Logout</button>
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
