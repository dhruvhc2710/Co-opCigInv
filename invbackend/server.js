const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
const cors = require("cors");
require('dotenv').config();

const app = express();
const port = 3002;

// Middleware
app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// MongoDB connection
const uri = process.env.MONGO_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

app.post("/update-cigarette", async (req, res) => {
  const { name, size, type, qty } = req.body;

  console.log("Received request:", req.body);

  if (!name || !size || !type || qty === undefined) {
    return res.status(400).send("Missing required fields (name, size, type, qty)");
  }

  try {
    await client.connect();
    console.log("DB connected");
    const database = client.db("inventory");
    const collection = database.collection("cigarettes");

    // Find and update or insert the new data
    const result = await collection.updateOne(
      { name, size, type }, // Include type here to match the combination
      { $set: { qty } },
      { upsert: true }
    );

    res.status(200).send(result);
  } catch (error) {
    console.error("Error updating database:", error.message);
    res.status(500).send("Error updating database: " + error.message);
  } finally {
    await client.close();
  }
});

app.get("/get-cigarettes", async (req, res) => {
  try {
    await client.connect();
    console.log("DB connected get");
    const database = client.db("inventory");
    const collection = database.collection("cigarettes");

    const cigarettes = await collection.find({}).toArray();

    if (!cigarettes || cigarettes.length === 0) {
      return res.status(404).send("No cigarettes found.");
    }

    console.log(cigarettes);
    res.status(200).json(cigarettes);
  } catch (error) {
    console.error("Error fetching data:", error.message);
    res.status(500).send("Error fetching data: " + error.message);
  } finally {
    await client.close();
  }
});

app.get("/get-low-stock", async (req, res) => {
  const { supplier } = req.query; // Get supplier from request

  try {
    await client.connect();
    console.log("dbConnected");
    const database = client.db("inventory");
    const collection = database.collection("ciggarates");

    // Fetch cigarettes under the given supplier where qty < 2
    const cigarettes = await collection
      .find({ supplier: supplier, qty: { $lt: 2 } })
      .toArray();

    res.status(200).json(cigarettes);
  } catch (error) {
    res.status(500).send("Error fetching low stock data: " + error.message);
  } finally {
    await client.close();
  }
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
