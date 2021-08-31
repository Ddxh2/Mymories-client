import { ACTION_TYPES } from "../constants/actionTypes";

const reducer = (posts = [], action) => {
  switch (action.type) {
    case ACTION_TYPES.FETCH_ALL:
      return action.payload;
    case ACTION_TYPES.CREATE:
      return [...posts, action.payload];
    case ACTION_TYPES.UPDATE:
      return posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    case ACTION_TYPES.DELETE:
      return posts.filter((post) => post._id !== action.payload);
    default:
      return posts;
  }
};

export default reducer;
