import { ACTION_TYPES } from "../constants/actionTypes";

const reducer = (friendships = [], action) => {
  switch (action.type) {
    case ACTION_TYPES.GET_MY_FRIENDS:
      return action.payload;
    case ACTION_TYPES.ADD_FRIEND:
      return [...friendships, action.payload];
    case ACTION_TYPES.DELETE_FRIEND:
      return friendships.filter(({ _id }) => _id !== action.payload);
    default:
      return friendships;
  }
};

export default reducer;
