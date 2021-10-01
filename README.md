# Mymories (client)

Code for the client side of the MyMories social media project. 

This project was built for the purpose of full stack development practice and to gain experience with the MER(R)N stack. The following two tutorial videos by JavaScript Mastery were followed to form the basis of this project. Additional changes are included in the **Summary** section in **bold**.

- [Part 1](https://www.youtube.com/watch?v=ngc9gnGgUdA&ab_channel=JavaScriptMastery)
- [Part 2](https://www.youtube.com/watch?v=aibtHnbeuio&ab_channel=JavaScriptMastery)

## Summary

The client side of the MyMories project is built using React and Redux. Users may use the application to post images along with a title, caption, tags and a label representing the creator of the post. All posts by the user are then displayed in a two column grid. For mobile users the UI is rearranged into a column with the submission form at the top.

Posts may be edited, liked or deleted.

Additional changes I made to what was provided in the tutorials include: 

- **User login and signup with RSA encrpytion for secure authentication. Errors appear on relevant fields with explanatory text**
- **Users have profiles that include the users friends, and users may search for and follow other users**
- **Users may upload profile images and toggle visibility to prevent other users from finding them in searches**
- **Only the creator of a post may edit or delete it**
- **Images may now be viewed more clearly in a popup modal**
- **Background randomly changes for each session**

## Local Pre-requisites

- NodeJS and NPM
- RSA key pair

## Local Setup 

- First set the environment variables after cloning the repo (see .env.example)

1. run ```npm install``` to install all dependencies
2. run ```npm start``` to run the front end for the MyMories application.

## Future Changes

Below are a list of changes or additions that I would have liked to make but didn't get around to.

- Better defined sense of style for the general UI of the application
- Unit tests
- Limit the number of times a user may like a specific post
- Add features to user profiles such as history of posts or bio section
