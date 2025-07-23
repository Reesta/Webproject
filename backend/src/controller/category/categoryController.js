import { Category } from "../../models/category/Category.js";
import { Tea } from "../../models/index.js";

/**
 * add new category
 * @param {Object} req - The request object containing the category data.
 * @param {Object} res - The response object to send the result.
 */

const addCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    // Validate the input
    if (!name || !description) {
      return res
        .status(400)
        .json({ error: "Category name & description is required" });
    }

    const existingCategory = await Category.findOne({
      where: { name },
    });
    if (existingCategory) {
      return res.status(400).json({ error: "Category already exists" });
    }

    // Create the new category
    const newCategory = await Category.create({ name, description });

    res.status(201).json({
      data: newCategory,
      message: "Category created successfully",
    });
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).json({ error: "Failed to create category" });
  }
};

/**
 * get all categories
 * @param {Object} req - The request object.
 * @param {Object} res - The response object to send the result.
 */

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll({ raw: true });
    if (!categories || categories.length === 0) {
      return res.status(404).json({ message: "No categories found" });
    }

    const formattedCategories = await Promise.all(
      categories.map(async (category) => {
        const productsCount = await Tea.count({
          where: {
            categoryId: category.id,
          },
        });

        return {
          ...category,
          productsCount: productsCount || 0, // Default to 0 if no products found
        };
      })
    );

    res.status(200).json({
      data: formattedCategories,
      message: "Categories fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ error: "Failed to fetch categories" });
  }
};

/** * get category by ID
 * @param {Object} req - The request object containing the category ID.
 * @param {Object} res - The response object to send the result.
 */

const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    res
      .status(200)
      .json({ data: category, message: "Category fetched successfully" });
  } catch (error) {
    console.error("Error fetching category:", error);
    res.status(500).json({ error: "Failed to fetch category" });
  }
};

/** * delete category
 * @param {Object} req - The request object containing the category ID.
 * @param {Object} res - The response object to send the result.
 */

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    // Find the category by ID
    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    // Delete the category
    await category.destroy();
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).json({ error: "Failed to delete category" });
  }
};

/** * update existing category
 * @param {Object} req - The request object containing the category ID and new data.
 * @param {Object} res - The response object to send the result.
 */

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    // Validate the input
    if (!name || !description) {
      return res
        .status(400)
        .json({ error: "Category name & description is required" });
    }

    // Find the category by ID
    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    // Update the category
    category.name = name;
    category.description = description;
    await category.save();

    res
      .status(200)
      .json({ data: category, message: "Category updated successfully" });
  } catch (error) {
    console.error("Error updating category:", error);
    res.status(500).json({ error: "Failed to update category" });
  }
};

export const categoryController = {
  addCategory,
  getAllCategories,
  getCategoryById,
  deleteCategory,
  updateCategory,
};
