import React from "react";
import { Link } from "react-router-dom";

import { AppBar, Typography } from "@material-ui/core";
import memories from "../../images/memories.png";

import "./Header.css";

const Header = () => {
  return (
    <AppBar className='header__appBar' position='static' color='inherit'>
      <Link className='header__link' to='/home'>
        <Typography className='header__heading' variant='h2' align='center'>
          MyMories
        </Typography>
        <img className='header__image' src={memories} alt='memories' />
      </Link>
    </AppBar>
  );
};

export default Header;
