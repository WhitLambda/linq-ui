import React, {Component} from "react";

import Response from "./Response";

class Keyword extends Component {

  constructor(props) {
    super(props);
    const responses = this.props.keyword.responses;

    this.state = {
      responses: responses
    }
  }

  handleAddResponse() {

  }

  render() {
    const responses = this.state.responses;
    const keyword = this.props.keyword;
    const responsesList = responses.map(function(r) {
      return (
        <Response response={r} />
      )
    })

    return(
      <div>
        <h4>{"\"" + keyword.keyword + "\"" }</h4>
        {responsesList}
        <button><small>Add Response</small></button>
      </div>
    )
  }
}

export default Keyword;
