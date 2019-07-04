import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import PostItem from "./PostItem";

class PostFeed extends Component {
  render() {
    const { posts } = this.props;
    return (
      <div>
        {posts.map(post => (
          <PostItem key="post._id" post={post} />
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({});

PostFeed.propTypes = {
  posts: PropTypes.array.isRequired
};

export default connect(mapStateToProps)(PostFeed);
