import React, {Component} from "react";

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
    fetch( TODO: add backend comments endpoint )
      .then(response => this.setState({ comments: response.comments }));

    */
  }

  render() {
    const comments = this.state.comments;
    const elements = comments.map((c) => {
      return (
        <div>
          <h4 key={c.username}>{c.username}</h4>
          <p key={c.username}>{c.commentText}</p>
        </div>
      )
    });

    return(
      <div>
      {comments ? elements : <p>No comments found</p>}
      </div>
    )
  }
}

export default AllCommentsView;
