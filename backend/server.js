import express from "express";
import dotenv from "dotenv";
import { connectDB } from './config/db.js';

import productRoutes from "./routes/product.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); //middleware that allows us to accept JSON data in the req.body
//Middleware => a function that runs before you send a response back to the client

app.use("/api/products", productRoutes); //each of the routes are now prefixed with /api/products
//^app.use allows you to use the each of the product routes

app.listen(PORT, () => {
  connectDB();
  console.log("Server started at http://localhost:" + PORT);
});



