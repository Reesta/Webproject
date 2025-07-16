import React, { useState, useEffect } from "react";
import { Plus, Minus, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [quantities, setQuantities] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);

    const initialQuantities = {};
    storedCart.forEach((item) => {
      initialQuantities[item.id] = item.quantity || 1;
    });
    setQuantities(initialQuantities);
  }, []);

  const handleQuantityChange = (id, delta) => {
    const newQuantity = Math.max(1, (quantities[id] || 1) + delta);
    setQuantities({ ...quantities, [id]: newQuantity });

    const updatedCart = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );

    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleRemoveItem = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const quantity = quantities[item.id] || 1;
      return total + item.price * quantity;
    }, 0);
  };

  return (
    <div className="min-h-screen bg-[#f3f8e9]">
      <header className="bg-[#f3f8e9] shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-black">Your Cart</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-96">
              <p className="text-gray-600 text-lg">Your cart is empty.</p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-white/60 backdrop-blur-md border border-white/30 rounded-3xl shadow-lg p-6 flex flex-col md:flex-row items-center gap-6 hover:scale-[1.01] transition-transform"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-28 h-28 rounded-2xl object-cover shadow-md"
                />
                <div className="flex-1 space-y-2">
                  <h2 className="text-xl font-semibold">{item.name}</h2>
                  <p className="text-sm text-gray-500">{item.description}</p>

                  <div className="flex items-center gap-3 mt-4">
                    <button
                      onClick={() => handleQuantityChange(item.id, -1)}
                      className="w-8 h-8 flex items-center justify-center bg-white/30 border border-white/20 rounded-full hover:bg-white/50 transition"
                    >
                      <Minus className="w-4 h-4 text-gray-700" />
                    </button>
                    <span className="font-bold">{quantities[item.id] || 1}</span>
                    <button
                      onClick={() => handleQuantityChange(item.id, 1)}
                      className="w-8 h-8 flex items-center justify-center bg-white/30 border border-white/20 rounded-full hover:bg-white/50 transition"
                    >
                      <Plus className="w-4 h-4 text-gray-700" />
                    </button>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-3">
                  <span className="text-lg font-bold text-black">
                    Rs {(item.price * (quantities[item.id] || 1)).toLocaleString()}
                  </span>
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="w-10 h-10 bg-red-500/80 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <aside className="bg-white/70 backdrop-blur-lg border border-white/30 rounded-3xl shadow-xl p-6 sticky top-24">
          <h3 className="text-2xl font-bold mb-4 text-black">Summary</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>Rs {getTotalPrice().toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax (5%)</span>
              <span>Rs {(getTotalPrice() * 0.05).toFixed(0)}</span>
            </div>
            <div className="flex justify-between font-semibold text-lg border-t pt-3">
              <span>Total</span>
              <span>Rs {(getTotalPrice() * 1.05).toFixed(0)}</span>
            </div>
          </div>

          <button
            disabled={cartItems.length === 0}
            onClick={() => navigate("/checkout")}
            className={`mt-6 w-full py-3 rounded-full text-white font-semibold transition-all ${
              cartItems.length === 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#a4d57c] hover:bg-[#98c870]text-black"
            }`}
          >
            Proceed to Checkout
          </button>
        </aside>
      </main>
    </div>
  );
}
