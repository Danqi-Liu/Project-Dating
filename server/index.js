"use strict";

const express = require("express");
const morgan = require("morgan");
const { createServer } = require("http");
const { Server } = require("socket.io");
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  /* options */
});
let socketUserArray = [];
const PORT = 8000;
const {
  getUsers,
  searchUsers,
  searchUsersGenderAgeLocation,
  getRandomUsers,
  leaveMessage,
  getMyMessage,
  addUser,
  addFriend,
  addUserOline,
  deleteUserOnline,
  updateUser,
  getOnlineUsers,
} = require("./handler");

// express()
app
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
  //search users by gender & age & location
  .get("/api/search-gender-age-location", searchUsersGenderAgeLocation)
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
  //add current user to online list
  .post("/api/add-user-online", addUserOline)
  //delete a user from online list
  .delete("/api/delete-user-online/:email", deleteUserOnline)
  //update a user
  .put("/api/update-user", updateUser)
  //get online users
  .get("/api/get-online-users", getOnlineUsers)

  // Handles all the endpoints
  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is obviously not what you are looking for.",
    });
  });

// .listen(PORT, () => console.info(`Listening on port ${PORT}`));
//socket, join obj={myEmail,id}
//message obj={recieverEmail,myEmail,myName,message}
io.on("connection", (socket) => {
  // .....
  console.log(socket.id);
  socket.on("join", (obj) => {
    console.log("join start", obj);
    if (socketUserArray.length === 0) {
      socketUserArray.push({ ...obj });
    } else if (socketUserArray.some((el) => el.myEmail === obj.myEmail)) {
      let arr = socketUserArray.map((el) => {
        return el.myEmail === obj.myEmail ? obj : el;
      });
      socketUserArray = [...arr];
    } else {
      socketUserArray.push({ ...obj });
    }
    console.log("join finished", socketUserArray);
  });
  socket.on("message", (obj) => {
    console.log(obj);
    console.log(socket.id);
    const reciever = socketUserArray.find(
      (el) => el.myEmail === obj.recieverEmail
    );
    io.to(reciever.id).emit("recievedMsg", {
      senderEmail: obj.myEmail,
      senderName: obj.myName,
      message: obj.message,
    });
  });
});
httpServer.listen(PORT, () => console.info(`Listening on port ${PORT}`));
