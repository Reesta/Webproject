import { DataTypes } from "sequelize";
import { sequelize } from "../../config/database.js";

export const Order = sequelize.define(
  "Order",
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
    },
    

    orderNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    totalAmount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("pending", "processing", "shipped", "delivered", "cancelled", "completed"),
      defaultValue: "pending",
    },
    shippingAddress: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    paymentMethod: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    paymentStatus: {
      type: DataTypes.ENUM("pending", "paid", "failed"),
      defaultValue: "pending",
    },
    customerName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    customerEmail: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    customerPhone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    customerAddress: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Order",
    timestamps: true,
  }
);