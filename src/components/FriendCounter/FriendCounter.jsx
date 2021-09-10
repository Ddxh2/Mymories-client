import React, { useState, useEffect } from "react";

import { getMyFriends } from "../../api";

import { Avatar } from "../";

import "./FriendCounter.css";

const getFriends = (id, onSuccess) => {
  getMyFriends(id)
    .then(onSuccess)
    .catch((error) => console.log(error));
};

const getFriendUserId = (friendship, profileUserId) => {
  const { userId1, userId2 } = friendship;
  return userId1 === profileUserId ? userId2 : userId1;
};

const FriendCounter = ({
  userId,
  friendshipIdToRemove,
  friendshipToAdd,
  onAdded,
  onRemoved,
}) => {
  const [friends, setFriends] = useState([]);

  const onSuccess = (response) => {
    const friendships = response.data;
    // const friendIds = friendships.map(({ userId1, userId2 }) =>
    //   userId1 === userId ? userId2 : userId1
    // );
    // setFriends(friendIds);
    setFriends(friendships);
  };

  useEffect(() => {
    getFriends(userId, onSuccess);
  }, [userId]);

  useEffect(() => {
    if (!!friendshipIdToRemove) {
      setFriends((prevFriends) =>
        prevFriends.filter(({ _id }) => _id !== friendshipIdToRemove)
      );
      onRemoved();
    }
  }, [friendshipIdToRemove, onRemoved]);

  useEffect(() => {
    if (!!friendshipToAdd) {
      setFriends((prevFriends) => [...prevFriends, friendshipToAdd]);
      onAdded();
    }
  }, [friendshipToAdd, onAdded]);
  return (
    <div className='friendCounter'>
      <div className='friendCounter__header'>Friends: {friends.length}</div>
      <div className='friendCounter__body'>
        {friends.map((friendship) => (
          <div key={friendship._id}>
            <Avatar id={getFriendUserId(friendship, userId)} size='SMALL' />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FriendCounter;
