import { ACTION_TYPES } from "../constants/actionTypes";

const reducer = (loggedIn = { success: null, type: null }, action) => {
  switch (action.type) {
    case ACTION_TYPES.LOG_IN:
      return action.payload;

    case ACTION_TYPES.CREATE_USER:
      return { success: action.payload };
    default:
      return loggedIn;
  }
};

export default reducer;
