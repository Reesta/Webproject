import React, { useState } from 'react';
import {
  Package,
  ShoppingCart,
  TrendingUp,
  Plus,
  Eye,
  Edit,
  Trash2,
  DollarSign,
  Leaf,
  Star,
  CheckCircle,
  AlertCircle,
  Clock,
  ArrowUp
} from 'lucide-react';

const SippureAdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  
  const stats = [
    { title: 'Total Revenue', value: '$12,847', change: '+12.3%', icon: DollarSign },
    { title: 'Orders Today', value: '47', change: '+8.1%', icon: ShoppingCart },
    { title: 'Active Products', value: '23', change: '+2', icon: Package },
    { title: 'Total Orders', value: '1,284', change: '+15.2%', icon: TrendingUp }
  ];

  
  const recentOrders = [
    { id: '#3421', customer: 'Sarah Johnson', product: 'Chamomile Tea', amount: 'RS 300', status: 'completed', time: '2 hours ago' },
    { id: '#3420', customer: 'Mike Chen', product: 'Butterfly Tea', amount: 'RS 350', status: 'processing', time: '4 hours ago' },
    { id: '#3419', customer: 'Emma Wilson', product: 'Hibiscus Tea', amount: 'RS 300', status: 'shipped', time: '6 hours ago' },
    { id: '#3418', customer: 'David Brown', product: 'Jasmine Tea', amount: 'RS 400', status: 'pending', time: '8 hours ago' }
  ];

  
  const [products, setProducts] = useState([
    { id: 1, name: 'Chamomile Tea', category: 'Relaxation', price: 'RS 300', stock: 45, rating: 4.8, src: 'Images/3.webp' },
    { id: 2, name: 'Butterfly Tea', category: 'Energy', price: 'RS 350', stock: 32, rating: 4.6, src: 'Images/butterfly.jpg' },
    { id: 3, name: 'Hibiscus Tea', category: 'Relaxation', price: 'RS 300', stock: 28, rating: 4.9, src: 'Images/piled.jpg' },
    { id: 4, name: 'Rose Tea', category: 'Wellness', price: 'RS 300', stock: 18, rating: 4.7, src: 'Images/rose-bio.jpg' },
    { id: 5, name: 'Jasmine Tea', category: 'Digestive', price: 'RS 400', stock: 52, rating: 4.5, src: 'Images/jasmine.jpg' },
    { id: 6, name: 'Matcha Tea', category: 'Digestive', price: 'RS 400', stock: 52, rating: 4.5, src: 'Images/Matcha.jpg' }
  ]);

  
  const [menuItems, setMenuItems] = useState([
    { id: 1, name: 'Hibiscus Tea', category: 'Caffeine-Free', price: 'RS 250', stock: 100, rating: 4.7, src: 'Images/MenuHIbis.png' },
    { id: 2, name: 'Iced Matcha', category: 'Wellness', price: 'RS 300', stock: 80, rating: 4.6, src: 'Images/MatchaMenu.png' },
    { id: 3, name: 'Peach Iced Tea', category: 'Morning Boost', price: 'RS 320', stock: 60, rating: 4.5, src: 'Images/PeachIced.png' },
    { id: 4, name: 'Chamomile Tea', category: 'Refreshing', price: 'RS 320', stock: 75, rating: 4.8, src: 'Images/ChamomileTea.png' },
    { id: 5, name: 'Butterfly tea', category: 'Winter Warmth', price: 'RS 350', stock: 50, rating: 4.9, src: 'Images/MenuButterfly.png' },
    { id: 6, name: 'Herbal tea', category: 'Summer Delight', price: 'RS 300', stock: 90, rating: 4.6, src: 'Images/Herbaltea.png' }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'processing': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'shipped': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'pending': return 'bg-amber-100 text-amber-800 border-amber-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  
  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return CheckCircle;
      case 'processing': return Clock;
      case 'shipped': return Package;
      case 'pending': return AlertCircle;
      default: return Clock;
    }
  };

  
  const StatCard = ({ stat }) => {
    const Icon = stat.icon;
    return (
      <div className="bg-white border rounded-2xl p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
            <p className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</p>
            <div className="flex items-center space-x-1">
              <ArrowUp className="h-3 w-3 text-[#8ec06c]" />
              <span className="text-sm font-medium text-[#8ec06c]">{stat.change}</span>
            </div>
          </div>
          <div className="bg-[#8ec06c] p-4 rounded-xl shadow-lg">
            <Icon className="h-7 w-7 text-white" />
          </div>
        </div>
      </div>
    );
  };

 
  const OrderRow = ({ order }) => {
    const StatusIcon = getStatusIcon(order.status);
    return (
      <tr className="hover:bg-gray-50 transition-all duration-200">
        <td className="px-6 py-4 text-sm font-bold text-gray-900">{order.id}</td>
        <td className="px-6 py-4">
          <div className="flex items-center">
            <span className="text-sm font-medium text-gray-900">{order.customer}</span>
          </div>
        </td>
        <td className="px-6 py-4 text-sm text-gray-600">{order.product}</td>
        <td className="px-6 py-4 text-sm font-bold text-gray-900">{order.amount}</td>
        <td className="px-6 py-4">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
            <StatusIcon className="h-3 w-3 mr-1" />
            {order.status}
          </span>
        </td>
        <td className="px-6 py-4 text-sm text-gray-500">{order.time}</td>
      </tr>
    );
  };

 
  const ProductCard = ({ item, isMenu = false }) => (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-4">
          <img src={item.src} alt={item.name} className="w-16 h-16 rounded-xl object-cover" />
          <div>
            <h3 className="font-bold text-gray-900 text-lg">{item.name}</h3>
            <p className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full inline-block mt-1">{item.category}</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            className="p-2 text-gray-400 hover:text-[#8ec06c] hover:bg-green-50 rounded-lg transition-all duration-200"
            onClick={() => handleEdit(item.id, isMenu)}
          >
            <Edit className="h-4 w-4" />
          </button>
          <button
            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
            onClick={() => handleDelete(item.id, isMenu)}
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <span className="text-2xl font-bold text-gray-900">{item.price}</span>
          <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">Stock: {item.stock}</span>
        </div>
        <div className="flex items-center space-x-1 bg-yellow-50 px-3 py-1 rounded-full">
          <Star className="h-4 w-4 text-yellow-400 fill-current" />
          <span className="text-sm font-medium text-yellow-600">{item.rating}</span>
        </div>
      </div>
    </div>
  );

  
  const handleEdit = (id, isMenu) => {
    alert(`Edit ${isMenu ? 'Menu Item' : 'Product'} with ID: ${id}`);
  };

  
  const handleDelete = (id, isMenu) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      if (isMenu) {
        setMenuItems(prev => prev.filter(i => i.id !== id));
      } else {
        setProducts(prev => prev.filter(p => p.id !== id));
      }
      alert(`${isMenu ? 'Menu Item' : 'Product'} with ID ${id} deleted`);
    }
  };

  
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <StatCard key={index} stat={stat} />
              ))}
            </div>
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                  <ShoppingCart className="h-6 w-6 mr-2 text-[#8ec06c]" />
                  Recent Orders
                </h2>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Order ID</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Customer</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Product</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Amount</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Time</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {recentOrders.map((order) => (
                      <OrderRow key={order.id} order={order} />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      case 'products':
        return (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold text-gray-900 flex items-center">
                <Package className="h-8 w-8 mr-3 text-[#8ec06c]" />
                Products
              </h2>
              <button className="bg-[#8ec06c] hover:bg-[#7aa359] text-white px-6 py-3 rounded-xl flex items-center space-x-2 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1" onClick={() => setActiveTab('addProduct')}>
                <Plus className="h-5 w-5" />
                <span className="font-medium">Add Product</span>
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <ProductCard key={product.id} item={product} />
              ))}
            </div>
          </div>
        );
      case 'orders':
        return (
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                <ShoppingCart className="h-6 w-6 mr-2 text-[#8ec06c]" />
                All Orders
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Order ID</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Customer</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Product</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Time</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentOrders.map((order) => (
                    <OrderRow key={order.id} order={order} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'menu':
        return (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold text-gray-900 flex items-center">
                <Leaf className="h-8 w-8 mr-3 text-[#8ec06c]" />
                Menu Items
              </h2>
              <button className="bg-[#8ec06c] hover:bg-[#7aa359] text-white px-6 py-3 rounded-xl flex items-center space-x-2 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1" onClick={() => setActiveTab('addItem')}>
                <Plus className="h-5 w-5" />
                <span className="font-medium">Add Item</span>
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {menuItems.map((item) => (
                <ProductCard key={item.id} item={item} isMenu={true} />
              ))}
            </div>
          </div>
        );
      case 'addProduct':
        return <AddProductScreen onSave={(newProduct) => setProducts([...products, newProduct])} onCancel={() => setActiveTab('products')} />;
      case 'addItem':
        return <AddMenuItemScreen onSave={(newItem) => setMenuItems([...menuItems, newItem])} onCancel={() => setActiveTab('menu')} />;
      default:
        return null;
    }
  };

  
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: TrendingUp },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'orders', label: 'Orders', icon: ShoppingCart },
    { id: 'menu', label: 'Menu', icon: Leaf }
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="fixed inset-y-0 left-0 w-64 bg-gray-50 shadow-2xl border-r border-green-100">
        <div className="flex items-center justify-center h-20 border-b border-green-200 bg-green-50">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-[#8ec06c] rounded-xl flex items-center justify-center shadow-lg">
              <Leaf className="h-7 w-7 text-white" />
            </div>
            <span className="text-2xl font-bold text-[#8ec06c]">Sippure</span>
          </div>
        </div>
        <nav className="mt-8 px-4 space-y-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center px-6 py-4 text-left text-sm font-medium rounded-xl transition-all duration-200 transform hover:scale-105 ${
                  activeTab === item.id
                    ? 'bg-[#8ec06c] text-white shadow-lg'
                    : 'text-gray-700 hover:bg-green-100 hover:text-[#8ec06c]'
                }`}
              >
                <Icon className="h-5 w-5 mr-4" />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>
      <div className="ml-64">
        <header className="bg-white shadow-lg border-b border-green-100">
          <div className="px-8 py-6 flex items-center justify-between">
            <h1 className="text-3xl font-bold text-[#8ec06c]">
              {navItems.find(item => item.id === activeTab)?.label || 'Sippure'}
            </h1>
            
          </div>
        </header>
        <main className="p-8 bg-gray-50">{renderContent()}</main>
      </div>
    </div>
  );
};


const AddProductScreen = ({ onSave, onCancel }) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [rating, setRating] = useState('');
  const [src, setSrc] = useState('');

  const handleSubmit = () => {
    const newId = Date.now();
    onSave({
      id: newId,
      name,
      category,
      price,
      stock,
      rating,
      src
    });
    onCancel(); 
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Add New Product</h2>
      <div className="space-y-6">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8ec06c]"
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8ec06c]"
        />
        <input
          type="text"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8ec06c]"
        />
        <input
          type="number"
          placeholder="Stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8ec06c]"
        />
        <input
          type="number"
          step="0.1"
          placeholder="Rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8ec06c]"
        />
        <input
          type="text"
          placeholder="Image Path (e.g. Images/MatchaMenu.png)"
          value={src}
          onChange={(e) => setSrc(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8ec06c]"
        />
        <div className="flex space-x-4">
          <button
            onClick={handleSubmit}
            className="bg-[#8ec06c] hover:bg-[#7aa359] text-white px-6 py-3 rounded-xl flex-1"
          >
            Save Product
          </button>
          <button
            onClick={onCancel}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-xl flex-1"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};


const AddMenuItemScreen = ({ onSave, onCancel }) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [rating, setRating] = useState('');
  const [src, setSrc] = useState('');

  const handleSubmit = () => {
    const newId = Date.now();
    onSave({
      id: newId,
      name,
      category,
      price,
      stock,
      rating,
      src
    });
    onCancel(); 
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Add New Menu Item</h2>
      <div className="space-y-6">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8ec06c]"
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8ec06c]"
        />
        <input
          type="text"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8ec06c]"
        />
        <input
          type="number"
          placeholder="Stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8ec06c]"
        />
        <input
          type="number"
          step="0.1"
          placeholder="Rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8ec06c]"
        />
        <input
          type="text"
          placeholder="Image Path (e.g. Images/MatchaMenu.png)"
          value={src}
          onChange={(e) => setSrc(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8ec06c]"
        />
        <div className="flex space-x-4">
          <button
            onClick={handleSubmit}
            className="bg-[#8ec06c] hover:bg-[#7aa359] text-white px-6 py-3 rounded-xl flex-1"
          >
            Save Item
          </button>
          <button
            onClick={onCancel}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-xl flex-1"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default SippureAdminDashboard;