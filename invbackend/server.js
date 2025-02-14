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

  console.log("Requested supplier:", supplier);

  // Supplier-to-brand mapping
  const supplierBrands = {
    Imperial: [
      'DuMaurier Smooth',
      'DuMaurier signature',
      'DuMaurier Mellow',
      'DuMaurier distinct plus',
      'DuMaurier distinct',
      'DuMaurier special',
      'Viceroy full',
      'Players',
      'Players smooth',
      'Players original',
      'John Players smooth',
      'John Players mellow',
      'John Players rich ',
      'John Players bold',
      'Pall Mall smooth',
      'Pall Mall smooth extra',
      'Pall Mall Bold',
      'Pall Mall Bold Extra',
      'Pall Mall Full',
      'Malboro',
      'Malboro Original',
      'Malboro Full',
      'Malboro Select',
      'Vogue',
      'Matniee mellow',
      'Matinee Subtle',
    ],
    RBH: [
      'Belmont',
      'Belmont select',
      'Next smooth',
      'Next select',
      'Next original',
      'Next xtra',
      'Philip Morris special',
      'Philip Morris Original',
      'Number 7 special',
      'Number 7 original',
      'Rothmans',
      'Rothmans special',
      'Canadian Classics original',
      'Canadian Classics smooth',
      'Canadian Classics select',
      'Canadian Classics rich',
    ],
    Coremark: [
      'Export A smooth',
      'Export A rich',
      'Export A medium',
      'Export A fine',
      'Export A full',
      'Export A extra',
      'MacDonald original',
      'MacDonald rich',
      'LD medium',
      'LD smooth',
      'LD bold',
      'LD standard bold',
    ]
  };

  if (!supplier || !supplierBrands[supplier]) {
    return res.status(400).json({ error: "Invalid supplier" });
  }

  try {
    await client.connect();
    console.log("DB Connected for Low Stock");

    const database = client.db("inventory");
    const collection = database.collection("cigarettes");

    // Query only items belonging to the supplier and having qty < 2
    const lowStockItems = await collection
      .find({ name: { $in: supplierBrands[supplier] }, qty: { $lt: 2 } })
      .toArray();

    console.log("Low Stock Items for Supplier:", lowStockItems);
    res.status(200).json(lowStockItems);
  } catch (error) {
    console.error("Error fetching low stock data:", error.message);
    res.status(500).send("Error fetching low stock data: " + error.message);
  } finally {
    await client.close();
  }
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
