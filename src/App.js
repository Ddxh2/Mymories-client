import React, { useEffect } from "react";
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { GlobalSticky } from "./components";
import { Landing, Home, Profile, Search } from "./Pages";

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
    if(!!loggedInUser){
      localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
    }
  }, [loggedInUser]);

  return (
    <Router>
      <div className='app'>
        <GlobalSticky />
        {!loggedInUser.success ? (
          <Switch>
            {!loggedInUser.success && (
              <Route path='/login' component={Landing} />
            )}
            <Redirect to='/login' />
          </Switch>
        ) : (
          <Switch>
            <Route path='/home' component={Home} />
            <Route path='/user/:username' component={Profile} />
            <Route path='/search/:username?' component={Search} />
            <Redirect to='/home' />
          </Switch>
        )}
      </div>
    </Router>
  );
};

export default App;
