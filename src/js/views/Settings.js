import React, {Component} from "react";
import {Session} from "bc-react-session";

import KeywordsConfigList from "../components/KeywordsConfigList";

class Settings extends Component {
  render() {
    const {payload} = Session.get();

    return(
      <div>
        <p>{payload.config.username}</p>
        <KeywordsConfigList />
      </div>
    )
  }
}

export default Settings;
