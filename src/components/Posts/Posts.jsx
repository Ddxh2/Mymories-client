import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getPostsForMe } from "../../actions/posts";

import { Grid, CircularProgress } from "@material-ui/core";
import Post from "./Post/Post";

import "./Posts.css";

const Posts = ({ setCurrentId }) => {
  const [isSearching, setIsSearching] = useState(false);
  const id = useSelector((state) => state.loggedInUser.id);
  const posts = useSelector((state) => state.posts);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!!id) {
      setIsSearching(true);
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (!!isSearching) {
      dispatch(getPostsForMe(id)).then(() => setIsSearching(false));
    }
  }, [isSearching]);

  return isSearching ? (
    <CircularProgress size={150} />
  ) : (
    <Grid
      className='posts__mainContainer'
      container
      alignItems='stretch'
      spacing={3}
    >
      {posts.map((post) => (
        <Grid key={post._id} item xs={12} sm={6}>
          <Post setCurrentId={setCurrentId} post={post} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
