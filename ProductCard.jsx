import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-500 hover:scale-105 w-64 mx-2 hover:shadow-xl">
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-48 object-cover border-2 border-white-300 rounded-t-lg"
      />
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800 truncate hover:text-blue-500 transition duration-300">
          {product.title}
        </h2>
        <p className="text-gray-600 text-sm mt-2">{product.description}</p>
      
      </div>
    </div> 


  );
};

export default ProductCard;