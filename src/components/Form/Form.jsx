import React, { useState, useEffect } from "react";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";

import { TextField, Button, Typography, Paper } from "@material-ui/core";

import { createPost, updatePost } from "../../actions/posts";

import "./Form.css";

const Form = ({ currentId, setCurrentId }) => {
  const id = useSelector((state) => state.loggedIn.id);
  const [postData, setPostData] = useState({
    creator: "",
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
    authorId: id,
  });

  const dispatch = useDispatch();
  const currentPost = useSelector((state) =>
    currentId ? state.posts.find((post) => post._id === currentId) : null
  );

  const handleSubmit = (event) => {
    event.preventDefault();

    if (currentId) {
      dispatch(updatePost(currentId, postData));
    } else {
      dispatch(createPost(postData));
    }

    clear();
  };
  const clear = () => {
    if (setCurrentId) {
      setCurrentId(null);
    }
    setPostData({
      title: "",
      message: "",
      selectedFile: "",
      tags: "",
      creator: "",
      authorId: id,
    });
  };

  const handleChange = (event, propName) => {
    setPostData((prev) => ({ ...prev, [propName]: event.target.value }));
  };

  useEffect(() => {
    if (currentPost) {
      setPostData(currentPost);
    }
  }, [currentPost]);

  return (
    <Paper className='form__paper'>
      <form
        autoComplete='off'
        noValidate
        className='root form__form'
        onSubmit={handleSubmit}
      >
        <Typography variant='h6'>
          {currentId ? "Editing" : "Creating"} a Memory
        </Typography>
        <TextField
          name='creator'
          variant='outlined'
          label='Creator'
          fullWidth
          value={postData.creator}
          onChange={(e) => handleChange(e, "creator")}
        ></TextField>
        <TextField
          name='title'
          variant='outlined'
          label='Title'
          fullWidth
          value={postData.title}
          onChange={(e) => handleChange(e, "title")}
        ></TextField>
        <TextField
          name='message'
          variant='outlined'
          label='Message'
          fullWidth
          value={postData.message}
          onChange={(e) => handleChange(e, "message")}
        ></TextField>
        <TextField
          name='tags'
          variant='outlined'
          label='Tags'
          fullWidth
          value={postData.tags}
          onChange={(e) =>
            handleChange(
              {
                target: {
                  value: e.target.value.split(",").map((tag) => tag.trim()),
                },
              },
              "tags"
            )
          }
        ></TextField>
        <div className='form__fileInput'>
          <FileBase
            type='file'
            multiple={false}
            onDone={({ base64 }) =>
              handleChange({ target: { value: base64 } }, "selectedFile")
            }
          />
        </div>
        <Button
          className='form__buttonSubmit'
          variant='contained'
          color='primary'
          size='large'
          type='submit'
          fullWidth
        >
          Submit
        </Button>
        <Button
          className='form__buttonSubmit'
          variant='contained'
          color='secondary'
          size='small'
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
