"use strict";

const express = require("express");
const morgan = require("morgan");

const PORT = 8000;
const {
  getUsers,
  searchUsers,
  searchUsersGenderAge,
  getRandomUsers,
  leaveMessage,
  getMyMessage,
  addUser,
  addFriend,
  addUserOline,
  deleteUserOnline,
} = require("./handler");

express()
  .use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Methods",
      "OPTIONS, HEAD, GET, PUT, POST, DELETE"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  .use(morgan("tiny"))
  .use(express.static("./server/assets"))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use("/", express.static(__dirname + "/"))

  // ======================== List of all enpoints ========================//

  // Gets list of all items in database
  .get("/api/get-users", getUsers)
  //search users
  .get("/api/search-users", searchUsers)
  //search users by gender and age
  .get("/api/search-gender-age", searchUsersGenderAge)
  //get some random users
  .get("/api/get-random-users", getRandomUsers)
  //post messages
  .post("/api/leave-message", leaveMessage)
  //get message by current user email
  .get("/api/get-myMessage", getMyMessage)
  //add new user
  .post("/api/add-user", addUser)
  //add friend to current user
  .patch("/api/add-friends", addFriend)
  //add user to online list
  .post("/api/add-user-online", addUserOline)
  //delete a user from online list
  .delete("/api/delete-user-online/:email", deleteUserOnline)

  // Handles all the endpoints
  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is obviously not what you are looking for.",
    });
  })

  .listen(PORT, () => console.info(`Listening on port ${PORT}`));
