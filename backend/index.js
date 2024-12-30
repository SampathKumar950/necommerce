import express from "express";
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRoutes from "./routes/userRoutes.js";
import vendorRoutes from "./routes/vendorRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import productRoutes from "./routes/productRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());

connectDB();
//User APIs
app.use("/api/users", userRoutes);
//Product APIs
app.use("/api/products",productRoutes);
//Order APIs

//Vendor APIs
app.use("/api/vendors", vendorRoutes);
//Admin APIs
app.use("/api/admins", adminRoutes);
//Discount & Promo APIs(optional because still discount schema is not declared)



app.listen(3000,()=>{
    console.log("listening...");
})