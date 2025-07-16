import React, { useState, useEffect } from "react";
import { CreditCard, Truck, ShoppingBag } from "lucide-react";

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    zip: "",
    paymentMethod: "card",
  });

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const quantity = item.quantity || 1;
      return total + item.price * quantity;
    }, 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Order placed successfully!");
    localStorage.removeItem("cart");
  };

  return (
    <div className="min-h-screen bg-[#f3f8e9]">
      <header className="sticky top-0 z-30 bg-white/60 backdrop-blur border-b border-white/30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-black">Checkout</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <form
          onSubmit={handleSubmit}
          className="lg:col-span-2 bg-white/70 backdrop-blur-lg rounded-3xl p-6 shadow-lg space-y-6"
        >
          <h2 className="text-2xl font-bold text-black flex items-center gap-2">
            <Truck className="w-6 h-6" /> Shipping Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              required
              className="p-3 rounded-xl bg-white/80 border border-white/30 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
              type="text"
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <input
              required
              className="p-3 rounded-xl bg-white/80 border border-white/30 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <input
              required
              className="p-3 rounded-xl bg-white/80 border border-white/30 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 col-span-full"
              type="text"
              placeholder="Street Address"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            />
            <input
              required
              className="p-3 rounded-xl bg-white/80 border border-white/30 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
              type="text"
              placeholder="City"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            />
            <input
              required
              className="p-3 rounded-xl bg-white/80 border border-white/30 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
              type="text"
              placeholder="ZIP Code"
              value={formData.zip}
              onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
            />
          </div>

          <h2 className="text-2xl font-bold text-black flex items-center gap-2">
            <CreditCard className="w-6 h-6" /> Payment Method
          </h2>

          <div className="flex gap-4">
            <label className="flex-1 bg-white/80 p-4 rounded-xl shadow-md flex items-center gap-3 cursor-pointer border border-white/30">
              <input
                type="radio"
                name="payment"
                value="card"
                checked={formData.paymentMethod === "card"}
                onChange={() => setFormData({ ...formData, paymentMethod: "card" })}
                className="accent-emerald-600"
              />
              <span className="font-semibold">Credit/Debit Card</span>
            </label>
            <label className="flex-1 bg-white/80 p-4 rounded-xl shadow-md flex items-center gap-3 cursor-pointer border border-white/30">
              <input
                type="radio"
                name="payment"
                value="cash"
                checked={formData.paymentMethod === "cash"}
                onChange={() => setFormData({ ...formData, paymentMethod: "cash" })}
                className="accent-emerald-600"
              />
              <span className="font-semibold">Cash on Delivery</span>
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-full bg-[#a4d57c] hover:bg-[#98c870] text-white font-semibold text-lg transition-all"
          >
            Place Order
          </button>
        </form>

        <aside className="bg-white/70 backdrop-blur-lg rounded-3xl p-6 shadow-lg sticky top-24 space-y-4">
          <h2 className="text-2xl font-bold text-black flex items-center gap-2">
            <ShoppingBag className="w-6 h-6" /> Order Summary
          </h2>

          <div className="divide-y divide-white/20">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between py-3">
                <span>
                  {item.name} × {item.quantity || 1}
                </span>
                <span>Rs {(item.price * (item.quantity || 1)).toLocaleString()}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-white/30 pt-4 space-y-2 text-lg font-semibold">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>Rs {getTotalPrice().toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax (5%)</span>
              <span>Rs {(getTotalPrice() * 0.05).toFixed(0)}</span>
            </div>
            <div className="flex justify-between text-emerald-700">
              <span>Total</span>
              <span>Rs {(getTotalPrice() * 1.05).toFixed(0)}</span>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}
