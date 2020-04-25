import React, {Component} from "react";
import {Session} from "bc-react-session";
import ReactModal from "react-modal";
import $ from "jquery";

import Keyword from "./Keyword";

var _ = require("lodash");

class KeywordsConfigList extends Component {
  constructor(props) {
    super(props);
    const {payload} = Session.get();

    this.state = {
      keywords: payload.config.keywords,
      showAddKeyword: false,
      showUnsavedChanges: false,
      showAddingDuplicate: false
    }

    this.handleAddKeywordOpen = this.handleAddKeywordOpen.bind(this);
    this.handleAddKeywordClose = this.handleAddKeywordClose.bind(this);
    this.addKeyword = this.addKeyword.bind(this);
  }

  addKeyword() {
    // get current keywordsList
    // show create keyword dialog
    // user clicks create
    // get values from create dialog
    // append keyword to current keywordsList
    // set this.state with updated list

    let keywordsList = this.state.keywords;
    const keywordInput = $("#new-keyword").val();
    const thisComp = this;

    // check for adding a duplicate
    _.forEach(keywordsList, function(k) {
      if (k.keyword === keywordInput) {
        thisComp.setState({ showAddingDuplicate: true });
        alert("The word or phrase you are trying to add already exists.");
        return;
      }
    })

    const newKeyword = {
      autoreply: false,
      keyword: keywordInput,
      responses: []
    }
    keywordsList.push(newKeyword);
    this.setState({ keywords: keywordsList });

    this.handleAddKeywordClose();
  }

  handleAddKeywordOpen() {
    this.setState({ showAddKeyword: true });
  }

  handleAddKeywordClose() {
    this.setState({ showAddKeyword: false });
  }

  render() {
    const addingDuplicate = this.state.addingDuplicate ? <p className="duplicate warning">The word or phrase you are trying to add already exists.</p> : null;
    const unsavedChanges = this.state.unsavedChanges ? <p className="unsaved-changes warning">Warning: unsaved changes. Click 'Save Config' before exiting.</p> : null;

    const keywords = this.state.keywords;
    const keywordsList = keywords.map(function(k) {
      return(
        <Keyword keyword={k} key={k.keyword}/>
      )
    });

    return (
      <div>
        <h2>Configure Keywords</h2>
        {unsavedChanges}
        <button onClick={this.handleAddKeywordOpen}>Add Keyword</button>
        {keywordsList}
        <ReactModal
          isOpen={this.state.showAddKeyword}
          shouldCloseOnOverlayClick={false}
          shouldCloseOnEsc={true}
          contentLabel="Add Keyword"
        >
          <h4>New Keyword/Phrase:</h4>
          {addingDuplicate}
          <input type="text" id="new-keyword"></input>
          <button onClick={this.addKeyword}>Create</button>
          <button onClick={this.handleAddKeywordClose}>Cancel</button>
        </ReactModal>
      </div>
    )
  }
}

export default KeywordsConfigList;
