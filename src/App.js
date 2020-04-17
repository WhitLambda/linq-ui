import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import {Session} from 'bc-react-session';

import LoginPage from "./js/LoginPage";
import LoggedInView from "./js/LoggedInView";

class App extends Component {
  render() {
    return(
      <Router>
          <Switch>
          <Route path="/login" component={LoginPage}></Route>
          <PrivateRoute path="/">
            <LoggedInView/>
          </PrivateRoute>
        </Switch>
      </Router>
    )
  }
}

function PrivateRoute({ children, ...rest }) {
  const session = Session.get();
  const { payload } = Session.get();

  // if not logged in, redirect to /login page. Else show private component
  return (
    <Route
      {...rest}
      render={({ location }) =>
        session.isValid ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

export default App;
