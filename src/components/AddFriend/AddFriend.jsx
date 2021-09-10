import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { getMyFriends, addFriend, deleteFriend } from "../../api";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import PersonAddDisabledIcon from "@material-ui/icons/PersonAddDisabled";

import "./AddFriend.css";

const AddFriend = ({
  className = "",
  userId,
  onAdd = () => {},
  onRemove = () => {},
}) => {
  const loggedInUserId = useSelector((state) => state.loggedInUser.id);
  const [existingFriend, setExistingFriend] = useState(undefined);

  const onClick = () => {
    if (!!existingFriend) {
      deleteFriend(existingFriend)
        .then(() => {
          onRemove(existingFriend);
          setExistingFriend(null);
        })
        .catch((error) => console.log(error));
    } else {
      addFriend(loggedInUserId, userId)
        .then(({ data }) => {
          onAdd(data);
          setExistingFriend(data._id);
        })
        .catch((error) => console.log(error));
    }
  };

  useEffect(() => {
    if (!!loggedInUserId && !!userId && loggedInUserId !== userId) {
      getMyFriends(loggedInUserId).then(({ data }) => {
        const existingFriend = data.find(
          ({ userId1, userId2 }) =>
            (userId1 === loggedInUserId && userId2 === userId) ||
            (userId1 === userId && userId2 === loggedInUserId)
        );

        setExistingFriend(!!existingFriend ? existingFriend._id || null : null);
      });
    }
  }, [loggedInUserId, userId]);

  return existingFriend === undefined ? null : (
    <button
      className={`friendship__button ${
        existingFriend === undefined
          ? "friendship__button__hidden"
          : !!existingFriend
          ? "unfriend"
          : "addFriend"
      } ${className}`}
      onClick={onClick}
    >
      {!!existingFriend ? (
        <PersonAddDisabledIcon fontSize='inherit' />
      ) : (
        <PersonAddIcon fontSize='inherit' />
      )}
      &nbsp;
      {!!existingFriend ? "Unfriend" : "Add Friend"}
    </button>
  );
};

export default AddFriend;
