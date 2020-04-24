import React, {Component} from "react";
import ReactModal from "react-modal";
import Highlighter from "react-highlight-words";

import CommentResponseDialog from "./CommentResponseDialog";

ReactModal.setAppElement('#root');

class Comment extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showDialog: false
    };

    this.handleDialogOpen = this.handleDialogOpen.bind(this);
    this.handleDialogClose = this.handleDialogClose.bind(this);
  }

  handleDialogOpen() {
    this.setState({ showDialog: true });
  }

  handleDialogClose() {
    this.setState({ showDialog: false });
  }

  render() {
    const comment = this.props.comment;
    let platformIcon = "./img/" + comment.platform + ".png";

    return(
      <div>
        <div onClick={this.handleDialogOpen}>
          <img src={platformIcon} alt={comment.platform + " icon"}></img>
          <h4>{comment.username}</h4>
            <Highlighter
              className="comment"
              highlightTag={SubtleHighlight}
              searchWords={comment.keywords}
              autoEscape={true}
              textToHighlight={comment.commentText}
              />
          <p>{comment.timestamp}</p>
        </div>
        <div>
          <ReactModal
            isOpen={this.state.showDialog}
            shouldCloseOnOverlayClick={false}
            shouldCloseOnEsc={true}
            contentLabel="Comment Response Dialog"
          >
            <button onClick={this.handleDialogClose}>x</button>
            <CommentResponseDialog comment={comment}/>
          </ReactModal>
        </div>
      </div>
    )
  }
}

const SubtleHighlight = ({ children, highlightedIndex }) => (
  <span className="subtle-highlight">{children}</span>
)

export default Comment;
