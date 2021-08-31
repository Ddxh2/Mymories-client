import React, { useState } from "react";
import moment from "moment";
import { useDispatch } from "react-redux";

import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@material-ui/core";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import AspectRatioIcon from "@material-ui/icons/AspectRatio";
import Modal from "../../Modal/Modal";

import { deletePost, likePost } from "../../../actions/posts";

import "./Post.css";

const Post = ({ post, setCurrentId }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [imageHovered, setImageHovered] = useState(false);

  const dispatch = useDispatch();

  const onMouseEnter = () => {
    setImageHovered(true);
  };

  const onMouseLeave = () => {
    setImageHovered(false);
  };

  const toggleModal = () =>
    setTimeout(() => {
      setModalOpen((prev) => !prev);
    }, 200);

  return (
    <>
      <Modal isOpen={modalOpen} onRequestClose={toggleModal} title={post.title}>
        <img
          className='post__modal__image'
          src={post.selectedFile}
          alt={post.title}
        />
      </Modal>
      <Card className='post__card'>
        <CardMedia
          className='post__media'
          image={post.selectedFile}
          title={post.title}
          onClick={toggleModal}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        />
        <div className='post__overlay'>
          <Typography variant='h6'>{post.creator}</Typography>
          <Typography variant='body2'>
            {moment(post.createdAt).fromNow()}
          </Typography>
        </div>
        <div className='post__overlay2'>
          <Button
            style={{ color: "white" }}
            size='small'
            onClick={() => setCurrentId(post._id)}
          >
            <MoreHorizIcon fontSize='medium' />
          </Button>
        </div>
        <div className={`post__overlay3 ${imageHovered ? "shown" : "hidden"}`}>
          <Button
            style={{ color: "white" }}
            size='small'
            onClick={toggleModal}
            onMouseEnter={onMouseEnter}
          >
            <AspectRatioIcon fontSize='medium' />
          </Button>
        </div>
        <div className='post__details'>
          <Typography variant='body2' color='textSecondary'>
            {post.tags.map((tag) => `#${tag} `)}
          </Typography>
        </div>
        <Typography className='post__title' variant='h5' gutterBottom>
          {post.title}
        </Typography>
        <CardContent>
          <Typography
            style={{ overflowWrap: "anywhere" }}
            variant='body2'
            color='textSecondary'
            component='p'
          >
            {post.message.length <= 210
              ? post.message
              : post.message.slice(0, 207) + "..."}
          </Typography>
        </CardContent>
        <CardActions className='post__cardActions'>
          <Button
            size='small'
            color='primary'
            onClick={() => dispatch(likePost(post._id))}
          >
            <ThumbUpAltIcon fontSize='small' />
            <span className='post__cardActions__buttonLabel'>
              &nbsp; Like &nbsp;
              {post.likeCount}
            </span>
          </Button>
          <Button
            size='small'
            color='primary'
            onClick={() => dispatch(deletePost(post._id))}
          >
            <DeleteIcon fontSize='small' />
            <span className='post__cardActions__buttonLabel'>&nbsp;Delete</span>
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default Post;
