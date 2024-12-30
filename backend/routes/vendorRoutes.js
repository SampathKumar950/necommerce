import express from "express";
import {isVendor} from "../middlewares/vendorMiddleware.js"
import { verifyToken } from "../middlewares/authMiddleware.js";
import Product from "../models/products.js";
import Vendor from "../models/vendors.js";
import User from "../models/users.js"

const router = express.Router();

//CREATED :- CREATE PRODUCT BY VENDOR, DELETE PRODUCT BY VENDOR , UPDATE PRODUCT BY VENDOR

//NEED TO CREATE ORDER STATUS UPDATE
//-------------------------------------------------------------------------------------------------
// Create a new product (Vendor only)
router.post("/createProduct", verifyToken , isVendor, async (req, res) => {
    const { name, description, price, category, brand, image, stockQuantity } = req.body;
   //validation should be added here, if any required;
    try {
      const newProduct = new Product({
        name,
        description,
        price,
        category,
        brand,
        image,
        stockQuantity,
        vendor: req.userId, // Link the product to the vendor (user)
      });
      
      await newProduct.save();
      console.log("hi");
      // pushing the new product id into vendor profile;
      const vendor = await Vendor.findById(req.vendorId);
      vendor.products.push(newProduct._id);
      await vendor.save();

      res.status(201).json({ message: 'Product created successfully', product: newProduct });
    } catch (error) {
    
      res.status(500).json({ message: 'error at creation of product by vendor', error });
    }
});

// Delete product (Vendor only)
router.delete("/deleteProduct", verifyToken, isVendor, async (req, res) => {
    const {productId} =  req.body;
    try {
      const product = await Product.findById(productId);
  
      if (!product) {
        return res.status(404).json({ message: 'Product not found'});
      }
  
      // Check wheather if the logged-in vendor is the owner of the product or not
      if (product.vendor.toString() !== req.userId) {
        return res.status(403).json({ message: 'Not authorized to delete this product' });
      }
  
      await Product.findByIdAndDelete(productId);
     
      // deleting  product id from vendor profile;
      const vendor = await Vendor.findById(req.vendorId)
      await vendor.products.pull(productId);
      await vendor.save();

      res.status(200).json({ message: 'Product deleted successfully',productId,product});
    } catch (error) {
      res.status(500).json({ message: 'error at deleting product by vendor' });
    }
});


//Update product Details(vendor only)

router.put("/updateProduct", verifyToken, isVendor, async(req,res) => {
    const { name, description, price, category, brand, image, stockQuantity,discount } = req.body;
    //validation should be added here, if any required;
    try {
      const product = await Product.findById(req.body.productId);
      
      if(!product){
        res.status(404).json({message:"Product not found to update"});
      }
     
      // Check if the logged-in vendor is the owner of the product or not
      if (product.vendor.toString() !== req.userId) {
        return res.status(403).json({ message: "Not authorized to update this product" });
      }

      product.name = name||product.name;
      product.description = description||product.description;
      product.discount = discount||product.discount;
      product.price = price||product.price;
      product.category = category||product.category;
      product.brand = brand||product.brand;
      product.images = image||product.images;
      product.stockQuantity = stockQuantity||product.stockQuantity;

      await product.save();

      res.status(201).json({ message: 'Product Updated successfully',product});
    } catch (error) {
    
      res.status(500).json({ message: 'error at updation of product by vendor', error });
    }
  
});

//WithDraw from Being Vendor -----------Need To be Tested
router.put('/withdraw',verifyToken,isVendor, async(req,res)=> {
    try{
      const vendor = await Vendor.findById(req.vendorId);
      if(vendor.role==='withdraw'){
        res.status(200).json({message: "your request already in process..."});
      }
      vendor.role = 'withdraw';
      await vendor.save();
      res.status(200).json({message: "your request to withdraw as vendor is Sent"});
    }catch(error){
      res.status(500).json({message:"error while requesting to withdraw as Vendor...",error});
    }
});







//---------------------------------------------------------------------------------------------------
// sample code for adding vendor, for testing purpose
router.post("/addVendor",async(req,res)=>{
  const {user,businessName} = req.body;
  const vendor = new Vendor({
    user,
    businessName
  });
  console.log("hi");
  await vendor.save();
  res.status(200).json({message: "worked"});
})

export default router;