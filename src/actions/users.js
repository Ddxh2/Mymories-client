import * as api from "../api";

import { ACTION_TYPES } from "../constants/actionTypes";

export const logIn = (user) => async (dispatch) => {
  try {
    const { data } = await api.logIn(user);
    dispatch({ type: ACTION_TYPES.LOG_IN, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const createUser = (user) => async (dispatch) => {
  try {
    const { data } = await api.createUser(user);
    dispatch({ type: ACTION_TYPES.CREATE_USER, payload: data });
  } catch (error) {
    console.log(error);
  }
};
