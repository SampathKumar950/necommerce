import Admin from "../models/admin.js";
import User from "../models/users.js";



export const isAdmin = async (req, res, next) => {
    try {
      const user = await User.findById(req.userId);
  
      if (!user || user.role !== 'admin') {
        return res.status(403).json({ message: 'Not authorized as a admin' });
      }
      req.adminId = await Admin.findOne({user:req.userId});
      next();
    } catch (error) {
      res.status(500).json({ message: 'error at checking admin middleware',error });
    }
  };