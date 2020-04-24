import React, {Component} from "react";
import {Session} from 'bc-react-session';
import Highlighter from "react-highlight-words";

class CommentResponseDialog extends Component {
  sendResponse(event) {
    const buttonId = event.target.id;
    console.log(buttonId);

    // handle sending response to comment
  }

  render() {
    const comment = this.props.comment;
    const commentKeywords = comment.keywords;

    const { payload } = Session.get();
    const keywordConfig = payload.config.keywords;

    const responses = keywordConfig.map((k) => (
      <div key={k.keyword}>
        <h4>"{k.keyword}" Responses</h4>

        <div>
          {k.responses.map((response) => (
            <div>
            <button id={response} key={response} onClick={this.sendResponse}>{response}</button><br />
          </div>
          ))}
        </div>
      </div>
    ))

    return (
      <div className="response-dialog">
        <div className="dialog-left">
          <h2>{comment.username}</h2>
          <Highlighter
            highlightTag={ContrastHighlight}
            searchWords={commentKeywords}
            autoEscape={true}
            textToHighlight={comment.commentText}
            />
          <br />
          <small>{comment.timestamp}</small>
        </div>
        <div className="dialog-right">
          <h3>Responses</h3>
          <small>Click to respond.</small>
          {responses}
        </div>
      </div>
    )
  }
}

const ContrastHighlight = ({ children, highlightedIndex }) => (
  <span className="contrast-highlight">{children}</span>
)

export default CommentResponseDialog;
