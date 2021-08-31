import { combineReducers } from "redux";

import posts from "./posts";
import loggedIn from "./users";

export default combineReducers({ posts, loggedIn });
