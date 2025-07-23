import { User } from "./user/User.js";
import { Category } from "./category/Category.js";
import { Tea } from "./product/Product.js";
import { Order } from "./order/Order.js";
import { OrderItem } from "./order/OrderItem.js";

// User associations
User.hasMany(Order, { foreignKey: 'userId', as: 'orders' });
Order.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// Product associations
Tea.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });
Category.hasMany(Tea, { foreignKey: 'categoryId', as: 'products' });

Tea.hasMany(OrderItem, { foreignKey: 'productId', as: 'orderItems' });
OrderItem.belongsTo(Tea, { foreignKey: 'productId', as: 'product' });

// Order associations
Order.hasMany(OrderItem, { foreignKey: 'orderId', as: 'items' });
OrderItem.belongsTo(Order, { foreignKey: 'orderId', as: 'order' });

export default {
  User,
  Category,
  Tea,
  Order,
  OrderItem
};