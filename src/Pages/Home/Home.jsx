import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { getPosts } from "../../actions/posts";

import { Form, Posts } from "../../components";
import { Container, AppBar, Typography, Grow, Grid } from "@material-ui/core";
import memories from "../../images/memories.png";

import "./Home.css";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);
  const [currentId, setCurrentId] = useState(null);
  return (
    <Container className='home' maxWidth='lg'>
      <AppBar className='home__appBar' position='static' color='inherit'>
        <Typography className='home__heading' variant='h2' align='center'>
          Memories
        </Typography>
        <img className='home__image' src={memories} alt='memories' />
      </AppBar>
      <Grow in>
        <Container>
          <Grid
            className='home__mainContainer'
            container
            justifyContent='space-between'
            alignItems='stretch'
            spacing={3}
          >
            <Grid item xs={12} sm={7}>
              <Posts setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
};

export default Home;
