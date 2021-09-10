import React from "react";

import { SearchBar, SearchResultsColumn } from "../../components";
import PersonIcon from "@material-ui/icons/Person";

import "./Search.css";

const Search = ({ match }) => {
  const { username } = match.params;

  return (
    <div className='searchPage'>
      <h1>
        <PersonIcon /> Search By Username
      </h1>
      <SearchBar username={username} />
      {!!username && <SearchResultsColumn username={username} />}
    </div>
  );
};

export default Search;
