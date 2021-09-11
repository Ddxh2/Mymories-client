import axios from "axios";

const url = process.env.REACT_APP_URL;
const postsUrl = `${url}/posts`;
const usersUrl = `${url}/users`;
const friendshipsUrl = `${url}/friendships`;

// Posts

export const fetchPosts = () => axios.get(postsUrl);
export const fetchPostsForMe = (id) => axios.get(`${postsUrl}/${id}`);
export const fetchMyPosts = (id) => axios.get(`${postsUrl}/my/${id}`);
export const createPost = (newPost) => axios.post(postsUrl, newPost);
export const updatePost = (id, updatedPost) =>
  axios.patch(`${postsUrl}/${id}`, updatedPost);
export const deletePost = (id) => axios.delete(`${postsUrl}/${id}`);
export const likePost = (id) => axios.patch(`${postsUrl}/${id}/likePost`);

// Users

export const logIn = (user) => axios.post(`${usersUrl}/login`, user);
export const createUser = (user) => axios.post(usersUrl, user);
export const updateUser = (newUser) =>
  axios.patch(`${usersUrl}/${newUser.username}`, newUser);

// Identifier is either id or username
export const getUserProfile = (identifier) =>
  axios.get(`${usersUrl}/${identifier}`);

export const findUsersByUsername = (usernameSearchString) =>
  axios.get(`${usersUrl}/find/${usernameSearchString}`);

// Friendships

export const getMyFriends = (id) => axios.get(`${friendshipsUrl}/${id}`);
export const addFriend = (userId1, userId2) =>
  axios.post(friendshipsUrl, { userId1, userId2 });
export const deleteFriend = (friendshipId) =>
  axios.delete(`${friendshipsUrl}/${friendshipId}`);
