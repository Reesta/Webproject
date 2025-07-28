import { Tea } from "../../models/product/Product.js";
import fs from "fs";
import path from "path";
import { Category } from "../../models/index.js";

/**
 * add new product
 * @param {Object} req - The request object containg the product data
 * @param {Object} res - The response object to send the result
 */

const addProduct = async (req, res) => {
  try {
    const existingProduct = await Tea.findOne({
      where: { name: req.body.name },
    });
    if (existingProduct) {
      return res.status(500).json({ error: "Product already exists!" });
    }
    
    const product = await Tea.create({
      ...req.body,
      image: req.file?.filename,
    });
  
    return res
      .status(201)
      .json({ data: product, message: "Product added successfully!" });
  } catch (err) {
    console.error("Error adding product", err);
    res.status(500).json({ error: `Failed to add product: ${err.message}` });
  }
};

/**
 * get all products
 */

const getAllProducts = async (req, res) => {
  try {
    const products = await Tea.findAll({
      include: [{
        model: Category,
        as: "category",
        attributes: ["id", "name"]
      }]
    });
    
    if (!products || products.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }
    
    const formattedProducts = products.map((product) => {
      const productJson = product.toJSON();
      return {
        ...productJson,
        image: productJson.image
          ? `${process.env.SERVER_URL}/${productJson.image}`
          : null,
      };
    });
    
    res.status(200).json({
      data: formattedProducts,
      message: "Products fetched successfully",
    });
  } catch (err) {
    console.error("Error fetching products", err);
    res.status(500).json({ error: `Failed to fetch products: ${err.message}` });
  }
};

/**
 * get product by category
 */

const getProductByCategory = async (req, res) => {
  try {
    const { category } = req.query;
    if (!category) {
      return res.status(400).json({ error: "Category is required" });
    }
    
    
    const products = await Tea.findAll({
      where: { categoryId: category },
      include: [{
        model: Category,
        as: "category",
        attributes: ["id", "name"]
      }]
    });
    
    if (!products || products.length === 0) {
      return res
        .status(404)
        .json({ message: "No products found in this category" });
    }
    
    const formattedProducts = products.map((product) => {
      const productJson = product.toJSON();
      return {
        ...productJson,
        image: productJson.image
          ? `${process.env.SERVER_URL}/${productJson.image}`
          : null,
      };
    });
    
    res.status(200).json({
      data: formattedProducts,
      message: "Products by category fetched successfully",
    });
  } catch (err) {
    console.error("Error fetching products by category", err);
    res.status(500).json({ error: `Failed to fetch products: ${err.message}` });
  }
};

/**
 * get product by id
 */

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Tea.findByPk(id, {
      include: [{
        model: Category,
        as: "category",
        attributes: ["id", "name"]
      }]
    });
    
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    
    const productJson = product.toJSON();
    const formattedProduct = {
      ...productJson,
      image: productJson.image
        ? `${process.env.SERVER_URL}/${productJson.image}`
        : null,
    };
    
    res.status(200).json({
      data: formattedProduct,
      message: "Product fetched successfully",
    });
  } catch (err) {
    console.error("Error fetching product by ID", err);
    res.status(500).json({ error: `Failed to fetch product: ${err.message}` });
  }
};

/**
 * delete product by id
 */

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Tea.findByPk(id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Delete the image file if it exists
    if (product.image) {
      const imagePath = path.join("uploads", product.image);

      // Check if file exists before attempting to delete
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
        console.log(`Deleted image file: ${imagePath}`);
      }
    }

    await product.destroy();
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error("Error deleting product", err);
    res.status(500).json({ error: `Failed to delete product: ${err.message}` });
  }
};

/**
 * update product
 */

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Tea.findByPk(id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    const updatedData = {
      ...req.body,
      image: req.file ? req.file.filename : product.image,
    };

    await product.update(updatedData);
    res.status(200).json({
      data: product,
      message: "Product updated successfully",
    });
  } catch (err) {
    console.error("Error updating product", err);
    res.status(500).json({ error: `Failed to update product: ${err.message}` });
  }
};

export const productController = {
  addProduct,
  getAllProducts,
  getProductByCategory,
  getProductById,
  deleteProduct,
  updateProduct,
};
