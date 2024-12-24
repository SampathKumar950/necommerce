import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/users.js";
import { validateEmail,validatePhone,validatePassword } from "../validations/userValidations.js";
import { verifyToken } from "../middlewares/authMiddleware.js"; // JWT Authentication Middleware


const router = express.Router();

//-----------------------------------------------------------------------------------------------------------------
// USER ROUTES CREATED TILL ARE :- REGISTER,LOGIN,GET USER PROFILE,UPDATE USER PROFILE,ADD TO WISHLIST,GET WISHLIST
// NEED TO BE CREATED:- REMOVE PRODUCTS FROM WISHLIST,ADD TO CART ,REMOVE PRODUCT FROM CART(SIMILAR TO WISHLIST)


// User Registration
router.post("/register", async (req, res) => {
  const { username, email, password, phone, address } = req.body;

  const errors = {};

  // Validate email format
  if (!validateEmail(email)) {
   errors.email = "Invalid email format";
  }

  // Validate password strength
  const validation = validatePassword(password);
  if (validation!=="Success") {
    errors.password = validation;
  }

  // Validate phone number format
  if (!validatePhone(phone)) {
    errors.phone = "Invalid phone number" ;
  }

  if(Object.keys(errors).length>0){
    return res.status(400).json({errors}); // In react , const response = await axios.post(...,data); if(response.errors){update form errors state;}
  }
  try {
    // Check if user already exists
    const userExists = await User.findOne({ email });
    errors.existed = "User already exists" ;
    if (userExists) {
      return res.status(400).json({errors});
    }

    // Encrypt password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = new User({ username, email, password: hashedPassword, phone, address });
    await user.save();

    // Generate JWT token - this code is required only if , no login required upon registration
    const token = jwt.sign({ userId: user._id }, "jwt-secret-key", { expiresIn: "1d" });
    console.log("success");
    res.status(201).json({ token, userId: user._id, message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" + err});
  }
});


// User Login
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    
    const errors = {};

    try {
      // Check if user exists
      const user = await User.findOne({ email });
      if (!user) {
        errors.existed = "Invalid credentials";
        return res.status(400).json({errors });
      }
  
      // Check if password matches
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        errors.existed = "Invalid credentials";
        return res.status(400).json({errors });
      }
  
      // Generate JWT token
      const token = jwt.sign({ userId: user._id }, "jwt-secret-key", { expiresIn: "1d" });
  
      res.json({ token, userId: user._id, message: "Login successful" });
    } catch (error) {
      res.status(500).json({ message: "Server error" + error });
    }
  });


// Get User Profile

// either, we can userId in req or as params /profile:id
router.get("/profile", verifyToken , async (req, res) => {
    try {
        console.log(res.test);
      const user = await User.findById(req.userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      res.json({ username: user.username, email: user.email, phone: user.phone, address: user.address });
    }
    catch (error) {
      res.status(500).json({ message: "Server error" });
    }
});

// Update User Profile
router.put("/profile", verifyToken , async (req, res) => {
    const { username, email, phone, address } = req.body;
  
    try {
      const user = await User.findById(req.userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      user.username = username || user.username;
      user.email = email || user.email;
      user.phone = phone || user.phone;
      user.address = address || user.address;
    //   The expression user.username = username || user.username; is a JavaScript shorthand that is
    //   used to set the user.username property to either the value of username (if it's truthy) or
    //   its current value (user.username) if username is falsy (like undefined, null, 0, false, or an empty string).
      await user.save();
      res.json({ message: "Profile updated successfully", user });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

  // Add to Wishlist
router.post("/wishlist", verifyToken , async (req, res) => {
    const { productId } = req.body;
    
    try {
      const user = await User.findById(req.userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Add product to wishlist
      user.wishlist.push(productId);
      await user.save();
  
      res.json({ message: "Product added to wishlist", wishlist: user.wishlist });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });
  
  // Get Wishlist
  router.get("/wishlist", verifyToken , async (req, res) => {
    try {

    // The populate("wishlist") tells Mongoose to populate the wishlist field with the actual
    // Product documents, rather than just the IDs of the products stored in the wishlist.

      const user = await User.findById(req.userId).populate("wishlist");
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json({ wishlist: user.wishlist });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });


  //-----------------------------------------------------------------------------------------------------------------


export default router;
