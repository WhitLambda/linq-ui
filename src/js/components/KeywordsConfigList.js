import React, {Component} from "react";
import {Session} from "bc-react-session";
import $ from "jquery";

import Keyword from "./Keyword";

var _ = require("lodash");

class KeywordsConfigList extends Component {
  constructor(props) {
    super(props);
    const {payload} = Session.get();

    this.state = {
      keywordsData: payload.config.keywords,
      showAddKeyword: false,
      showUnsavedChanges: false
    }

    this.handleAddKeywordOpen = this.handleAddKeywordOpen.bind(this);
    this.handleAddKeywordClose = this.handleAddKeywordClose.bind(this);
    this.addKeyword = this.addKeyword.bind(this);
    this.setUnsavedChanges = this.setUnsavedChanges.bind(this);
    this.unsetUnsavedChanges = this.unsetUnsavedChanges.bind(this);
    this.handleSaveConfig = this.handleSaveConfig.bind(this);
    this.handleDeleteKeyword = this.handleDeleteKeyword.bind(this);
  }

  addKeyword() {
    let keywordsList = this.state.keywordsData;
    const keywordInput = $("#new-keyword").val();

    if (keywordInput.length < 1) {
      alert("The keyword/phrase must be at least 1 character long.");
      return;
    }

    // check for adding a duplicate
    let foundDuplicate = false;
    _.forEach(keywordsList, function(k) {
      if (k.keyword === keywordInput) {
        alert("The word or phrase you are trying to add already exists.");
        foundDuplicate = true;
        return false;
      }
    })
    if (foundDuplicate) return;

    const newKeyword = {
      autoreply: false,
      keyword: keywordInput,
      responses: []
    }
    keywordsList.push(newKeyword);
    this.setState({ keywordsData: keywordsList, showUnsavedChanges: true });

    this.handleAddKeywordClose();
  }

  handleSaveConfig() {
    const keywordsData = this.state.keywordsData;
    const {payload} = Session.get();
    Session.setPayload({
      config: {
        username:  payload.username,
        keywords: keywordsData
      }
    });
    this.setState({ showUnsavedChanges: false });
  }

  handleDeleteKeyword(keyword) {
    let keywordsData = this.state.keywordsData;
    _.remove(keywordsData, keyword);
    this.setState({ keywordsData: keywordsData, showUnsavedChanges: true });
  }

  handleAddKeywordOpen() {
    this.setState({ showAddKeyword: true });
  }

  handleAddKeywordClose() {
    this.setState({ showAddKeyword: false });
  }

  setUnsavedChanges() {
    this.setState({ showUnsavedChanges: true });
  }

  unsetUnsavedChanges() {
    this.setState({ showUnsavedChanges: false });
  }

  render() {
    const thisComp = this;

    let addKeywordElement;
    let unsavedChanges;

    if (this.state.showAddKeyword) {
      addKeywordElement =
        <div>
          <input type="text" id="new-keyword" placeholder="Add Keyword"></input>
          <button onClick={this.addKeyword}>Create</button>
          <button onClick={this.handleAddKeywordClose}>Cancel</button>
        </div>
    } else {
      addKeywordElement = <button onClick={this.handleAddKeywordOpen}>Add Keyword</button>
    }

    if (this.state.showUnsavedChanges) {
      unsavedChanges = <p className="warning">Warning: you have unsaved changes to your config. Click 'Save Config' to save.</p>
    }

    const keywords = this.state.keywordsData;
    const keywordsList = keywords.map(function(k) {
      return(
        <Keyword keyword={k}
          setUnsavedChanges={thisComp.setUnsavedChanges}
          unsetUnsavedChanges={thisComp.unsetUnsavedChanges}
          handleDeleteKeyword={thisComp.handleDeleteKeyword}
          key={k.keyword}/>
      )
    });

    return (
      <div>
        <h2>Configure Keywords</h2>
        <button onClick={this.handleSaveConfig}>Save Config</button>
        <button>Import</button>
        <button>Export</button>
        <br />
        {unsavedChanges}
        {addKeywordElement}
        {keywordsList}
      </div>
    )
  }
}

export default KeywordsConfigList;
