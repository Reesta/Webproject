import React, { useEffect, useState } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Modal } from "../../../components/Modal";
import api from "../../../api/axios";

const AdminProductPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    categoryId: "",
    imageUrl: "",
    imageFile: null,
    ingredients: [],
    brewTime: "",
    caffeine: "",
    temperature: "",
    rating: 4.5,
    nutritionalInfo: {
      calories: 0,
      protein: "0g",
      carbs: "0g",
      fat: "0g",
    },
    preparationSteps: [],
  });

  const fetchCategories = async () => {
    try {
      const { data } = await api.get("/category");
      setCategories(data?.data || []);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/product");
      setProducts(data?.data || []);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching products:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const handleAddProduct = async () => {
    try {
      if (!newProduct.name || !newProduct.price || !newProduct.categoryId) {
        alert("Please fill in all required fields");
        return;
      }

      const formData = new FormData();
      formData.append("name", newProduct.name);
      formData.append("description", newProduct.description);
      formData.append("price", newProduct.price);
      formData.append("categoryId", newProduct.categoryId);

      formData.append(
        "preparationSteps",
        JSON.stringify(newProduct.preparationSteps || [])
      );

      if (newProduct.imageFile) {
        formData.append("image", newProduct.imageFile);
      } else if (newProduct.imageUrl) {
        formData.append("image", newProduct.imageUrl);
      }

      await api.post("/product", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setShowModal(false);
      resetForm();
      fetchProducts();
      alert("Product added successfully!");
    } catch (err) {
      console.error("Error adding product:", err);
      alert(
        `Failed to add product: ${err.response?.data?.error || err.message}`
      );
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setNewProduct({
      name: product.name,
      description: product.description,
      price: product.price,
      categoryId: product.categoryId,
      imageUrl: product.image,
      imageFile: null,
    });
    setShowModal(true);
  };

  const handleUpdateProduct = async () => {
    try {
      if (!newProduct.name || !newProduct.price || !newProduct.categoryId) {
        alert("Please fill in all required fields");
        return;
      }

      const formData = new FormData();
      formData.append("name", newProduct.name);
      formData.append("description", newProduct.description);
      formData.append("price", newProduct.price);
      formData.append("categoryId", newProduct.categoryId);

      if (newProduct.imageFile) {
        formData.append("image", newProduct.imageFile);
      } else if (
        newProduct.imageUrl &&
        !newProduct.imageUrl.includes(import.meta.env.VITE_BASE_URL)
      ) {
        formData.append("image", newProduct.imageUrl);
      }

      await api.patch(`/product/${editingProduct.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setShowModal(false);
      setEditingProduct(null);
      resetForm();
      fetchProducts();
      alert("Product updated successfully!");
    } catch (err) {
      console.error("Error updating product:", err);
      alert(
        `Failed to update product: ${
          err.response?.data?.error || err.message
        }`
      );
    }
  };

  const handleDeleteProduct = async (id) => {
    const confirmDelete = confirm("Are you sure you want to delete this item?");
    if (!confirmDelete) return;

    try {
      await api.delete(`/product/${id}`);
      fetchProducts();
      alert("Product deleted successfully!");
    } catch (err) {
      console.error("Error deleting product:", err);
      alert(
        `Failed to delete product: ${
          err.response?.data?.error || err.message
        }`
      );
    }
  };

  const resetForm = () => {
    setNewProduct({
      name: "",
      description: "",
      price: "",
      categoryId: "",
      imageUrl: "",
      imageFile: null,
    });
  };

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">
              Product Management
            </h2>
            <p className="text-gray-600 mt-1">
              Manage your product offerings
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="bg-amber-600 hover:bg-amber-700 text-black px-6 py-3 rounded-xl flex items-center space-x-2 shadow-lg transition-all"
          >
            <Plus className="h-5 w-5" />
            <span className="font-medium">Add Product</span>
          </button>
        </div>

        {!loading ? (
          products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-10">
              {products.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-48 object-cover rounded-t-2xl"
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/300x200?text=No+Image";
                    }}
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-1">
                      {item.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-2">
                      {item.description}
                    </p>
                    <p className="text-amber-600 font-semibold mb-2">
                      ${parseFloat(item.price).toFixed(2)}
                    </p>
                    <p className="text-gray-500 text-sm mb-2">
                      Category: {item.category?.name || "N/A"}
                    </p>
                    <div className="flex justify-between items-center mt-4">
                      <button
                        onClick={() => handleEditProduct(item)}
                        className="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg border border-blue-200 hover:bg-blue-100 flex items-center space-x-2"
                      >
                        <Edit className="h-4 w-4" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(item.id)}
                        className="bg-red-50 text-red-600 px-4 py-2 rounded-lg border border-red-200 hover:bg-red-100 flex items-center space-x-2"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-lg mt-10">No products found</div>
          )
        ) : (
          <div className="text-center text-lg mt-10">Loading...</div>
        )}
      </div>

      {/* Add/Edit Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setEditingProduct(null);
          resetForm();
        }}
        name={editingProduct ? "Edit Product" : "Add New Product"}
      >
        <div className="space-y-4">
          <input
            type="text"
            placeholder="name"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
          <textarea
            placeholder="Description"
            value={newProduct.description}
            onChange={(e) =>
              setNewProduct({ ...newProduct, description: e.target.value })
            }
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
          <input
            type="number"
            placeholder="Price"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
          <select
            value={newProduct.categoryId}
            onChange={(e) =>
              setNewProduct({ ...newProduct, categoryId: e.target.value })
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Image URL"
              value={newProduct.imageUrl}
              onChange={(e) =>
                setNewProduct({ ...newProduct, imageUrl: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  imageFile: e.target.files[0],
                  imageUrl: e.target.files[0]
                    ? URL.createObjectURL(e.target.files[0])
                    : newProduct.imageUrl,
                })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          <button
            onClick={editingProduct ? handleUpdateProduct : handleAddProduct}
            className="w-full bg-amber-600 hover:bg-amber-700 text-black py-2 px-4 rounded-lg transition"
          >
            {editingProduct ? "Update Product" : "Add Product"}
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default AdminProductPage;
