import React from "react";
import { useSelector } from "react-redux";

import { Grid, CircularProgress } from "@material-ui/core";
import Post from "./Post/Post";

import "./Posts.css";

const Posts = ({ setCurrentId }) => {
  const posts = useSelector((state) => state.posts);

  return !posts.length ? (
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
