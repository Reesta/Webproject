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
  ArrowUp,
  
} from 'lucide-react';

const SippureAdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [showAddMenuModal, setShowAddMenuModal] = useState(false);
  const [showOrderDetailsModal, setShowOrderDetailsModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editingMenu, setEditingMenu] = useState(null);
  const [orderFilter, setOrderFilter] = useState('all'); // New state for order filter

  const stats = [
    { title: 'Total Revenue', value: '$12,847', change: '+12.3%', icon: DollarSign },
    { title: 'Orders Today', value: '47', change: '+8.1%', icon: ShoppingCart },
    { title: 'Active Products', value: '23', change: '+2', icon: Package },
    { title: 'Total Orders', value: '1,284', change: '+15.2%', icon: TrendingUp }
  ];

  const [orders, setOrders] = useState([
    {
      id: 1,
      customerName: 'Sarah Johnson',
      customerEmail: 'sarah@example.com',
      customerPhone: '+1234567890',
      items: [
        { name: 'Chamomile Tea', quantity: 1, price: 300 },
        { name: 'Honey', quantity: 1, price: 50 }
      ],
      total: 350,
      status: 'completed',
      time: '2 hours ago',
      date: '2025-07-14',
      paymentMethod: 'Card',
      notes: ''
    },
    {
      id: 2,
      customerName: 'Mike Chen',
      customerEmail: 'mike@example.com',
      customerPhone: '+1234567891',
      items: [
        { name: 'Butterfly Tea', quantity: 1, price: 350 }
      ],
      total: 350,
      status: 'processing',
      time: '4 hours ago',
      date: '2025-07-14',
      paymentMethod: 'Cash',
      notes: ''
    },
    {
      id: 3,
      customerName: 'Emma Wilson',
      customerEmail: 'emma@example.com',
      customerPhone: '+1234567892',
      items: [
        { name: 'Hibiscus Tea', quantity: 1, price: 300 }
      ],
      total: 300,
      status: 'shipped',
      time: '6 hours ago',
      date: '2025-07-14',
      paymentMethod: 'Card',
      notes: ''
    },
    {
      id: 4,
      customerName: 'David Brown',
      customerEmail: 'david@example.com',
      customerPhone: '+1234567893',
      items: [
        { name: 'Jasmine Tea', quantity: 1, price: 400 }
      ],
      total: 400,
      status: 'pending',
      time: '8 hours ago',
      date: '2025-07-14',
      paymentMethod: 'Card',
      notes: ''
    }
  ]);

  const [products, setProducts] = useState([
    { id: 1, name: 'Chamomile Tea', category: 'Relaxation', price: 300, stock: 45, rating: 4.8, src: 'Images/3.webp' },
    { id: 2, name: 'Butterfly Tea', category: 'Energy', price: 350, stock: 32, rating: 4.6, src: 'Images/butterfly.jpg' },
    { id: 3, name: 'Hibiscus Tea', category: 'Relaxation', price: 300, stock: 28, rating: 4.9, src: 'Images/piled.jpg' },
    { id: 4, name: 'Rose Tea', category: 'Wellness', price: 300, stock: 18, rating: 4.7, src: 'Images/rose-bio.jpg' },
    { id: 5, name: 'Jasmine Tea', category: 'Digestive', price: 400, stock: 52, rating: 4.5, src: 'Images/jasmine.jpg' },
    { id: 6, name: 'Matcha Tea', category: 'Digestive', price: 400, stock: 52, rating: 4.5, src: 'Images/Matcha.jpg' }
  ]);

  const [menuItems, setMenuItems] = useState([
    { id: 1, name: 'Hibiscus Tea', category: 'Caffeine-Free', price: 250, stock: 100, rating: 4.7, src: 'Images/MenuHIbis.png' },
    { id: 2, name: 'Iced Matcha', category: 'Wellness', price: 300, stock: 80, rating: 4.6, src: 'Images/MatchaMenu.png' },
    { id: 3, name: 'Peach Iced Tea', category: 'Morning Boost', price: 320, stock: 60, rating: 4.5, src: 'Images/PeachIced.png' },
    { id: 4, name: 'Chamomile Tea', category: 'Refreshing', price: 320, stock: 75, rating: 4.8, src: 'Images/ChamomileTea.png' },
    { id: 5, name: 'Butterfly tea', category: 'Winter Warmth', price: 350, stock: 50, rating: 4.9, src: 'Images/MenuButterfly.png' },
    { id: 6, name: 'Herbal tea', category: 'Summer Delight', price: 300, stock: 90, rating: 4.6, src: 'Images/Herbaltea.png' }
  ]);

  const [newProduct, setNewProduct] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
    rating: '',
    src: ''
  });

  const [newMenu, setNewMenu] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
    rating: '',
    src: ''
  });

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

  const handleAddProduct = () => {
    if (newProduct.name && newProduct.price && newProduct.category) {
      const product = {
        id: Date.now(),
        ...newProduct,
        price: parseFloat(newProduct.price),
        stock: parseInt(newProduct.stock),
        rating: parseFloat(newProduct.rating)
      };
      setProducts([...products, product]);
      resetProductForm();
      setShowAddProductModal(false);
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setNewProduct({ ...product });
    setShowAddProductModal(true);
  };

  const handleUpdateProduct = () => {
    setProducts(products.map(p => p.id === editingProduct.id ? { ...p, ...newProduct } : p));
    resetProductForm();
    setShowAddProductModal(false);
    setEditingProduct(null);
  };

  const resetProductForm = () => {
    setNewProduct({ name: '', category: '', price: '', stock: '', rating: '', src: '' });
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const handleAddMenu = () => {
    if (newMenu.name && newMenu.price && newMenu.category) {
      const menu = {
        id: Date.now(),
        ...newMenu,
        price: parseFloat(newMenu.price),
        stock: parseInt(newMenu.stock),
        rating: parseFloat(newMenu.rating)
      };
      setMenuItems([...menuItems, menu]);
      resetMenuForm();
      setShowAddMenuModal(false);
    }
  };

  const handleEditMenu = (menu) => {
    setEditingMenu(menu);
    setNewMenu({ ...menu });
    setShowAddMenuModal(true);
  };

  const handleUpdateMenu = () => {
    setMenuItems(menuItems.map(m => m.id === editingMenu.id ? { ...m, ...newMenu } : m));
    resetMenuForm();
    setShowAddMenuModal(false);
    setEditingMenu(null);
  };

  const resetMenuForm = () => {
    setNewMenu({ name: '', category: '', price: '', stock: '', rating: '', src: '' });
  };

  const handleDeleteMenu = (id) => {
    if (window.confirm('Are you sure you want to delete this menu item?')) {
      setMenuItems(menuItems.filter(m => m.id !== id));
    }
  };

  const handleUpdateOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map(order => order.id === orderId ? { ...order, status: newStatus } : order));
  };

  const handleDeleteOrder = (orderId) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      setOrders(orders.filter(order => order.id !== orderId));
    }
  };

  const handleViewOrderDetails = (order) => {
    setSelectedOrder(order);
    setShowOrderDetailsModal(true);
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
            <span className="text-sm font-medium text-gray-900">{order.customerName}</span>
          </div>
        </td>
        <td className="px-6 py-4 text-sm text-gray-600">
          {order.items.map(item => `${item.name} (x${item.quantity})`).join(', ')}
        </td>
        <td className="px-6 py-4 text-sm font-bold text-gray-900">RS {order.total}</td>
        <td className="px-6 py-4">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
            <StatusIcon className="h-3 w-3 mr-1" />
            {order.status}
          </span>
        </td>
        <td className="px-6 py-4 text-sm text-gray-500">{order.time}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
          <div className="flex space-x-2">
            <button
              onClick={() => handleViewOrderDetails(order)}
              className="bg-amber-100 hover:bg-amber-200 text-black p-2 rounded-lg transition-colors"
              title="View Details"
            >
              <Eye className="h-4 w-4" />
            </button>
            <button
              onClick={() => handleDeleteOrder(order.id)}
              className="bg-amber-700 hover:bg-amber-800 text-black p-2 rounded-lg transition-colors"
              title="Delete Order"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </td>
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
            className="p-2 text-white bg-[#8ec06c] hover:bg-[#7aa359] rounded-lg transition-all duration-200"
            onClick={() => handleEditProduct(item)}
          >
            <Edit className="h-4 w-4" />
          </button>
          <button
            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
            onClick={() => handleDeleteProduct(item.id)}
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <span className="text-2xl font-bold text-gray-900">RS {item.price}</span>
          <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">Stock: {item.stock}</span>
        </div>
        <div className="flex items-center space-x-1 bg-yellow-50 px-3 py-1 rounded-full">
          <Star className="h-4 w-4 text-yellow-400 fill-current" />
          <span className="text-sm font-medium text-yellow-600">{item.rating}</span>
        </div>
      </div>
    </div>
  );

  const DashboardContent = () => (
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
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Items</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Total</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Time</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.slice(0, 4).map((order) => (
                <OrderRow key={order.id} order={order} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const ProductsContent = () => (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900 flex items-center">
          <Package className="h-8 w-8 mr-3 text-[#8ec06c]" />
          Products
        </h2>
        <button
          onClick={() => setShowAddProductModal(true)}
          className="bg-[#8ec06c] hover:bg-[#7aa359] text-white px-6 py-3 rounded-xl flex items-center space-x-2 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
        >
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

  const MenuContent = () => (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900 flex items-center">
          <Leaf className="h-8 w-8 mr-3 text-[#8ec06c]" />
          Menu Items
        </h2>
        <button
          onClick={() => setShowAddMenuModal(true)}
          className="bg-[#8ec06c] hover:bg-[#7aa359] text-white px-6 py-3 rounded-xl flex items-center space-x-2 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
        >
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

  const OrdersContent = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Orders Management</h2>
        <div className="flex items-center space-x-4">
          <select
            value={orderFilter}
            onChange={(e) => setOrderFilter(e.target.value)}
            className="px-4 py-2 rounded-lg border border-amber-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          >
            <option value="all">All Orders</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-lg overflow-hidden p-6 w-full max-w-[1400px] mx-auto">
        <div className="overflow-x-auto">
          <table className="w-full text-base">
            <thead className="bg-amber-50">
              <tr>
                <th className="px-8 py-4 text-left text-sm font-medium text-amber-800 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-8 py-4 text-left text-sm font-medium text-amber-800 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-8 py-4 text-left text-sm font-medium text-amber-800 uppercase tracking-wider">
                  Items
                </th>
                <th className="px-8 py-4 text-left text-sm font-medium text-amber-800 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-8 py-4 text-left text-sm font-medium text-amber-800 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-8 py-4 text-left text-sm font-medium text-amber-800 uppercase tracking-wider">
                  Time
                </th>
                <th className="px-8 py-4 text-left text-sm font-medium text-amber-800 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-amber-100">
              {orders
                .filter(order => {
                  switch (orderFilter) {
                    case 'pending': return order.status === 'pending';
                    case 'processing': return order.status === 'processing';
                    case 'shipped': return order.status === 'shipped';
                    case 'completed': return order.status === 'completed';
                    default: return true;
                  }
                })
                .map(order => (
                  <tr key={order.id} className="hover:bg-amber-50 transition-colors">
                    <td className="px-8 py-4 whitespace-nowrap text-sm font-medium text-amber-900">
                      #{order.id}
                    </td>
                    <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-900">{order.customerName}</td>
                    <td className="px-8 py-4 text-sm text-gray-900">
                      {order.items.map(item => `${item.name} (x${item.quantity})`).join(', ')}
                    </td>
                    <td className="px-8 py-4 whitespace-nowrap text-sm font-medium text-amber-600">RS {order.total}</td>
                    <td className="px-8 py-4 whitespace-nowrap">
                      <select
                        value={order.status}
                        onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                        className={`px-3 py-1 text-xs font-medium rounded-full border-none focus:ring-2 focus:ring-amber-500 ${
                          order.status === 'completed' ? 'bg-green-100 text-green-800' :
                          order.status === 'pending' ? 'bg-amber-100 text-amber-800' :
                          order.status === 'processing' ? 'bg-amber-200 text-amber-800' :
                          'bg-purple-100 text-purple-800'
                        }`}
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="completed">Completed</option>
                      </select>
                    </td>
                    <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-500">{order.time}</td>
                    <td className="px-8 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleViewOrderDetails(order)}
                          className="bg-amber-100 hover:bg-amber-200 text-black p-2 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteOrder(order.id)}
                          className="bg-amber-700 hover:bg-amber-800 text-black p-2 rounded-lg transition-colors"
                          title="Delete Order"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">{title}</h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-xl"
            >
              ×
            </button>
          </div>
          {children}
        </div>
      </div>
    );
  };

  const AddProductScreen = () => (
    <Modal
      isOpen={showAddProductModal}
      onClose={() => {
        setShowAddProductModal(false);
        setEditingProduct(null);
        setNewProduct({ name: '', category: '', price: '', stock: '', rating: '', src: '' });
      }}
      title={editingProduct ? 'Edit Product' : 'Add New Product'}
    >
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
        />
        <input
          type="text"
          placeholder="Category"
          value={newProduct.category}
          onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
        />
        <input
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
        />
        <input
          type="number"
          placeholder="Stock"
          value={newProduct.stock}
          onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
        />
        <input
          type="number"
          step="0.1"
          placeholder="Rating"
          value={newProduct.rating}
          onChange={(e) => setNewProduct({ ...newProduct, rating: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
        />
        <input
          type="text"
          placeholder="Image Path (e.g. Images/MatchaMenu.png)"
          value={newProduct.src}
          onChange={(e) => setNewProduct({ ...newProduct, src: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
        />
        <button
          onClick={editingProduct ? handleUpdateProduct : handleAddProduct}
          className="w-full bg-[#8ec06c] hover:bg-[#7aa359] text-white py-2 px-4 rounded-lg transition-colors"
        >
          {editingProduct ? 'Update Product' : 'Add Product'}
        </button>
      </div>
    </Modal>
  );

  const AddMenuItemScreen = () => (
    <Modal
      isOpen={showAddMenuModal}
      onClose={() => {
        setShowAddMenuModal(false);
        setEditingMenu(null);
        setNewMenu({ name: '', category: '', price: '', stock: '', rating: '', src: '' });
      }}
      title={editingMenu ? 'Edit Menu' : 'Add New Menu'}
    >
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Menu Name"
          value={newMenu.name}
          onChange={(e) => setNewMenu({ ...newMenu, name: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
        />
        <input
          type="text"
          placeholder="Category"
          value={newMenu.category}
          onChange={(e) => setNewMenu({ ...newMenu, category: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
        />
        <input
          type="number"
          placeholder="Price"
          value={newMenu.price}
          onChange={(e) => setNewMenu({ ...newMenu, price: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
        />
        <input
          type="number"
          placeholder="Stock"
          value={newMenu.stock}
          onChange={(e) => setNewMenu({ ...newMenu, stock: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
        />
        <input
          type="number"
          step="0.1"
          placeholder="Rating"
          value={newMenu.rating}
          onChange={(e) => setNewMenu({ ...newMenu, rating: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
        />
        <input
          type="text"
          placeholder="Image Path (e.g. Images/MatchaMenu.png)"
          value={newMenu.src}
          onChange={(e) => setNewMenu({ ...newMenu, src: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
        />
        <button
          onClick={editingMenu ? handleUpdateMenu : handleAddMenu}
          className="w-full bg-[#8ec06c] hover:bg-[#7aa359] text-white py-2 px-4 rounded-lg transition-colors"
        >
          {editingMenu ? 'Update Menu' : 'Add Menu'}
        </button>
      </div>
    </Modal>
  );

  const OrderDetailsModal = () => {
    if (!selectedOrder) return null;
    return (
      <Modal
        isOpen={showOrderDetailsModal}
        onClose={() => {
          setShowOrderDetailsModal(false);
          setSelectedOrder(null);
        }}
        title={`Order Details - #${selectedOrder.id}`}
      >
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-800 mb-2">Customer Information</h4>
            <p><strong>Name:</strong> {selectedOrder.customerName}</p>
            <p><strong>Email:</strong> {selectedOrder.customerEmail}</p>
            <p><strong>Phone:</strong> {selectedOrder.customerPhone}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-800 mb-2">Order Details</h4>
            <p><strong>Date:</strong> {selectedOrder.date}</p>
            <p><strong>Time:</strong> {selectedOrder.time}</p>
            <p><strong>Payment Method:</strong> {selectedOrder.paymentMethod}</p>
            <p><strong>Status:</strong>
              <span className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${
                selectedOrder.status === 'completed' ? 'bg-green-100 text-green-800' :
                selectedOrder.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                selectedOrder.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                'bg-purple-100 text-purple-800'
              }`}>
                {selectedOrder.status}
              </span>
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-800 mb-2">Items Ordered</h4>
            <div className="space-y-2">
              {selectedOrder.items.map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span>{item.name} x{item.quantity}</span>
                  <span className="font-medium">RS {(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="border-t pt-2 mt-2">
              <div className="flex justify-between items-center font-bold text-lg">
                <span>Total:</span>
                <span className="text-amber-600">RS {selectedOrder.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
          {selectedOrder.notes && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-2">Special Notes</h4>
              <p className="text-gray-700">{selectedOrder.notes}</p>
            </div>
          )}
          <div className="flex space-x-2">
            {selectedOrder.status === 'pending' && (
              <button
                onClick={() => {
                  handleUpdateOrderStatus(selectedOrder.id, 'processing');
                  setShowOrderDetailsModal(false);
                }}
                className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-4 rounded-lg transition-colors"
              >
                Start Processing
              </button>
            )}
            {selectedOrder.status === 'processing' && (
              <button
                onClick={() => {
                  handleUpdateOrderStatus(selectedOrder.id, 'shipped');
                  setShowOrderDetailsModal(false);
                }}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
              >
                Ship Order
              </button>
            )}
            {selectedOrder.status === 'shipped' && (
              <button
                onClick={() => {
                  handleUpdateOrderStatus(selectedOrder.id, 'completed');
                  setShowOrderDetailsModal(false);
                }}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors"
              >
                Mark Complete
              </button>
            )}
            {selectedOrder.status !== 'completed' && selectedOrder.status !== 'cancelled' && (
              <button
                onClick={() => {
                  handleUpdateOrderStatus(selectedOrder.id, 'cancelled');
                  setShowOrderDetailsModal(false);
                }}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-colors"
              >
                Cancel Order
              </button>
            )}
          </div>
        </div>
      </Modal>
    );
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
        <main className="p-8 bg-gray-50">
          {activeTab === 'dashboard' && <DashboardContent />}
          {activeTab === 'products' && <ProductsContent />}
          {activeTab === 'menu' && <MenuContent />}
          {activeTab === 'orders' && <OrdersContent />}
        </main>
      </div>

      {/* Modals */}
      <AddProductScreen />
      <AddMenuItemScreen />
      <OrderDetailsModal />
    </div>
  );
};

export default SippureAdminDashboard;