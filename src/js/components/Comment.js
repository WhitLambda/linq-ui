import React, {Component} from "react";

class Comment extends Component {

  render() {
    const comment = this.props.comment;

    return(
      <div>
        <h4>{comment.username}</h4>
        <p>{comment.commentText}</p>
        <p>{comment.timestamp}</p>
      </div>
    )
  }
}

export default Comment;
