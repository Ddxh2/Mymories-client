import { ACTION_TYPES } from "../constants/actionTypes";

const reducer = (
  loggedInUser = {
    success: null,
    type: null,
    username: null,
    id: null,
    profileImage: "",
  },
  action
) => {
  switch (action.type) {
    case ACTION_TYPES.LOG_IN:
    case ACTION_TYPES.CREATE_USER:
    case ACTION_TYPES.UPDATE_USER:
      if (action.payload.success === true) {
        localStorage.setItem(
          "loggedInUser",
          JSON.stringify({
            username: action.payload.username,
            id: action.payload.id,
            profileImage: action.payload.profileImage,
          })
        );
      }
      return action.payload;
    case ACTION_TYPES.ALREADY_LOGGED_IN:
      return action.payload;
    case ACTION_TYPES.LOG_OUT:
      localStorage.removeItem("loggedInUser");
      return action.payload;
    default:
      return loggedInUser;
  }
};

export default reducer;
