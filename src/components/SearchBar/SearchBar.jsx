import React, { useState, useEffect, useRef } from "react";

import { Link } from "react-router-dom";

import "./SearchBar.css";

const SearchBar = ({ username }) => {
  const [searchString, setSearchString] = useState("");
  const searchRef = useRef();

  useEffect(() => {
    searchRef.current.focus();
  }, [searchRef]);

  useEffect(() => {
    if (!!username) {
      setSearchString(username);
    }
  }, [username]);

  return (
    <form className='search__form'>
      <input
        className='search__input'
        type='text'
        ref={searchRef}
        value={searchString}
        onChange={(e) => setSearchString(e.target.value)}
      />
      <Link to={`/search/${searchString}`}>
        <button className='search__submit'>Search</button>
      </Link>
    </form>
  );
};

export default SearchBar;
