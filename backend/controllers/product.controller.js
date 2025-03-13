import Product from "../models/product.model.js";
import mongoose from "mongoose";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({}); //passing in an empty object fetches all the projects we have in the database
    res.status(200).json({ success: true, data: products });
  } catch (error) {  // if an error occurs in try block, it will automatically jump to the catch block
    console.error("Error in Fetching products:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
}

export const createProduct = async (req, res) => {
  const product = req.body; //user will send this data

  if(!product.name || !product.price || !product.image) {
    return res.status(400).json({ success:false, message: "Please provide all fields" });
  }

  const newProduct = new Product(product);

  try {
    await newProduct.save(); //used to save a new document/record into a MongoDB collection
    res.status(201).json({ success: true, data: newProduct })
  } catch (error) {
    console.error("Error in Create product:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
}

export const updateProduct = async (req, res) => { //use app.put when updating all fields on the resource and app.patch when only updating some fields
  const { id } = req.params;

  const product = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({success: false, message: "invalid Product Id"});
  }

  try {  
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {new:true});
    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });

  }
}

export const deleteProduct = async (req, res) => {
  const {id} = req.params //{id} refers to the variable :id
  
  if (!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({success: false, message: "invalid Product Id"});
  }

  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Product Deleted" });
  } catch (error) {
    console.error("Error in Deleting product:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }

}