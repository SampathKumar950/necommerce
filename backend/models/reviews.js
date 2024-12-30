import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true, // Each review must be associated with a user
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true, // Each review must be associated with a product
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5, // Ratings are typically between 1 and 5
  },
  comment: {
    type: String,
    required: false, // Comment is optional
    maxlength: 500, // Optional: Limit comment length to 500 characters
  },
  createdAt: {
    type: Date,
    default: Date.now, // The timestamp when the review was created
  },
});

const Review = mongoose.model('Review', reviewSchema);

export default Review;
