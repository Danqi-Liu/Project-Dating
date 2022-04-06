const companies = require("./data/companies.json");
const items = require("./data/items.json");
const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const batchImport = async () => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("ecommerce");
  const result = await db.collection("companies").insertMany(companies);
  console.log(result);
  const result2 = await db.collection("items").insertMany(items);
  console.log(result2);
  client.close();
};

batchImport();
