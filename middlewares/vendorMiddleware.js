import User from "../models/users.js";
import Vendor from "../models/vendors.js";


export const isVendor = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);

    if (!user || user.role !== 'vendor') {
      return res.status(403).json({ message: 'Not authorized as a vendor' });
    }
    req.vendorId = await Vendor.findOne({user:req.userId});
    next();
  } catch (error) {
    res.status(500).json({ message: 'error at checking vendor middleware',error });
  }
};
