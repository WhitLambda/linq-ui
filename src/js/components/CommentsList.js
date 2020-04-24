import React, {Component} from "react";

import Comment from "./Comment"

class CommentsList extends Component {
  render() {
    const comments = this.props.comments;
    let categoryName = this.props.name;
    if (categoryName) {
      categoryName = categoryName.charAt(0).toUpperCase() + this.props.name.slice(1);
    }
    const commentsElements = comments.map(function(c) {
      return(
        <Comment comment={c} key={c.commentId}/>
      )
    });

    return (
      <div>
        <h3>{categoryName ? categoryName : ""}</h3>
        {commentsElements}
      </div>
    )
  }
}

export default CommentsList;
