import React, {Component} from "react";
import {
  Route,
  Switch,
  NavLink,
  Redirect
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
          <h1>Linq</h1>
          <ul className="comments-views">
            <NavLink to="/all" activeClassName="nav-active"><li className="view-choices">All</li></NavLink>
            <NavLink to="/sorted" activeClassName="nav-active"><li className="view-choices">Sorted</li></NavLink>
          </ul>
          <h3>{username}</h3>
          <button className="settings-button" onClick={this.handleSettingsOpen}>Settings</button>
          <button onClick={this.handleLogout} className="logout-button">Logout</button>
          <div>
            <ReactModal
              isOpen={this.state.showSettings}
              shouldCloseOnOverlayClick={false}
              shouldCloseOnEsc={true}
              contentLabel="User Settings"
              className="settings-modal"
            >
              <Settings closeSettings={this.handleSettingsClose} />
            </ReactModal>
          </div>
        </div>

        <Switch>
          <PrivateRoute path="/" exact={true}/>
          <Route path="/all" component={AllCommentsView}></Route>
          <Route path="/sorted" component={SortedCommentsView}></Route>
        </Switch>
      </div>
    )
  }
}

const PrivateRoute = () => {
  const session = Session.get();

  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /signin page
    <Route render={props => (
      session.isValid ?
        <Redirect to="/all" />
        : <Redirect to="/login" />
    )} />
  );
};

export default LoggedInView;
