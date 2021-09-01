import { ACTION_TYPES } from "../constants/actionTypes";

const reducer = (
  loggedIn = { success: null, type: null, username: null },
  action
) => {
  switch (action.type) {
    case ACTION_TYPES.LOG_IN:
    case ACTION_TYPES.CREATE_USER:
      if (action.payload.success === true) {
        localStorage.setItem("loggedInUser", action.payload.username);
      }
      return action.payload;
    case ACTION_TYPES.ALREADY_LOGGED_IN:
      return action.payload;
    case ACTION_TYPES.LOG_OUT:
      localStorage.removeItem("loggedInUser");
      return action.payload;
    default:
      return loggedIn;
  }
};

export default reducer;
