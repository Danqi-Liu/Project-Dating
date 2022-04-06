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
    const db = client.db("ecommerce");
    const result = await db.collection("companies").find().toArray();
    if (result.length) {
      res.status(200).json({
        status: 200,
        data: result,
        message: `get companies succeeded`,
      });
    } else {
      res.status(404).json({ status: 404, message: "companies not found" });
    }
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
  client.close();
};

module.exports = {
  getUsers,
};
