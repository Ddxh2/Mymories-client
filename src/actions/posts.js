import * as api from "../api";

import { ACTION_TYPES } from "../constants/actionTypes";

// Action Creators

export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts();
    dispatch({ type: ACTION_TYPES.FETCH_ALL_POSTS, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getPostsForMe = (id) => async (dispatch) => {
  try {
    const { data } = await api.fetchPostsForMe(id);
    dispatch({ type: ACTION_TYPES.FETCH__POSTS_FOR_ME, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const createPost = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);
    dispatch({ type: ACTION_TYPES.CREATE_POST, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);
    dispatch({ type: ACTION_TYPES.UPDATE_POST, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);
    dispatch({ type: ACTION_TYPES.DELETE_POST, payload: id });
  } catch (error) {
    console.log(error);
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);
    dispatch({ type: ACTION_TYPES.UPDATE_POST, payload: data });
  } catch (error) {
    console.log(error);
  }
};
