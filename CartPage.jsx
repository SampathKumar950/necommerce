import React, { useState } from "react";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      title: "Product 1",
      image:
        "https://rukminim2.flixcart.com/image/312/312/xif0q/computer/w/u/e/-original-imah46f8th3pnphq.jpeg?q=70",
      price: 100,
      originalPrice: 150,
    },
    {
      id: 2,
      title: "Product 2",
      image:
        "https://rukminim2.flixcart.com/image/312/312/xif0q/computer/w/u/e/-original-imah46f8th3pnphq.jpeg?q=70",
      price: 200,
      originalPrice: 250,
    },
    {
      id: 3,
      title: "Product 3",
      price: 300,
      image:
        "https://rukminim2.flixcart.com/image/312/312/xif0q/computer/w/u/e/-original-imah46f8th3pnphq.jpeg?q=70",
      originalPrice: 400,
    },
  ]);
const [savedItems, setSavedItems] = useState([]);
    
  // Add item back to cart from saved items
  const addToCart = (item) => {
    setSavedItems((prev) => prev.filter((i) => i.id !== item.id));
    setCartItems((prev) => [...prev, item]);
    alert("Item added to cart");
  };
   const saveForLater = (item) => {
      setSavedItems((prev) => [...prev, item]);
      setCartItems((prev) => prev.filter((cartItem) => cartItem.id !== item.id));
    };
  
    const removeFromCart = (id) => {
      setCartItems((prev) => prev.filter((item) => item.id !== id));
    };
  
    const calculateSummary = () => {
      const originalCost = cartItems.reduce((acc, item) => acc + item.originalPrice, 0);
      const discountedCost = cartItems.reduce((acc, item) => acc + item.price, 0);
      const totalSavings = originalCost - discountedCost;
      const currentcost = originalCost - discountedCost;
  
      return {
        originalCost,
        discountedCost,
        totalSavings,
        currentcost,
      };
    };
  
    const { originalCost, discountedCost, totalSavings, currentcost } = calculateSummary();
  
    return (
      <div className="container mx-auto p-4 grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Section: Cart Items */}
        <div className="lg:col-span-3 space-y-8">
          <div>
            {/* <h2 className="text-2xl font-bold mb-4">Your Cart</h2> */}
            {cartItems.length === 0 ? (
              <div className="alert alert-warning">Your cart is empty.</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="card bg-base-100 shadow-lg border p-4 rounded-md"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="rounded mb-3 object-cover h-40 w-full"
                    />
                    <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-500 line-through mb-1">
                      {item.originalPrice}
                    </p>
                    <p className="text-lg font-semibold mb-4">{item.price}</p>
                    <div className="mt-4 flex justify-between space-x-4">
                      <button
                        className="btn btn-active btn-primary"
                        onClick={() => saveForLater(item)}
                      >
                        Save for Later
                      </button>
                      <button
                        className="btn btn-active btn-primary"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
  
          {savedItems.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Saved for Later</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {savedItems.map((item) => (
                  <div
                    key={item.id}
                    className="card bg-base-100 shadow-lg border p-4 rounded-md"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="rounded mb-3 object-cover h-40 w-full"
                    />
                    <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-500 line-through mb-1">
                      {item.originalPrice}
                    </p>
                    <p className="text-lg font-semibold mb-4">{item.price}</p>
                    <button
                      className="btn btn-active btn-primary"
                      onClick={() => addToCart(item)}
                    >
                      Add to Cart
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
  
      {/* Cart Summary Section */}
      <div className="sticky top-4 p-6 bg-base-200 shadow-lg rounded-lg h-fit border border-gray-300">
        <h2 className="text-xl font-bold mb-4">Price Details</h2>
        <div className="space-y-4 border-t pt-4">
          <div className="flex justify-between">
            <span className="text-gray-600">Price ({cartItems.length} items):</span>
            <span className="font-semibold">{originalCost}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Discount:</span>
            <span className="text-green-600">{currentcost}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Delivery Charges:</span>
            <span className="text-green-600">Free</span>
          </div>
          <div className="flex justify-between font-bold text-lg border-t pt-4">
            <span>Total Amount:</span>
            <span>{discountedCost}</span>
          </div>
        </div>
        <div className="mt-6">
          <button className="btn btn-primary w-full">Place Order</button>
        </div>
      </div>
      </div>
    );
  };
  

export default CartPage;
// this code will  only work  when the db is connected
/* import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [savedItems, setSavedItems] = useState([]);

  // Fetch cart items
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get('/api/cart');
        setCartItems(response.data);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };
    fetchCart();
  }, []);

  // Remove item from cart
  const removeFromCart = async (itemId) => {
    try {
      await axios.delete(`/api/cart/${itemId}`);
      setCartItems((prev) => prev.filter((item) => item.id !== itemId));
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  // Save item for later
  const saveForLater = async (item) => {
    try {
      await axios.patch(`/api/cart/${item.id}`, { action: 'saveForLater' });
      setCartItems((prev) => prev.filter((i) => i.id !== item.id));
      setSavedItems((prev) => [...prev, item]);
    } catch (error) {
      console.error('Error saving item for later:', error);
    }
  };

  // Proceed to buy
  const proceedToBuy = async () => {
    try {
      await axios.post('/api/checkout', { items: cartItems });
      alert('Proceeding to checkout...');
    } catch (error) {
      console.error('Error during checkout:', error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      <div className="mb-6">
        {cartItems.length === 0 ? (
          <div className="alert alert-warning shadow-lg">
            <div>
              <span>Your cart is empty. Start shopping now!</span>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="card bg-base-100 shadow-xl border"
              >
                <figure className="p-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="rounded-lg"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{item.title}</h2>
                  <p className="text-lg font-semibold text-primary">
                    ${item.price}
                  </p>
                  <div className="card-actions justify-between">
                    <button
                      className="btn btn-outline btn-secondary"
                      onClick={() => saveForLater(item)}
                    >
                      Save for Later
                    </button>
                    <button
                      className="btn btn-outline btn-error"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      savedItems.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-4">Saved for Later</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedItems.map((item) => (
              <div
                key={item.id}
                className="card bg-base-100 shadow-xl border"
              >
                <figure className="p-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="rounded-lg"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{item.title}</h2>
                  <p className="text-lg font-semibold text-primary">
                    ${item.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-end">
        <button
          onClick={proceedToBuy}
          className="btn btn-primary btn-lg"
        >
          Proceed to Buy
        </button>
      </div>
    </div>
  );
};

export default CartPage;
 */
