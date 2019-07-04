import axios from "axios";

import {
  POST_LOADING,
  GET_POSTS,
  GET_POST,
  ADD_POST,
  DELETE_POST,
  GET_ERRORS
} from "./types";

// Add Post
export const addPost = postData => dispatch => {
  // dispatch(clearErrors());
  axios
    .post("/api/posts", postData)
    .then(res =>
      dispatch({
        type: ADD_POST,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// Add Posts
export const getPosts = () => dispatch => {
  dispatch(setPostLoading());
  axios
    .post("/api/posts")
    .then(res =>
      dispatch({
        type: GET_POSTS,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch({
        type: GET_POSTS,
        payload: null
      });
    });
};

//Set loading state
export const setPostLoading = () => {
  return {
    type: POST_LOADING
  };
};
