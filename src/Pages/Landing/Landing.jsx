import React, { useState, useEffect, useRef, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import { logIn, createUser } from "../../actions/users";
import { ERROR_TYPES } from "../../constants";

import { CircularProgress } from "@material-ui/core";

import "./Landing.css";

const Landing = () => {
  const [user, setUser] = useState(null);
  const [waiting, setWaiting] = useState(false);
  const loggedInUser = useSelector((state) => state.loggedInUser);

  const invalidField = useMemo(() => {
    if (loggedInUser.success !== false) {
      return {
        username: false,
        password: false,
        createUser: false,
        errorMessage: "",
      };
    } else {
      const invalidUsername = loggedInUser.type === ERROR_TYPES.USERNAME;
      const invalidPassword = loggedInUser.type === ERROR_TYPES.PASSWORD;
      const invaliedCreateUser = loggedInUser.type === ERROR_TYPES.CREATE_USER;
      const errorMessage = invalidPassword
        ? "Invalid Password"
        : invalidUsername
        ? "Invalid Username"
        : invaliedCreateUser
        ? "Username is Taken"
        : "";
      return {
        username: invalidUsername,
        password: invalidPassword,
        createUser: invaliedCreateUser,
        errorMessage,
      };
    }
  }, [loggedInUser]);

  const usernameRef = useRef();

  useEffect(() => {
    if (!!usernameRef.current) {
      usernameRef.current.focus();
    }
  }, [usernameRef]);

  useEffect(() => {
    if (loggedInUser.success !== null) {
      setWaiting(false);
    }
  }, [loggedInUser]);

  const dispatch = useDispatch();

  const handleLogIn = () => {
    setWaiting(true);
    dispatch(
      logIn({ password: user.password, username: user.username.toLowerCase() })
    );
  };

  const handleSignUp = () => {
    dispatch(
      createUser({
        password: user.password,
        username: user.username.toLowerCase(),
      })
    );
  };

  const handleOnChange = (event, propName) => {
    setUser((prev) => ({ ...prev, [propName]: event.target.value }));
  };

  return (
    <div className='landingPage'>
      {waiting && <CircularProgress size={30} />}
      <table className='landingPage__inputRows'>
        <tbody>
          <tr className='landingPage__inputRow'>
            <td className='landingPage__inputRow__cell'>
              <label htmlFor='username'>Username: </label>
            </td>
            <td className='landingPage__inputRow__cell'>
              <div>
                <input
                  className={
                    invalidField.username || invalidField.createUser
                      ? "landingPage__inputRow__cell__invalidInput"
                      : ""
                  }
                  ref={usernameRef}
                  id='username'
                  type='text'
                  onChange={(e) => handleOnChange(e, "username")}
                />
                {(invalidField.username || invalidField.createUser) && (
                  <span className='landingPage__inputRow__cell__invalidText'>
                    {invalidField.errorMessage}
                  </span>
                )}
              </div>
            </td>
          </tr>
          <tr className='landingPage__inputRow'>
            <td className='landingPage__inputRow__cell'>
              <label htmlFor='password'>Password: </label>
            </td>
            <td className='landingPage__inputRow__cell'>
              <div>
                <input
                  className={
                    invalidField.password
                      ? "landingPage__inputRow__cell__invalidInput"
                      : ""
                  }
                  id='password'
                  type='password'
                  onChange={(e) => handleOnChange(e, "password")}
                />
                {invalidField.password && (
                  <span className='landingPage__inputRow__cell__invalidText'>
                    {invalidField.errorMessage}
                  </span>
                )}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div className='landingPage__buttonWrapper'>
        <button
          className='secondary'
          disabled={waiting || !user || !(user.username && user.password)}
          onClick={handleLogIn}
        >
          Log In
        </button>
        <button
          className='primary'
          disabled={waiting || !user || !(user.username && user.password)}
          onClick={handleSignUp}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Landing;
