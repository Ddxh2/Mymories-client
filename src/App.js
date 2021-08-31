import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useSelector } from "react-redux";

import { Landing, Home } from "./Pages";

import "./App.css";

const App = () => {
  const loggedIn = useSelector((state) => state.loggedIn);
  return (
    <Router>
      <div className='app'>
        {!loggedIn ? (
          <Switch>
            {!loggedIn && <Route path='/' component={Landing}></Route>}
            <Redirect to='/' />
          </Switch>
        ) : (
          <Switch>
            <Route path='/' component={Home}></Route>
            <Redirect to='/' />
          </Switch>
        )}
      </div>
    </Router>
  );
};

export default App;
