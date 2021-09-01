import * as api from "../api";
import NodeRSA from "node-rsa";

import { ACTION_TYPES, ERROR_TYPES } from "../constants/";

export const logIn = (user) => async (dispatch) => {
  const key = new NodeRSA(process.env.REACT_APP_PUBLIC_KEY);
  const { password, username } = user;
  const encryptedPassword = key.encrypt(password, "base64");
  try {
    const { data } = await api.logIn({ username, password: encryptedPassword });
    const payload = { success: data, type: null, username };
    dispatch({ type: ACTION_TYPES.LOG_IN, payload });
  } catch (error) {
    if (!!error.response) {
      const payload = {
        success: false,
        type:
          error.response.status === 401
            ? ERROR_TYPES.PASSWORD
            : ERROR_TYPES.USERNAME,
      };
      dispatch({ type: ACTION_TYPES.LOG_IN, payload });
    }
    console.log(error);
  }
};

export const createUser = (user) => async (dispatch) => {
  try {
    const { password, username } = user;
    const key = new NodeRSA(process.env.REACT_APP_PUBLIC_KEY);
    const encryptedPassword = key.encrypt(password, "base64");
    const { data } = await api.createUser({
      username,
      password: encryptedPassword,
    });
    const payload = { success: data, type: ACTION_TYPES.CREATE_USER, username };
    dispatch({ type: ACTION_TYPES.CREATE_USER, payload });
  } catch (error) {
    if (!!error.response && error.response.status === 403) {
      const payload = {
        success: false,
        type: ERROR_TYPES.CREATE_USER,
        username: null,
      };
      dispatch({ payload, type: ACTION_TYPES.CREATE_USER });
    }
    console.log(error);
  }
};
