import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { getUserProfile } from "../../api";

import "./Avatar.css";

const AVATAR_SIZES = {
  SMALL: "avatar__small",
  MEDIUM: "avatar__medium",
  LARGE: "avatar__large",
};

const LinkWrapper = ({ link, linkTo, children }) => {
  return !!link ? <Link to={linkTo}>{children}</Link> : children;
};

const BorderWrapper = ({ showBorder, children }) =>
  !!showBorder ? <div className='avatar__border'>{children}</div> : children;

const Avatar = ({
  size,
  user,
  id,
  link = true,
  showBorder = false,
  className = "",
}) => {
  const [userState, setUserState] = useState(user);

  useEffect(() => {
    setUserState(user);
  }, [user]);

  useEffect(() => {
    if (!user && !!id) {
      getUserProfile(id)
        .then(({ data }) => setUserState(data))
        .catch((error) => console.log(error));
    }
  }, [user, id]);

  return !!userState ? (
    <LinkWrapper link={link} linkTo={`/user/${userState.username}`}>
      <BorderWrapper showBorder={showBorder}>
        <div className={`avatar__container ${AVATAR_SIZES[size]} ${className}`}>
          <img
            className={`avatar__image ${AVATAR_SIZES[size]}`}
            src={userState.profileImage || "./defaultAvatar.png"}
            alt={`avatar ${userState.username}`}
          ></img>
        </div>
      </BorderWrapper>
    </LinkWrapper>
  ) : null;
};

export default Avatar;
