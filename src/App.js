import React, { useEffect } from "react";
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Header, Welcome, LogOut } from "./components";
import { Landing, Home } from "./Pages";

import { ACTION_TYPES } from "./constants";

import "./App.css";

const App = () => {
  const loggedIn = useSelector((state) => state.loggedIn);
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
  return (
    <Router>
      <div className='app'>
        {!!loggedIn.success && <Welcome username={loggedIn.username} />}
        <LogOut />
        <Header />
        {!loggedIn.success ? (
          <Switch>
            {!loggedIn.success && (
              <Route path='/login' component={Landing}></Route>
            )}
            <Redirect to='/login' />
          </Switch>
        ) : (
          <Switch>
            <Route path='/home' component={Home}></Route>
            <Redirect to='/home' />
          </Switch>
        )}
      </div>
    </Router>
  );
};

export default App;
