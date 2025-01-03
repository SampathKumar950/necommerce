import React,{useEffect,useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import axios from 'axios';


const products = [
    {
      id: 1,
      title: 'Smartphone',
      description: 'High performance smartphone with 128GB storage.',
      price: 499,
      image:"https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/5/8/w/-original-imahfpwvcfvxvqfh.jpeg?q=70",
    },
    {
      id: 2,
      title: 'Wireless Earbuds',
      description: 'Noise-cancelling wireless earbuds.',
      price: 199,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlxsrYvToFndU9z7gGfgtIEPI2KARp8xnrzA&s',
  
    },
    {
      id: 3,
      title: 'Smartwatch',
      description: 'Track your fitness and stay connected on the go.',
      price: 299,
      image:"https://rukminim2.flixcart.com/image/200/200/kz1lle80/smartwatch/m/f/q/-original-imagb54tb6fpurze.jpeg?q=70",
    },
    {
      id: 4,
      title: 'Laptop',
      description: 'Lightweight laptop with long battery life.',
      price: 999,
      image:"https://rukminim2.flixcart.com/image/312/312/xif0q/computer/w/u/e/-original-imah46f8th3pnphq.jpeg?q=70",
    },
      {
      id: 5,
      title: 'Laptop',
      description: 'Lightweight laptop with long battery life.',
      price: 999,
      image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2l_6jJHw_NFUDeclnL3lnilDwYRjrH5KtSQ&s"
    },
    {
      id: 6,
      title: 'Laptop',
      description: 'Lightweight laptop with long battery life.',
      price: 999,
      image: 'https://m.media-amazon.com/images/I/41tS3gyOW1L._SR290,290_.jpg',
    },
    {
      id: 7,
      title: 'Washing machine',
      description: 'Lightweight laptop with long battery life.',
      price: 999,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrvaDuetlZAHL7pEPjmSdEI6HX7DLww1HpSw&s',
    },
  ];
const MoreProducts = () => {
  const [wishlist, setWishlist] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
 // Function to check if the user is authenticated
    const checkUserAuth = async () => {
      try {
        const response = await axios.get('/api/verify');
        setIsLoggedIn(response.data.isLoggedIn);
        return response.data.isLoggedIn;
      } catch (error) {
        console.error('Error verifying user:', error);
        setIsLoggedIn(false);
        return false;
      }
    };

  // Function to handle "Add to Cart" action using routes
  const handleAddToCart = async (product) => {
    try {
      // Send a POST request to add the product to the cart
      const response = await axios.post('/cart', { productId: product.id });
      if (response.status === 200) {
        alert(`${product.title} has been added to your cart!`);
      } else {
        alert('Failed to add product to cart. Please try again.');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('An error occurred. Please try again later.');
    }
  };
  // Function to handle wishlist action
  const handleWishlist = async (product) => {
    const isUserAuthenticated = await checkUserAuth();
    if (!isUserAuthenticated) {
      navigate('/login');
    } else {
      try {
        await axios.post('/api/wishlist', { productId: product.id });
        setWishlist((prev) => [...prev, product.id]);
        alert(`${product.title} added to your wishlist!`);
      } catch (error) {
        console.error('Error adding to wishlist:', error);
        alert('Failed to add to wishlist. Please try again.');
      }
    }
  };
  //Function to navigate into cart page
  const handlecart= () => {
    navigate("/cart");
  };
  const handleorder= () => {
    navigate("/order");
  };


  return (
    <>
     <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
        <h1 className="text-xl font-bold">Product Store</h1>
        <div className="relative">
            <button
                onClick={handleorder}
                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition" 
              >
               Orders
              </button> 
          <FaShoppingCart size={50} onClick={handlecart}/>
          {/*  <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-2">
            {cart.length}
          </span>  */}
        </div>
      </header>
          <div className="container mx-auto p-6">

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform hover:scale-105"
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-half h-45 object-cover"
              style={{ borderRadius: '10px' }}          
                />

            <div className="p-4 text-center">
              <h2 className="text-lg font-semibold mb-2">{product.title}</h2>
              <p className="text-gray-600">{product.price}</p>
              <p className="text-sm text-gray-500 mt-2">{product.description}</p>
                {/* Wishlist Icon */}
            <button
              onClick={() => handleWishlist(product)}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
            >
              {wishlist.includes(product.id) ? '❤️' : '🤍'}
            </button>
               <button
                onClick={() => handleAddToCart(product)}
                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition" 
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    
      </div>
  
   </> 
    
  );
};
  export default MoreProducts;
