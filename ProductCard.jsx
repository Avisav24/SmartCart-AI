import React from 'react';
import { Plus, Star } from 'lucide-react';

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div className="bg-white rounded-lg shadow-md card-hover p-4">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover rounded-lg mb-3"
        />
        <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
          {product.discount}% OFF
        </div>
      </div>
      
      <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">{product.name}</h3>
      
      <div className="flex items-center mb-2">
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < product.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
              }`}
            />
          ))}
        </div>
        <span className="text-sm text-gray-600 ml-2">({product.reviews})</span>
      </div>
      
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <span className="text-lg font-bold text-gray-900">${product.price}</span>
          {product.originalPrice && (
            <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
          )}
        </div>
        <span className="text-xs text-green-600 font-medium">
          +{product.ecoPoints} eco points
        </span>
      </div>
      
      <button
        onClick={() => onAddToCart(product)}
        className="w-full bg-walmart-blue hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors"
      >
        <Plus className="w-4 h-4" />
        <span>Add to Cart</span>
      </button>
    </div>
  );
};

export default ProductCard;
