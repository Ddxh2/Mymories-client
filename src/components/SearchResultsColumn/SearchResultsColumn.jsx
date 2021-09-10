import React, { useState, useEffect } from "react";

import SearchResultRow from "./SearchResultRow/SearchResultRow";
import Pagination from "./Pagination/Pagination";
import { CircularProgress } from "@material-ui/core";

import { findUsersByUsername } from "../../api";
import { PAGE_SIZE } from "../../constants/pageSize";

import "./SearchResultsColumn.css";

const SearchResultsColumn = ({ username }) => {
  const [foundUsers, setFoundUsers] = useState(null);
  const [searching, setSearching] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const [usersSlice, setUsersSlice] = useState(null);

  useEffect(() => {
    if (!!username) {
      setSearching(true);
      findUsersByUsername(username.toLowerCase())
        .then(({ data }) => {
          setFoundUsers(data);
          setSearching(false);
        })
        .catch((error) => console.log(error));
    }
  }, [username]);

  useEffect(() => {
    if (!!foundUsers) {
      setUsersSlice(foundUsers.slice(startIndex, startIndex + PAGE_SIZE));
    }
  }, [foundUsers, startIndex]);

  const onBack = () => setStartIndex((prev) => prev - PAGE_SIZE);
  const onForward = () => setStartIndex((prev) => prev + PAGE_SIZE);

  return (
    <div className='searchResultsColumn'>
      {searching && <CircularProgress size={60} />}
      {!!usersSlice ? (
        !!usersSlice.length ? (
          usersSlice.map((user) => (
            <SearchResultRow key={user.id} user={user} />
          ))
        ) : (
          <h4>No Users Found</h4>
        )
      ) : null}
      {!!foundUsers && (
        <Pagination
          backDisabled={startIndex === 0}
          forwardDisabled={startIndex + PAGE_SIZE >= foundUsers.length}
          onBack={onBack}
          onForward={onForward}
        />
      )}
    </div>
  );
};

export default SearchResultsColumn;
