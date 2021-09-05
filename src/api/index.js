import axios from "axios";

const url = process.env.REACT_APP_URL;
const postsUrl = `${url}/posts`;
const usersUrl = `${url}/users`;

export const fetchPosts = () => axios.get(postsUrl);
export const fetchPostsForMe = (id) => axios.get(`${postsUrl}/${id}`);
export const createPost = (newPost) => axios.post(postsUrl, newPost);
export const updatePost = (id, updatedPost) =>
  axios.patch(`${postsUrl}/${id}`, updatedPost);
export const deletePost = (id) => axios.delete(`${postsUrl}/${id}`);
export const likePost = (id) => axios.patch(`${postsUrl}/${id}/likePost`);

export const logIn = (user) => axios.post(`${usersUrl}/login`, user);
export const createUser = (user) => axios.post(usersUrl, user);
