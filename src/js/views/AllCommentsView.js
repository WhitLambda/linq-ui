import React, {Component} from "react";
import {Session} from "bc-react-session";

import CommentsList from "../components/CommentsList";

class AllCommentsView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      comments: []
    }
  }

  componentDidMount() {
    const {payload} = Session.get();

    fetch("http://127.0.0.1:8000/users/getcomments/",
    {
      method: "POST",
      body: JSON.stringify({"username": payload.username, "password": payload.password}),
    })
    .then(response => {
      return response.json();
    })
    .then(
      (result) => {
        this.setState({comments: result.comments});
    });
  }

  render() {
    const comments = this.state.comments;
    const commentsList = <CommentsList comments={comments} name="All Comments" />

    return(
      <div className="all-view">
      {comments ? commentsList: <p>No comments found.</p>}
      </div>
    )
  }
}

export default AllCommentsView;
