"use strict";
// const { v4: uuidv4 } = require("uuid");
const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
// get all companies from database
const getUsers = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("dating");
    const result = await db.collection("users").find().toArray();
    if (result.length) {
      res.status(200).json({
        status: 200,
        data: result,
        message: `get users succeeded`,
      });
    } else {
      res.status(404).json({ status: 404, message: "users not found" });
    }
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
  client.close();
};

const searchUsers = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const keywords = new RegExp(req.query.keywords, "i");
  try {
    await client.connect();
    const db = client.db("dating");
    const result = await db
      .collection("users")
      .find({
        $or: [
          { name: { first: { $regex: keywords } } },
          { name: { last: { $regex: keywords } } },
          { "location.country": { $regex: keywords } },
          { "location.state": { $regex: keywords } },
          { "location.city": { $regex: keywords } },
          { gender: { $regex: keywords } },
          { email: { $regex: keywords } },
          { "login.username": { $regex: keywords } },
          { "id.name": { $regex: keywords } },
          { nat: { $regex: keywords } },
        ],
      })
      .toArray();
    if (result.length) {
      res
        .status(200)
        .json({ status: 200, data: result, message: "search succeeded" });
    } else {
      res.status(404).json({
        status: 404,
        data: [req.query.keywords],
        message: `No matched items for ${req.query.keywords}`,
      });
    }
  } catch (err) {
    res.status(500).json({
      status: 500,
      data: [req.query.keywords],
      message: err.message,
    });
  }
  client.close();
};

const searchUsersGenderAge = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const gender = req.query.gender;
  const age = Number(req.query.age);
  try {
    await client.connect();
    const db = client.db("dating");
    const result = await db
      .collection("users")
      .find({
        $and: [{ gender: gender }, { "dob.age": { $gte: age, $lt: age + 10 } }],
      })
      .toArray();
    if (result.length) {
      res
        .status(200)
        .json({ status: 200, data: result, message: "search succeeded" });
    } else {
      res.status(404).json({
        status: 404,
        data: [req.query.keywords],
        message: `No matched items for ${req.query.keywords}`,
      });
    }
  } catch (err) {
    res.status(500).json({
      status: 500,
      data: [req.query.keywords],
      message: err.message,
    });
  }
  client.close();
};

const getRandomUsers = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("dating");
    const result = await db
      .collection("users")
      .aggregate([{ $sample: { size: 100 } }])
      .toArray();
    if (result.length) {
      res.status(200).json({
        status: 200,
        data: result,
        message: `get random users succeeded`,
      });
    } else {
      res.status(404).json({ status: 404, message: "users not found" });
    }
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
  client.close();
};
//expect body = {senderEmail,message,recieverEmail}
const leaveMessage = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  const obj = { ...req.body };
  try {
    await client.connect();
    const db = client.db("dating");
    const result = await db.collection("messageBoard").insertOne(obj);
    res.status(201).json({ status: 201, data: obj, message: "message added" });
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
  client.close();
};

const getMyMessage = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const email = req.query.email;
  const resData = [];
  try {
    await client.connect();
    const db = client.db("dating");
    const result = await db.collection("messageBoard").findOne({
      recieverEmail: email,
    });

    if (result) {
      resData.push({ meaasge: result.message });
      const result2 = await db.collection("users").findOne({
        email: result.senderEmail,
      });
      if (result2) {
        resData.push({ sender: result2 });
        res
          .status(200)
          .json({ status: 200, data: resData, message: "message retrieved" });
      } else {
        res.status(404).json({
          status: 404,
          data: [result.senderEmail],
          message: `No matched user in users`,
        });
      }
    } else {
      res.status(404).json({
        status: 404,
        data: [req.query.email],
        message: `No matched reciever email in messageBoard`,
      });
    }
  } catch (err) {
    res.status(500).json({
      status: 500,
      data: [req.query.email],
      message: err.message,
    });
  }
  client.close();
};
//expect body={name:{first,last},email,gender,location:{city,state,counrty},dob:{data,age},nat}
const addUser = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const obj = { ...req.body };
  try {
    await client.connect();
    const db = client.db("dating");
    const result = await db.collection("users").insertOne(obj);
    res.status(201).json({ status: 201, data: obj, message: "user added" });
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
  client.close();
};
module.exports = {
  getUsers,
  searchUsers,
  searchUsersGenderAge,
  getRandomUsers,
  leaveMessage,
  getMyMessage,
  addUser,
};
