import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { ACTION_TYPES } from "../../constants";

import "./LogOut.css";

const LogOut = () => {
  const loggedIn = useSelector((state) => state.loggedIn);
  const dispatch = useDispatch();
  const onLogOut = () => {
    dispatch({
      type: ACTION_TYPES.LOG_OUT,
      payload: { success: null, type: null, username: null },
    });
  };
  return loggedIn.success ? (
    <button className='logOut' onClick={() => onLogOut()}>
      Log Out
    </button>
  ) : null;
};

export default LogOut;
