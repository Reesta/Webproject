import { DataTypes } from "sequelize";
import { sequelize } from "../../config/database.js";
import { Category } from "../category/Category.js";

export const Tea = sequelize.define(
  "Tea",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Categories", // The table name in the database
        key: "id",
      },
      allowNull: true, // Every coffee dessert needs a category
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    ingredients: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    brewTime: {
      type: DataTypes.STRING,
      allowNull: true, // Brew time can be optional
    },
    caffeine: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    temperature: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    nutritionalInfo: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    preparationSteps: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Tea",
    timestamps: true,
  }
);