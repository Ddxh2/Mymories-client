import React from "react";

import { AppBar, Typography } from "@material-ui/core";
import memories from "../../images/memories.png";

import "./Header.css";

const Header = () => {
  return (
    <AppBar className='header__appBar' position='static' color='inherit'>
      <Typography className='header__heading' variant='h2' align='center'>
        MyMories
      </Typography>
      <img className='header__image' src={memories} alt='memories' />
    </AppBar>
  );
};

export default Header;
