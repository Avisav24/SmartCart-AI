import React, { useState } from 'react';
import CartSummary from '../components/CartSummary';
import { Sliders } from 'lucide-react';

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Organic Bananas",
      price: 2.99,
      quantity: 3,
      image: "/api/placeholder/100/100"
    },
    {
      id: 2,
      name: "Greek Yogurt",
      price: 4.99,
      quantity: 2,
      image: "/api/placeholder/100/100"
    },
    {
      id: 3,
      name: "Whole Grain Bread",
      price: 3.49,
      quantity: 1,
      image: "/api/placeholder/100/100"
    }
  ]);

  const [budgetLimit, setBudgetLimit] = useState(50);

  const handleUpdateQuantity = (id, newQuantity) => {
    if (newQuantity === 0) {
      handleRemoveItem(id);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const currentTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const isOverBudget = currentTotal > budgetLimit;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          {cartItems.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5-6m0 0h15.5M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
              <p className="text-gray-600 mb-4">Add some items to get started</p>
              <button className="bg-walmart-blue hover:bg-blue-700 text-white px-6 py-2 rounded-lg">
                Continue Shopping
              </button>
            </div>
          ) : (
            <CartSummary
              items={cartItems}
              onUpdateQuantity={handleUpdateQuantity}
              onRemoveItem={handleRemoveItem}
            />
          )}
        </div>

        {/* Budget Simulator */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex items-center mb-4">
              <Sliders className="w-5 h-5 text-walmart-blue mr-2" />
              <h2 className="text-lg font-bold text-gray-900">Budget Simulator</h2>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Budget Limit: ${budgetLimit}
              </label>
              <input
                type="range"
                min="20"
                max="200"
                value={budgetLimit}
                onChange={(e) => setBudgetLimit(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>$20</span>
                <span>$200</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Current Total:</span>
                <span className={`font-medium ${isOverBudget ? 'text-red-600' : 'text-gray-900'}`}>
                  ${currentTotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Budget Limit:</span>
                <span className="font-medium text-gray-900">${budgetLimit.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Remaining:</span>
                <span className={`font-medium ${isOverBudget ? 'text-red-600' : 'text-green-600'}`}>
                  ${(budgetLimit - currentTotal).toFixed(2)}
                </span>
              </div>
            </div>

            {isOverBudget && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-700">
                  ⚠️ You're over budget by ${(currentTotal - budgetLimit).toFixed(2)}
                </p>
              </div>
            )}

            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all ${
                    isOverBudget ? 'bg-red-500' : 'bg-green-500'
                  }`}
                  style={{ width: `${Math.min((currentTotal / budgetLimit) * 100, 100)}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Savings Tips */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="font-medium text-green-800 mb-2">💡 Smart Savings Tips</h3>
            <ul className="text-sm text-green-700 space-y-1">
              <li>• Switch to store brand for 15% savings</li>
              <li>• Buy in bulk for frequently used items</li>
              <li>• Check for digital coupons</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
