import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';

const OrdersPage = ({ userId }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`/api/orders/${userId}`);
        const data = await response.json();
        if (data.success) {
          setOrders(data.orders);
        } else {
          throw new Error(data.message);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userId]);

 const [review, setReview] = useState({
  rating: 0,
  comment: '',
  productId: '', // Initially empty, dynamically set when user selects a product
});

// Function to handle "Rate & Review" button click
const handleReviewClick = (productId) => {
  setReview((prev) => ({
    ...prev,
    productId, // Dynamically set productId when user clicks the button
  }));
  setShowReviewModal(true); // Show review modal
};

// Submitting the review
const submitReview = async () => {
  if (!review.productId) {
    alert('Product ID is missing! Please try again.');
    return;
  }

  try {
    const response = await fetch('/api/review', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        product: review.productId, // Map the review to the product dynamically
        rating: review.rating,
        comment: review.comment,
      }),
    });

    const data = await response.json();
    if (data.message === 'review Created') {
      alert('Review submitted successfully!');
      setReview({ rating: 0, comment: '', productId: '' }); // Reset the form
      setShowReviewModal(false); // Close modal
    } else {
      alert(data.message || 'Failed to submit review');
    }
  } catch (error) {
    console.error('Error submitting review:', error);
  }
};
const cancelReview = () => {
    setReview({ rating: 0, comment: '', productId: '' });
    setShowReviewModal(false);
  };
  if (loading) return <div className="text-center mt-10">Loading orders...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Orders</h1>
      {orders.length === 0 ? (
        <p className="text-center">No orders found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className={`card bg-base-100 shadow-xl ${
                order.orderStatus === 'delivered'
                  ? 'border-2 border-green-500'
                  : order.orderStatus === 'cancelled'
                  ? 'border-2 border-red-500'
                  : ''
              }`}
            >
              <div className="card-body">
                <h2 className="card-title">{product.title}</h2>
                <p>
                  <strong>Status:</strong>{' '}
                  <span
                    className={`badge ${
                      order.orderStatus === 'delivered'
                        ? 'badge-success'
                        : order.orderStatus === 'cancelled'
                        ? 'badge-error'
                        : 'badge-warning'
                    }`}
                  >
                    {order.orderStatus}
                  </span>
                </p>
                <p>
                  <strong>Total Amount:</strong> ₹{order.totalAmount}
                </p>
                <div>
                  <strong>Products:</strong>
                  <ul className="list-disc pl-5">
                    {order.products.map((item) => (
                      <li key={item.product._id} className="mb-4">
                        <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full md:w-1/4 h-40 object-cover"
                  />
                        <p>
                          <strong>{item.product.name}</strong> - {item.quantity} x ₹{item.price}
                        </p>
                        {order.orderStatus === 'delivered' && (
                          <div className="mt-2">
                            <button

                              className="btn btn-sm btn-primary"
                              onClick={() => handleReviewClick(item.product._id)}
                            >

                              Rate & Review
                            </button>
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
                <p>
                  <strong>Shipping Address:</strong> {`${order.shippingAddress.street}, ${order.shippingAddress.city}, ${order.shippingAddress.state}, ${order.shippingAddress.zip}`}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Review Modal */}
      {review.productId && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Submit Review</h3>
            <div className="mt-4">
              <label className="block text-sm font-medium">Rating:</label>
              <div className="flex items-center">
                {[...Array(5)].map((_, index) => (
                <FaStar
                key={index}
                className={`cursor-pointer ${
                  review.rating > index ? 'text-yellow-500' : 'text-gray-300'
                }`}
                onClick={() => setReview({ ...review, rating: index + 1 })}
                aria-label={`Rate ${index + 1} star`}
              />
              
                ))}
              </div>
              <label className="block text-sm font-medium mt-4">Comment:</label>
              <textarea
                className="textarea textarea-bordered w-full"
                rows="3"
                maxLength="500"
                value={review.comment}
                onChange={(e) => setReview({ ...review, comment: e.target.value })}
              />
            </div>
            <div className="modal-action">
              <button
                className="btn btn-sm btn-success"
                onClick={() => submitReview(review.productId)}
              >
                Submit
              </button>
              <button
                className="btn btn-sm btn-error"
                onClick={cancelReview}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
