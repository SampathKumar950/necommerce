import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react'; // Import Swiper components
import 'swiper/css'; // Swiper styles
import 'swiper/css/navigation';
import { Navigation, Pagination, Autoplay } from "swiper/modules"; // Import modules

import ProductCard from './ProductCard'; // Import ProductCard component
const sampleProducts = [
  {
    id: 1,
    title: 'Smartphone',
    description: 'High performance smartphone with 128GB storage.',
    price: 499,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlxsrYvToFndU9z7gGfgtIEPI2KARp8xnrzA&s',
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
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlxsrYvToFndU9z7gGfgtIEPI2KARp8xnrzA&s',
  },
  {
    id: 4,
    title: 'Laptop',
    description: 'Lightweight laptop with long battery life.',
    price: 999,
    image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR07UdVo1AEDz5xoVyWFDeh2Y1gZovxldLRqA&s'    },
  {
    id: 5,
    title: 'Laptop',
    description: 'Lightweight laptop with long battery life.',
    price: 999,
    image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR07UdVo1AEDz5xoVyWFDeh2Y1gZovxldLRqA&s'    }
  ,
  {
    id: 6,
    title: 'Laptop',
    description: 'Lightweight laptop with long battery life.',
    price: 999,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlxsrYvToFndU9z7gGfgtIEPI2KARp8xnrzA&s',
  },
  {
    id: 7,
    title: 'Washing machine',
    description: 'Lightweight laptop with long battery life.',
    price: 999,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrvaDuetlZAHL7pEPjmSdEI6HX7DLww1HpSw&s',
  },
];

const Clothingcategory = () => {
  const navigate = useNavigate();

  const handleSeeMoreClick = () => {
    // Navigate to the page with more products
    navigate('/more-products');
  };
  return (
    <div className="relative container mx-auto p-4 bg-white-100 rounded-lg shadow-lg border-1 border-gray-100">
      {/* Title */}
      <h1 className="text-2xl font-bold text-gray-800 text-center mb-4">Best of Electronics</h1>

      {/* "See More" Button */}
      <button className="absolute top-4 right-4 text-blue-500 flex items-center space-x-2 hover:underline"
        onClick={handleSeeMoreClick}>
        <span>See More</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* Swiper for Product Cards */}
      <div>
        <Swiper
          spaceBetween={10}
          slidesPerView={4} // Number of cards visible
          navigation
          pagination={{ clickable: true }} // Enable pagination dots
          // autoplay={{ delay: 3000 }} // Auto-slide every 3 seconds
          // loop={true} // Enable infinite scrolling
          autoplay={false}
          loop = {false}
          modules={[Navigation, Pagination, Autoplay]} // Register modules
      
          className="mySwiper"
        >
          {sampleProducts.map((product) => (
            <SwiperSlide key={product.id}>
              < ProductCard product={product}/>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Clothingcategory;