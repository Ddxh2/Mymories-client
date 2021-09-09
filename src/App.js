import React, { useEffect } from "react";
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Header, Welcome, LogOut, Avatar } from "./components";
import { Landing, Home, Profile } from "./Pages";

import { ACTION_TYPES } from "./constants";

import "./App.css";

const App = () => {
  const loggedInUser = useSelector((state) => state.loggedInUser);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!!localStorage.getItem("loggedInUser")) {
      dispatch({
        type: ACTION_TYPES.ALREADY_LOGGED_IN,
        payload: {
          ...JSON.parse(localStorage.getItem("loggedInUser")),
          success: true,
          type: null,
        },
      });
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
  }, [loggedInUser]);

  return (
    <Router>
      <div className='app'>
        {!!loggedInUser.success && <Welcome username={loggedInUser.username} />}
        <LogOut />
        <Header />
        {!loggedInUser.success ? (
          <Switch>
            {!loggedInUser.success && (
              <Route path='/login' component={Landing} />
            )}
            <Redirect to='/login' />
          </Switch>
        ) : (
          <>
            <div className='app__avatar'>
              <Avatar size='MEDIUM' user={loggedInUser} showBorder={true} />
            </div>
            <Switch>
              <Route path='/home' component={Home} />
              <Route path='/user/:username' component={Profile} />
              <Redirect to='/home' />
            </Switch>
          </>
        )}
      </div>
    </Router>
  );
};

export default App;
