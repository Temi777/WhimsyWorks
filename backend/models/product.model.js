import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  price:{
    type: Number,
    required: true
  },
  image:{
    type: String,
    required: true
  },
}, {
  timestamps: true  //ensures it has the created at and updated at field
});

const Product = mongoose.model('Product', productSchema); // ** Put the singular capital version of products => 'Product' THEN mongoose will look at this and create a collection of 'products'

export default Product;

