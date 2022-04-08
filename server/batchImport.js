//fetched fake user data from free API "random user generator"
const users = require("./data/users.json");
const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const batchImport = async () => {
  const newUsers = users.map((user) => {
    return { ...user, friends: [] };
  });
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("dating");
  await db.collection("users").insertMany(newUsers);
  client.close();
};

batchImport();
