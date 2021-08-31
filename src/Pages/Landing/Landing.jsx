import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

import { logIn, createUser } from "../../actions/users";

import "./Landing.css";

const Landing = () => {
  const [user, setUser] = useState(null);

  const usernameRef = useRef();

  useEffect(() => {
    if (!!usernameRef.current) {
      usernameRef.current.focus();
    }
  }, [usernameRef]);

  const dispatch = useDispatch();

  const handleLogIn = () => {
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
      <table className='landingPage__inputRows'>
        <tbody>
          <tr className='landingPage__inputRow'>
            <td className='landingPage__inputRow__cell'>
              <label htmlFor='username'>Username: </label>
            </td>
            <td className='landingPage__inputRow__cell'>
              <input
                ref={usernameRef}
                id='username'
                type='text'
                onChange={(e) => handleOnChange(e, "username")}
              />
            </td>
          </tr>
          <tr className='landingPage__inputRow'>
            <td className='landingPage__inputRow__cell'>
              <label htmlFor='password'>Password: </label>
            </td>
            <td className='landingPage__inputRow__cell'>
              <input
                id='password'
                type='password'
                onChange={(e) => handleOnChange(e, "password")}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <div className='landingPage__buttonWrapper'>
        <button className='secondary' disabled={!user} onClick={handleLogIn}>
          Log In
        </button>
        <button className='primary' disabled={!user} onClick={handleSignUp}>
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Landing;
