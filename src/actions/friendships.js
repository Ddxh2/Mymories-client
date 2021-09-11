import * as api from "../api";

import { ACTION_TYPES } from "../constants/";

export const getMyFriends = (userId) => async (dispatch) => {
  try {
    const { data: payload } = await api.getMyFriends(userId);
    dispatch({ type: ACTION_TYPES.GET_MY_FRIENDS, payload });
  } catch (error) {
    console.log(error);
  }
};

export const addFriend = (userId1, userId2) => async (dispatch) => {
  try {
    const { data: payload } = await api.addFriend(userId1, userId2);
    dispatch({ type: ACTION_TYPES.ADD_FRIEND, payload });
  } catch (error) {
    console.log(error);
  }
};

export const deleteFriend = (friendshipId) => async (dispatch) => {
  try {
    await api.deleteFriend(friendshipId);
    dispatch({ type: ACTION_TYPES.DELETE_FRIEND, payload: friendshipId });
  } catch (error) {
    console.log(error);
  }
};
