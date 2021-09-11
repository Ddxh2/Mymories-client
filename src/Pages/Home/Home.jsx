import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getPostsForMe } from "../../actions/posts";

import { Form, Posts } from "../../components";
import { Container, Grow, Grid } from "@material-ui/core";

import "./Home.css";

const Home = () => {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.loggedInUser.id);

  useEffect(() => {
    if (!!id) {
      dispatch(getPostsForMe(id));
    }
  }, [dispatch, id]);
  const [currentId, setCurrentId] = useState(null);
  return (
    <Container className='home' maxWidth='lg'>
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
