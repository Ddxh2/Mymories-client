import React from "react";

import Search from "@material-ui/icons/Search";

import "./SearchIcon.css";

const SearchIcon = () => {
  return (
    <div className='searchIcon__border'>
      <div className='searchIcon__container'>
        <Search fontSize='inherit' color='inherit' />
      </div>
    </div>
  );
};

export default SearchIcon;
