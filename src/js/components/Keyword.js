import React, {Component} from "react";
import $ from "jquery";

import Response from "./Response";

var _ = require("lodash");

class Keyword extends Component {

  constructor(props) {
    super(props);
    const responses = this.props.keyword.responses;

    this.state = {
      responses: responses,
      showAddResponse: false
    }

    this.handleAddResponseOpen = this.handleAddResponseOpen.bind(this);
    this.handleAddResponseClose = this.handleAddResponseClose.bind(this);
    this.addResponse = this.addResponse.bind(this);
  }

  addResponse() {
    let responsesList = this.state.responses;
    const thisComp = this;
    const responseInput = $("#new-response").val();

    if (responseInput.length < 1) {
      alert("The response must be at least 1 character long.");
      return;
    }

    let foundDuplicate = false;
    _.forEach(responsesList, function(r) {
      if (r === responseInput) {
        alert("The response you are trying to add already exists.");
        foundDuplicate = true;
        return false;
      }
    })

    if (foundDuplicate) return;

    responsesList.push(responseInput);
    this.setState({responses: responsesList });
    this.handleAddResponseClose();
    thisComp.props.setUnsavedChanges();
  }

  handleAddResponseOpen() {
    this.setState({ showAddResponse: true });
  }

  handleAddResponseClose() {
    this.setState({ showAddResponse: false });
  }

  render() {
    const responses = this.state.responses;
    const keyword = this.props.keyword;
    const responsesList = responses.map(function(r) {
      return (
        <Response response={r}/>
      )
    })

    let addResponseElement;
    if (this.state.showAddResponse) {
      addResponseElement =
        <div>
          <input type="text" id="new-response" placeholder="Add Response"></input>
            <button onClick={this.addResponse}>Create</button>
            <button onClick={this.handleAddResponseClose}>Cancel</button>
        </div>
    } else {
      addResponseElement = <button onClick={this.handleAddResponseOpen}><small>Add Response</small></button>
    }

    return(
      <div>
        <h4>{"\"" + keyword.keyword + "\"" }</h4>
        {responsesList}

        {addResponseElement}
      </div>
    )
  }
}

export default Keyword;
