import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FileBase from "react-file-base64";

import { getUserProfile } from "../../api";
import { updateUser } from "../../actions/users";

import {
  FriendCounter,
  Avatar,
  AddFriend,
  PostStatistics,
} from "../../components";
import PublishIcon from "@material-ui/icons/Publish";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";

import "./Profile.css";

const Profile = (props) => {
  const { username } = props.match.params;
  const [user, setUser] = useState(null);
  const [userPrivate, setUserPrivate] = useState(null);
  const [friendshipIdToRemove, setFriendshipIdToRemove] = useState(null);
  const [friendshipToAdd, setFriendshipToAdd] = useState(null);

  const dispatch = useDispatch();

  const loggedInUsername = useSelector((state) => state.loggedInUser.username);

  const onProfileImageClick = () => {
    if (loggedInUsername === (user || {}).username) {
      const fileInput = document.querySelector(
        ".profile__avatar__upload > input"
      );
      fileInput.click();
    }
  };

  const handleAvatarUpload = (base64) => {
    const userData = { ...user, profileImage: base64 };
    dispatch(updateUser(userData));
    setUser((prevUser) => ({ ...prevUser, profileImage: base64 }));
  };

  const handlePrivacyToggle = (newPrivacy) => {
    if (loggedInUsername === (user || {}).username) {
      const userData = { ...user, isPrivate: newPrivacy };
      dispatch(updateUser(userData));
      setUser((prevUser) => ({ ...prevUser, isPrivate: newPrivacy }));
    }
  };

  useEffect(() => {
    getUserProfile(username)
      .then(({ data }) => {
        if (!!data.isPrivate && username !== loggedInUsername) {
          setUserPrivate(true);
        } else {
          setUser(data);
          setUserPrivate(false);
        }
      })
      .catch((error) => console.log(error));
  }, [username, loggedInUsername]);

  return !!user || userPrivate !== null ? (
    <div className='profile'>
      {userPrivate ? (
        <h1>This Account is Private</h1>
      ) : (
        <>
          <h1 className='profile__section'>{`${username}'s Page`}</h1>
          <div
            className={`profile__section ${
              loggedInUsername === (user || {}).username
                ? "profile__avatar__clickable"
                : ""
            }`}
            onClick={onProfileImageClick}
          >
            <div className='profile__avatar__uploadIcon'>
              <PublishIcon fontSize='large' />
            </div>
            <Avatar size='LARGE' user={user} link={false} />
            <div className='profile__avatar__upload'>
              <FileBase
                type='file'
                multiple={false}
                onDone={({ base64 }) => handleAvatarUpload(base64)}
              />
            </div>
          </div>
          <div
            className={`profile__section profile__privacy ${
              loggedInUsername === (user || {}).username
                ? "profile__privacy__clickable"
                : ""
            }`}
            onClick={() => handlePrivacyToggle(!user.isPrivate)}
          >
            {!!user && user.isPrivate ? (
              <>
                <VisibilityOffIcon /> &nbsp;Account is hidden
              </>
            ) : (
              <>
                <VisibilityIcon /> &nbsp;Account is visible
              </>
            )}
          </div>

          {loggedInUsername !== username && (
            <div className='profile__section'>
              <AddFriend
                userId={user.id}
                onAdd={(friendshipToAdd) => setFriendshipToAdd(friendshipToAdd)}
                onRemove={(id) => setFriendshipIdToRemove(id)}
              />
            </div>
          )}
          <div className='profile__section'>
            <FriendCounter
              userId={user.id}
              friendshipIdToRemove={friendshipIdToRemove}
              friendshipToAdd={friendshipToAdd}
              onRemoved={() => setFriendshipIdToRemove(null)}
              onAdded={() => setFriendshipToAdd(null)}
            />
          </div>
          <div className='profile__section fullWidth'>
            <PostStatistics userId={user.id} />
          </div>
        </>
      )}
    </div>
  ) : null;
};

export default Profile;
