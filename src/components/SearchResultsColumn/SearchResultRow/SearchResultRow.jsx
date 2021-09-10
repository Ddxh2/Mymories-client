import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { Avatar, AddFriend } from "../../";

import "./SearchResultRow.css";

const SearchResultRow = ({ user }) => {
  const loggedInUsername = useSelector((state) => state.loggedInUser.username);
  return (
    <div className='searchResultRow'>
      <div className='searchResultRow__item searchResultRow__item__avatar '>
        <Avatar className='searchResultRow__avatar' size='MEDIUM' user={user} />
      </div>
      <div className='searchResultRow__item searchResultRow__item__username'>
        <Link to={`/user/${user.username}`}>{user.username}</Link>
      </div>
      <div className='searchResultRow__item searchResultRow__item__addFriend'>
        {user.username !== loggedInUsername && (
          <AddFriend className='searchResultRow__addFriend' userId={user.id} />
        )}
      </div>
    </div>
  );
};

export default SearchResultRow;
