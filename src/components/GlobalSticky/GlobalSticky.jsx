import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { Welcome, LogOut, Header, Avatar, SearchIcon } from "..";

import "./GlobalSticky.css";

const GlobalSticky = () => {
  const loggedInUser = useSelector((state) => state.loggedInUser);
  return (
    <>
      {!!loggedInUser.success && <Welcome username={loggedInUser.username} />}
      <LogOut />
      <Header />
      {!!loggedInUser.success && (
        <>
          <div className='globalSticky__sidebar'>
            <div className='globalSticky__sidebar__item'>
              <Avatar
                className='globalStickey__sidebar__avatar'
                size='MEDIUM'
                user={loggedInUser}
                showBorder={true}
              />
            </div>
            <div className='globalSticky__sidebar__item'>
              <Link to='/search'>
                <SearchIcon />
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default GlobalSticky;
