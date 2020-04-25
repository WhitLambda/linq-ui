import React, {Component} from "react";

class Response extends Component {

  render() {
    const response = this.props.response;

    return(
      <p>{response}</p>
    )
  }
}

export default Response;
