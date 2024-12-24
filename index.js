import express from "express";
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());

connectDB();
//User APIs
app.use("/api/users", userRoutes);
//Product APIs

//Order APIs

//Vendor APIs

//Admin APIs

//Discount & Promo APIs(optional because still discount schema is not declared)

app.listen(3000,()=>{
    console.log("listening...");
})