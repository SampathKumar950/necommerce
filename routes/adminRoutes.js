import express from "express";
import { isAdmin } from "../middlewares/adminMiddleware.js";
import { verifyToken } from "../middlewares/authMiddleware.js";
import Vendor from "../models/vendors.js";
import Review from "../models/reviews.js";
import User from "../models/users.js";
import Product from "../models/products.js";


const router = express.Router();

//Get all  vendor requests
router.get("/getRequest",verifyToken,isAdmin,async(req,res)=>{
    try{
        const vendors = await Vendor.find({role:"user"});
        res.status(200).json({vendorList:vendors});
    }catch(error){
        res.status(500).json({message:"error at get all request by admin", error});
    }
});
//Accept vendor requests
router.post("/acceptRequest",verifyToken,isAdmin,async(req,res)=>{
    const {vendorId} = req.body;
    try{
        const vendor = await Vendor.findById(vendorId);
        vendor.role = "vendor";
        await vendor.save();
        res.status(200).json({message:"vendor request accepted"});
    }catch(error){
        res.status(500).json({message:"error at accepting vendor request by admin", error});
    }
})
//Delete User Review
router.delete("/deleteReview",verifyToken,isAdmin,async(req,res)=>{
    const {reviewId} = req.body;
    try{
        const review = await Review.findByIdAndDelete(reviewId);
        const user = await User.findById(review.user);
        await user.reviews.pull(reviewId);
        await user.save();
        const product = await Product.findById(review.product);
        await product.reviews.pull(reviewId);
        await product.save();
        res.status(200).json({message:"review deleted successfully by admin",review});
    }catch(error){
        res.status(500).json({message:"error at deleting review by admin", error})
    }
});
//----------------------------------------------------------------------------------------------
//Sample for get Reviews(Testing purpose):
router.get("/reviews",async(req,res)=>{
    try{
        const reviews = await Review.find();
        res.status(200).json({reviews});
    }catch(error){
        res.status(500).json({error});
    }
});
export default router;
