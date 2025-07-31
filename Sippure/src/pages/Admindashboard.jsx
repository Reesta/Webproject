import React, { useState, useEffect, useCallback, memo } from "react";
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
} from "lucide-react";
import api from "../api/axios";

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

const OrderRow = ({ order, onViewDetails, onDelete, onUpdateStatus }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "processing":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "shipped":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "pending":
        return "bg-amber-100 text-amber-800 border-amber-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return CheckCircle;
      case "processing":
        return Clock;
      case "shipped":
        return Package;
      case "pending":
        return AlertCircle;
      default:
        return Clock;
    }
  };

  const StatusIcon = getStatusIcon(order.status);

  // Get customer name from user object
  const customerName = order.user ? `${order.user.firstName || ''} ${order.user.lastName || ''}`.trim() : 'Unknown Customer';
  
  // Format date
  const orderDate = order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'N/A';
  const orderTime = order.createdAt ? new Date(order.createdAt).toLocaleTimeString() : 'N/A';

  const handleViewDetails = () => {
    if (order && onViewDetails) {
      onViewDetails(order);
    }
  };

  const handleDelete = () => {
    if (order?.id && onDelete) {
      onDelete(order.id);
    }
  };

  return (
    <tr className="hover:bg-gray-50 transition-all duration-200">
      <td className="px-6 py-4 text-sm font-bold text-gray-900">{order.id}</td>
      <td className="px-6 py-4">
        <div className="flex items-center">
          <span className="text-sm font-medium text-gray-900">{customerName}</span>
        </div>
      </td>
      <td className="px-6 py-4 text-sm text-gray-600">
        {order.items.map((item) => `${item.product?.name} (x${item.quantity})`).join(", ")}
      </td>
      <td className="px-6 py-4 text-sm font-bold text-gray-900">RS {order.totalAmount}</td>
      <td className="px-6 py-4">
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
            order.status
          )}`}
        >
          <StatusIcon className="h-3 w-3 mr-1" />
          {order.status}
        </span>
      </td>
      <td className="px-6 py-4 text-sm text-gray-500">{orderDate} {orderTime}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <div className="flex space-x-2">
          <button
            onClick={handleViewDetails}
            className="bg-green-100 hover:bg-green-200 text-black p-2 rounded-lg transition-colors"
            title="View Details"
          >
            <Eye className="h-4 w-4" />
          </button>
          <button
            onClick={handleDelete}
            className="bg-green-100 hover:bg-green-200 text-black p-2 rounded-lg transition-colors"
            title="Delete Order"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </td>
    </tr>
  );
};

const ProductCard = ({ item, onEdit, onDelete }) => {
  const handleEdit = () => {
    if (item && onEdit) {
      onEdit(item);
    }
  };

  const handleDelete = () => {
    if (item?.id && onDelete) {
      onDelete(item.id);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-4">
          <img
            src={item?.image || '/placeholder.png'}
            alt={item?.name}
            className="w-16 h-16 rounded-xl object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/placeholder.png';
            }}
          />
          <div>
            <h3 className="font-bold text-gray-900 text-lg">{item?.name}</h3>
            <p className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full inline-block mt-1">
              {item?.category?.name}
            </p>
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            className="p-2 text-white bg-[#8ec06c] hover:bg-[#7aa359] rounded-lg transition-all duration-200"
            onClick={handleEdit}
            title="Edit Product"
          >
            <Edit className="h-4 w-4" />
          </button>
          <button
            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
            onClick={handleDelete}
            title="Delete Product"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <span className="text-2xl font-bold text-gray-900">RS {item?.price}</span>
          {item?.stock !== undefined && (
            <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">Stock: {item.stock}</span>
          )}
        </div>
        <div className="flex items-center space-x-1 bg-yellow-50 px-3 py-1 rounded-full">
          <Star className="h-4 w-4 text-yellow-400 fill-current" />
          <span className="text-sm font-medium text-yellow-600">{item?.rating}</span>
        </div>
      </div>
    </div>
  );
};

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-[#f3f8e9] flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-xl">
            ×
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

const AddProductScreen = memo(
  ({
    showAddProductModal,
    setShowAddProductModal,
    editingProduct,
    setEditingProduct,
    newProduct,
    handleChange,
    handleAddProduct,
    handleUpdateProduct,
    resetProductForm,
    categories,
  }) => (
    <Modal
      isOpen={showAddProductModal}
      onClose={() => {
        setShowAddProductModal(false);
        setEditingProduct(null);
        resetProductForm();
      }}
      title={editingProduct ? "Edit Product" : "Add New Product"}
    >
      <div className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
        />
        <select
          name="category"
          value={newProduct.category}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={newProduct.price}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
        />
        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={newProduct.stock}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
        />
        <input
          type="number"
          step="0.1"
          name="rating"
          placeholder="Rating"
          value={newProduct.rating}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
        />
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Product Image</label>
          <div className="flex flex-col space-y-2">
            <input
              type="file"
              accept="image/*"
              name="image"
              id="product-image"
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
            {newProduct.image && (
              <div className="text-sm text-gray-500">
                <p>Selected new image: {newProduct.image.name}</p>
                <div className="mt-2 border border-gray-200 rounded-md p-2 bg-gray-50">
                  <img 
                    src={URL.createObjectURL(newProduct.image)} 
                    alt="New product image preview" 
                    className="h-24 w-24 object-cover rounded-md"
                  />
                </div>
              </div>
            )}
            {editingProduct?.image && !newProduct.image && (
              <div className="text-sm text-gray-500">
                <p>Current image: {editingProduct.image}</p>
                <div className="mt-2 border border-gray-200 rounded-md p-2 bg-gray-50">
                  <img 
                    src={editingProduct.image} 
                    alt="Current product image" 
                    className="h-24 w-24 object-cover rounded-md"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/placeholder.png';
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
        <button
          onClick={editingProduct ? handleUpdateProduct : handleAddProduct}
          className="w-full bg-[#8ec06c] hover:bg-[#7aa359] text-white py-2 px-4 rounded-lg transition-colors"
        >
          {editingProduct ? "Update Product" : "Add Product"}
        </button>
      </div>
    </Modal>
  )
);

const Admindashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [showOrderDetailsModal, setShowOrderDetailsModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [orderFilter, setOrderFilter] = useState("all");
  const [categories, setCategories] = useState([]);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    rating: "",
    image: null,
  });

  const stats = [
    {
      title: "Total Revenue",
      value: "$12,847",
      change: "+12.3%",
      icon: DollarSign,
    },
    { title: "Orders Today", value: "47", change: "+8.1%", icon: ShoppingCart },
    { title: "Active Products", value: "23", change: "+2", icon: Package },
    {
      title: "Total Orders",
      value: "1,284",
      change: "+15.2%",
      icon: TrendingUp,
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "processing":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "shipped":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "pending":
        return "bg-amber-100 text-amber-800 border-amber-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return CheckCircle;
      case "processing":
        return Clock;
      case "shipped":
        return Package;
      case "pending":
        return AlertCircle;
      default:
        return Clock;
    }
  };

  const handleChange = useCallback((e) => {
    const { name, value, files, type } = e.target;
    
    if (type === "file") {
      // Handle file input
      if (files && files.length > 0) {
        const selectedFile = files[0];
        console.log("File selected:", selectedFile.name);
        console.log("File type:", selectedFile.type);
        console.log("File size:", selectedFile.size, "bytes");
        
        setNewProduct((prev) => ({
          ...prev,
          [name]: selectedFile,
        }));
      } else {
        console.log("No file selected or files array is empty");
      }
    } else {
      // Handle other inputs
      setNewProduct((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  }, []);

  const handleAddProduct = async () => {
    if (newProduct.name && newProduct.price && newProduct.category) {
      const formData = new FormData();
      formData.append("name", newProduct.name);
      formData.append("price", newProduct.price);
      formData.append("categoryId", newProduct.category);
      formData.append("stock", newProduct.stock);
      formData.append("rating", newProduct.rating);
      
      if (newProduct.image) {
        console.log("Image being uploaded:", newProduct.image.name);
        console.log("Image type:", newProduct.image.type);
        console.log("Image size:", newProduct.image.size, "bytes");
        formData.append("image", newProduct.image);
      } else {
        console.log("No image selected for new product");
      }
      
      // Log all form data entries for debugging
      for (let pair of formData.entries()) {
        console.log(pair[0], pair[1] instanceof File ? `File: ${pair[1].name}` : pair[1]);
      }
      
      try {
        // IMPORTANT: When sending FormData with files, don't set Content-Type header
        // The browser will automatically set the correct Content-Type with boundary
        const response = await fetch("http://localhost:4000/api/product", {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            // Do not set Content-Type when sending FormData with files
          },
          body: formData,
        });
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error("Server response error:", errorText);
          console.error("Response status:", response.status);
          throw new Error("Failed to add product: " + errorText);
        }
        
        const result = await response.json();
        console.log("Product added successfully:", result);
        setProducts((prev) => [...prev, result.data]);
        resetProductForm();
        setShowAddProductModal(false);
      } catch (error) {
        console.error("Error adding product:", error);
        alert("Failed to add product. Please try again.");
      }
    } else {
      alert("Please fill in all required fields (name, price, and category).");
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setNewProduct({
      name: product.name || "",
      category: product.category?.id || "",
      price: product.price?.toString() || "",
      stock: product.stock?.toString() || "",
      rating: product.rating?.toString() || "",
      image: null,
    });
    setShowAddProductModal(true);
  };

  const handleUpdateProduct = async () => {
    try {
      const formData = new FormData();
      formData.append("name", newProduct.name);
      formData.append("price", newProduct.price);
      formData.append("categoryId", newProduct.category);
      formData.append("stock", newProduct.stock);
      formData.append("rating", newProduct.rating);
      
      // Only append image if a new one is selected
      if (newProduct.image) {
        console.log("Image being updated:", newProduct.image.name);
        console.log("Image type:", newProduct.image.type);
        console.log("Image size:", newProduct.image.size, "bytes");
        formData.append("image", newProduct.image);
      } else {
        console.log("No new image selected, keeping existing image");
      }
      
      // Log all form data entries for debugging
      for (let pair of formData.entries()) {
        console.log(pair[0], pair[1] instanceof File ? `File: ${pair[1].name}` : pair[1]);
      }
      
      const response = await fetch(`http://localhost:4000/api/product/${editingProduct.id}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          // IMPORTANT: Do not set Content-Type header when sending FormData with files
          // The browser will automatically set the correct Content-Type with boundary
        },
        body: formData,
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Server response error:", errorText);
        console.error("Response status:", response.status);
        throw new Error("Failed to update product: " + errorText);
      }
      
      const updatedProduct = await response.json();
      console.log("Product updated successfully:", updatedProduct);
      
      setProducts((prev) =>
        prev.map((p) => (p.id === editingProduct.id ? updatedProduct.data : p))
      );
      
      resetProductForm();
      setShowAddProductModal(false);
      setEditingProduct(null);
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product. Please try again.");
    }
  };

  const resetProductForm = () => {
    setNewProduct({
      name: "",
      category: "",
      price: "",
      stock: "",
      rating: "",
      image: null,
    });
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const response = await fetch(`http://localhost:4000/api/product/${id}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        
        if (!response.ok) throw new Error("Failed to delete product");
        
        setProducts((prev) => prev.filter((p) => p.id !== id));
      } catch (error) {
        console.error("Error deleting product:", error);
        alert("Failed to delete product. Please try again.");
      }
    }
  };

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      const res = await fetch(`http://localhost:4000/api/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });
      
      if (!res.ok) throw new Error("Failed to update order status");
      
      // Update local state
      setOrders((prev) =>
        prev.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order))
      );
      
      // Update selected order if it's the same order
      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder(prev => ({ ...prev, status: newStatus }));
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      alert("Failed to update order status. Please try again.");
    }
  };

  const handleDeleteOrder = async (orderId) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      try {
        const res = await fetch(`http://localhost:4000/api/orders/${orderId}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        
        if (!res.ok) throw new Error("Failed to delete order");
        
        // Update local state
        setOrders((prev) => prev.filter((order) => order.id !== orderId));
        
        // Close modal if the deleted order was selected
        if (selectedOrder && selectedOrder.id === orderId) {
          setShowOrderDetailsModal(false);
          setSelectedOrder(null);
        }
      } catch (error) {
        console.error("Error deleting order:", error);
        alert("Failed to delete order. Please try again.");
      }
    }
  };

  const handleViewOrderDetails = (order) => {
    setSelectedOrder(order);
    setShowOrderDetailsModal(true);
  };

  const refreshOrders = useCallback(async () => {
    try {
      const res = await fetch("http://localhost:4000/api/orders", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!res.ok) throw new Error("Failed to fetch orders");
      const data = await res.json();
      setOrders(data.data || []);
    } catch (err) {
      console.error("Error refreshing orders:", err);
    }
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/product", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data.data || []);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    const fetchOrders = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/orders", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (!res.ok) throw new Error("Failed to fetch orders");
        const data = await res.json();
        setOrders(data.data || []);
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };

    const fetchCategories = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/category", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (!res.ok) throw new Error("Failed to fetch categories");
        const data = await res.json();
        setCategories(data.data || []);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };

    fetchProducts();
    fetchOrders();
    fetchCategories();
  }, []);

  const DashboardContent = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} stat={stat} />
        ))}
      </div>
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-white">
            <ShoppingCart className="h-6 w-6 mr-2 text-[#8ec06c]" />
            Recent Orders
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Items
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Time
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.slice(0, 4).map((order) => (
                <OrderRow
                  key={order.id}
                  order={order}
                  onViewDetails={handleViewOrderDetails}
                  onDelete={handleDeleteOrder}
                />
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
          Product Management
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
          <ProductCard
            key={product?.id}
            item={product}
            onEdit={handleEditProduct}
            onDelete={handleDeleteProduct}
          />
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
          <button
            onClick={refreshOrders}
            className="px-4 py-2 bg-[#8ec06c] text-white rounded-lg hover:bg-[#7aa359] transition-colors"
          >
            Refresh Orders
          </button>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-lg overflow-hidden p-6 w-full max-w-[1400px] mx-auto">
        <div className="overflow-x-auto">
          <table className="w-full text-base">
            <thead className="bg-green-50">
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
                .filter((order) => {
                  switch (orderFilter) {
                    case "pending":
                      return order.status === "pending";
                    case "processing":
                      return order.status === "processing";
                    case "shipped":
                      return order.status === "shipped";
                    case "completed":
                      return order.status === "completed";
                    default:
                      return true;
                  }
                })
                .map((order) => (
                  <OrderRow
                    key={order.id}
                    order={order}
                    onViewDetails={handleViewOrderDetails}
                    onDelete={handleDeleteOrder}
                  />
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: TrendingUp },
    { id: "products", label: "Products", icon: Package },
    { id: "orders", label: "Orders", icon: ShoppingCart },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#ffffff" }}>
      <div className="fixed inset-y-0 left-0 w-64 bg-[#f3f8e9] shadow-2xl border-r border-green-100">
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
                    ? "bg-[#8ec06c] text-white shadow-lg"
                    : "text-gray-700 hover:bg-green-100 hover:text-[#8ec06c]"
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
        <header className="bg-[#a4d57c] shadow-lg border-b border-green-100">
          <div className="px-8 py-6 flex items-center justify-between">
            <h1 className="text-3xl font-bold text-white">
              {navItems.find((item) => item.id === activeTab)?.label || "Sippure"}
            </h1>
          </div>
        </header>
        <main className="p-8 bg-[#f3f8e9]">
          {activeTab === "dashboard" && <DashboardContent />}
          {activeTab === "products" && <ProductsContent />}
          {activeTab === "orders" && <OrdersContent />}
        </main>
      </div>
      <AddProductScreen
        showAddProductModal={showAddProductModal}
        setShowAddProductModal={setShowAddProductModal}
        editingProduct={editingProduct}
        setEditingProduct={setEditingProduct}
        newProduct={newProduct}
        handleChange={handleChange}
        handleAddProduct={handleAddProduct}
        handleUpdateProduct={handleUpdateProduct}
        resetProductForm={resetProductForm}
        categories={categories}
      />
      {selectedOrder && (
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
              <p>
                <strong>Name:</strong> {selectedOrder.user ? `${selectedOrder.user.firstName || ''} ${selectedOrder.user.lastName || ''}`.trim() : 'Unknown Customer'}
              </p>
              <p>
                <strong>Email:</strong> {selectedOrder.user?.email || 'N/A'}
              </p>
              {selectedOrder.user?.phone && (
                <p>
                  <strong>Phone:</strong> {selectedOrder.user.phone}
                </p>
              )}
              {selectedOrder.user?.address && (
                <p>
                  <strong>Address:</strong> {selectedOrder.user.address}
                </p>
              )}
              <p>
                <strong>Order Number:</strong> {selectedOrder.orderNumber || 'N/A'}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-2">Order Details</h4>
              <p>
                <strong>Date:</strong> {selectedOrder.createdAt ? new Date(selectedOrder.createdAt).toLocaleDateString() : 'N/A'}
              </p>
              <p>
                <strong>Time:</strong> {selectedOrder.createdAt ? new Date(selectedOrder.createdAt).toLocaleTimeString() : 'N/A'}
              </p>
              <p>
                <strong>Payment Method:</strong> {selectedOrder.paymentMethod || 'N/A'}
              </p>
              {selectedOrder.shippingAddress && (
                <p>
                  <strong>Shipping Address:</strong> {selectedOrder.shippingAddress}
                </p>
              )}
              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${
                    selectedOrder.status === "completed"
                      ? "bg-green-100 text-green-800"
                      : selectedOrder.status === "pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : selectedOrder.status === "processing"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-purple-100 text-purple-800"
                  }`}
                >
                  {selectedOrder.status}
                </span>
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-2">Items Ordered</h4>
              <div className="space-y-2">
                {selectedOrder.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span>
                      {item.product?.name} x{item.quantity}
                    </span>
                    <span className="font-medium">RS {(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between items-center font-bold text-lg">
                  <span>Total:</span>
                  <span className="text-amber-600">
                    RS {selectedOrder.totalAmount ? Number(selectedOrder.totalAmount).toFixed(2) : "0.00"}
                  </span>
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
              {selectedOrder.status === "pending" && (
                <button
                  onClick={() => {
                    handleUpdateOrderStatus(selectedOrder.id, "processing");
                    setShowOrderDetailsModal(false);
                  }}
                  className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-4 rounded-lg transition-colors"
                >
                  Start Processing
                </button>
              )}
              {selectedOrder.status === "processing" && (
                <button
                  onClick={() => {
                    handleUpdateOrderStatus(selectedOrder.id, "shipped");
                    setShowOrderDetailsModal(false);
                  }}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
                >
                  Ship Order
                </button>
              )}
              {selectedOrder.status === "shipped" && (
                <button
                  onClick={() => {
                    handleUpdateOrderStatus(selectedOrder.id, "completed");
                    setShowOrderDetailsModal(false);
                  }}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors"
                >
                  Mark Complete
                </button>
              )}
              {selectedOrder.status !== "completed" && selectedOrder.status !== "cancelled" && (
                <button
                  onClick={() => {
                    handleUpdateOrderStatus(selectedOrder.id, "cancelled");
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
      )}
    </div>
  );
};

export default Admindashboard;


