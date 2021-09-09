import React, { useState, useEffect } from "react";

import { fetchMyPosts } from "../../api";

import "./PostStatistics.css";

const PostStatistics = ({ userId }) => {
  const [posts, setPosts] = useState(null);
  const [postStatistics, setPostStatistics] = useState({
    numPosts: 0,
    totalLikes: 0,
  });

  useEffect(() => {
    fetchMyPosts(userId)
      .then(({ data }) => setPosts(data))
      .catch((error) => console.log(error));
  }, [userId]);

  useEffect(() => {
    if (!!posts) {
      const [numPosts, totalLikes] = posts.reduce(
        (acc, curr) => {
          acc[0] += 1;
          acc[1] += curr.likeCount;
          return acc;
        },
        [0, 0]
      );
      setPostStatistics({ numPosts, totalLikes });
    }
  }, [posts]);

  return (
    !!posts && (
      <div className='postStatistics'>
        <div className='postStatistics__text'>
          # Posts: {postStatistics.numPosts}
        </div>
        <div className='postStatistics__text'>
          # Likes: {postStatistics.totalLikes}
        </div>
      </div>
    )
  );
};

export default PostStatistics;
