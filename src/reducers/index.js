import { combineReducers } from "redux";

import posts from "./posts";
import loggedInUser from "./users";
import friendships from "./friendships";

export default combineReducers({ posts, loggedInUser, friendships });
