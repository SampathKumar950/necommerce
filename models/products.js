import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  description: String,
  category: { type: String, required: true },
  brand: String,
  price: { type: Number, required: true },
  discount: { type: Number, default: 0 }, // Discount %
  stockQuantity: { type: Number, required: true },
  images: [{ type: String }], //  image URLs
  vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },//added new line
  reviews: [
     { type: mongoose.Schema.Types.ObjectId, ref: 'Review' }
  ],
  orderCount: {type: Number, default: 0},
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Product = mongoose.model('Product', productSchema);
export default Product;
