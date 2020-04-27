import React, {Component} from "react";

class Response extends Component {

  constructor(props) {
    super(props);

    this.deleteResponse = this.deleteResponse.bind(this);
  }

  deleteResponse() {
    this.props.deleteResponse(this.props.response);
  }

  render() {
    const response = this.props.response;

    return(
      <div>
        <p>{response}</p>
        <button onClick={this.deleteResponse}><img src="./img/trash.png" alt="trash icon"></img></button>
      </div>
    )
  }
}

export default Response;
