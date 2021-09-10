import { ACTION_TYPES } from "../constants/actionTypes";

const reducer = (posts = [], action) => {
  switch (action.type) {
    case ACTION_TYPES.FETCH_ALL_POSTS:
    case ACTION_TYPES.FETCH__POSTS_FOR_ME:
      return action.payload;
    case ACTION_TYPES.CREATE_POST:
      return [...posts, action.payload];
    case ACTION_TYPES.UPDATE_POST:
      return posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    case ACTION_TYPES.DELETE_POST:
      return posts.filter((post) => post._id !== action.payload);
    default:
      return posts;
  }
};

export default reducer;
