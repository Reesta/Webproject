import { DataTypes } from "sequelize";
import { sequelize } from "../../config/database.js";

export const OrderItem = sequelize.define(
  "OrderItem",
  {
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Orders",
        key: "id",
      },
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Teas",
        key: "id",
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    subtotal: {
      type: DataTypes.FLOAT,
      allowNull: false,
    }
  },
  {
    sequelize,
    modelName: "OrderItem",
    timestamps: true,
  }
);