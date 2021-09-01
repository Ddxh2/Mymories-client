import React from "react";
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useSelector } from "react-redux";

import { Header } from "./components";
import { Landing, Home } from "./Pages";

import "./App.css";

const App = () => {
  const loggedIn = useSelector((state) => state.loggedIn);
  return (
    <Router>
      <div className='app'>
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
