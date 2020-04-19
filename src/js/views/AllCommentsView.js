import React, {Component} from "react";

import CommentsList from "../components/CommentsList";

class AllCommentsView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      comments: []
    }
  }

  componentDidMount() {
    // TODO: remove dummy data json
    let dummyData = require("../../dummy_comments.json").comments;
    this.setState({comments: dummyData})

    /* TODO: setup comments fetching from API
    fetch()
      .then(response => this.setState({ comments: response.comments }));

    */
  }

  render() {
    const comments = this.state.comments;
    const commentsList = <CommentsList comments={comments} />

    return(
      <div>
      {comments ? commentsList: <p>No comments found.</p>}
      </div>
    )
  }
}

export default AllCommentsView;
