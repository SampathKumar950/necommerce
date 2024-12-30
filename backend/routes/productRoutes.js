import express from "express";
import Product from "../models/products.js";
import { MongoClient, ObjectId } from 'mongodb';
const router = express.Router();

//Created : Get All Products , GetById
//---------------------------------------------------------------------------------------------------
//Get All Products
router.get('/getProducts',async(req,res)=>{
    try{
        const products = await Product.find();
        res.status(200).json({message:"products fetched successfully",products});
    }catch(error){
        res.status(500).json({message:"error at getting all products",error});
    }
});
//Get Product By Id
router.get('/getProductById/:id',async(req,res)=>{
    const {id} = req.params;
   
    try{
        const productId = await new ObjectId(id);
        const product = await Product.findById(productId);
        console.log(product);
        res.status(200).json({message:"product fetched successfully",product});
    }catch(error){
        res.status(500).json({message:"error at getting product by Id",error});
    }
});

export default router;