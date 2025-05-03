import express from "express";
import dotenv from "dotenv";
import path from "path"; //built-in Node module
import { connectDB } from './config/db.js';

import productRoutes from "./routes/product.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

app.use(express.json()); //middleware that allows us to accept JSON data in the req.body
//Middleware => a function that runs before you send a response back to the client

app.use("/api/products", productRoutes); //each of the routes are now prefixed with /api/products
//^app.use allows you to use the each of the product routes

//Configuration
if(process.env.NODE_ENV === "production") { //means application is deployed
  app.use(express.static(path.join(__dirname, "/frontend/dist"))); //makes dist folder my static assets
  app.get("*", (req, res) => { //* -> anything
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html")); //render index.html...will return anything visited (the react application)
  })
}

app.listen(PORT, () => {
  connectDB();
  console.log("Server started at http://localhost:" + PORT);
});



