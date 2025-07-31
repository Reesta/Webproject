import { Order, OrderItem, Tea, User } from "../../models/index.js";
import { sendOrderConfirmationEmail, sendOrderStatusUpdateEmail } from "../../utils/emailService.js";
import { v4 as uuidv4 } from "uuid";

/**
 * Create a new order
 * @param {Object} req - Request object containing order data
 * @param {Object} res - Response object
 */
const createOrder = async (req, res) => {
  try {
    const { items, shippingAddress, paymentMethod } = req.body;
    // Access user ID from the nested user object in the token
    const userId = req.user.user ? req.user.user.id : req.user.id; // Handle both token structures
    
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "Order must include at least one item" });
    }
    
    // Calculate total amount and validate items
    let totalAmount = 0;
    const orderItems = [];
    
    for (const item of items) {
      // Validate required fields
      if (!item.productId || !item.quantity || item.quantity <= 0) {
        return res.status(400).json({ error: "Each item must have a valid productId and quantity" });
      }
      
      // Get product to confirm price
      const product = await Tea.findByPk(item.productId);
      if (!product) {
        return res.status(404).json({ error: `Product with ID ${item.productId} not found` });
      }
      
      // Calculate subtotal for this item
      const price = product.price;
      const subtotal = price * item.quantity;
      totalAmount += subtotal;
      
      // Add to order items array
      orderItems.push({
        productId: item.productId,
        quantity: item.quantity,
        price: price,
        subtotal: subtotal
      });
    }
    
    // Generate unique order number
    const orderNumber = `ORD-${Date.now().toString().slice(-6)}-${uuidv4().slice(0, 6).toUpperCase()}`;
    
    // Get user info to populate customer fields
    const user = await User.findByPk(userId);
    
    // Create the order
    const order = await Order.create({
      userId,
      orderNumber,
      totalAmount,
      status: "pending",
      shippingAddress,
      paymentMethod,
      paymentStatus: "pending",
      customerName: user ? `${user.firstName} ${user.lastName}` : null,
      customerEmail: user ? user.email : null,
      customerPhone: user ? user.phone : null,
      customerAddress: user ? user.address : null
    });
    
    // Create order items linked to the order
    for (const item of orderItems) {
      await OrderItem.create({
        orderId: order.id,
        ...item
      });
    }
    
    // Get the created order with items
    const completeOrder = await Order.findByPk(order.id, {
      include: [{
        model: OrderItem,
        as: "items",
        include: [{
          model: Tea,
          as: "product"
        }]
      }, {
        model: User,
        as: "user",
        attributes: ["id", "firstName", "lastName", "email", "phone", "address"]
      }]
    });
    
    // Send confirmation email
    if (user && user.email) {
      await sendOrderConfirmationEmail(
        completeOrder, 
        user, 
        completeOrder.items
      );
    }
    
    // Return the created order
    res.status(201).json({
      data: completeOrder,
      message: "Order created successfully"
    });
    
  } catch (err) {
    console.error("Error creating order:", err);
    res.status(500).json({ error: `Failed to create order: ${err.message}` });
  }
};

/**
 * Get all orders for the current user
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
const getUserOrders = async (req, res) => {
  try {
    // Handle both token structures for user ID
    const userId = req.user.user ? req.user.user.id : req.user.id;
    
    const orders = await Order.findAll({
      where: { userId },
      include: [{
        model: OrderItem,
        as: "items",
        include: [{
          model: Tea,
          as: "product"
        }]
      }, {
        model: User,
        as: "user",
        attributes: ["id", "firstName", "lastName", "email", "phone", "address"]
      }],
      order: [["createdAt", "DESC"]]
    });
    
    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found" });
    }
    
    res.status(200).json({
      data: orders,
      message: "Orders fetched successfully"
    });
    
  } catch (err) {
    console.error("Error fetching user orders:", err);
    res.status(500).json({ error: `Failed to fetch orders: ${err.message}` });
  }
};

/**
 * Get a specific order by ID
 * @param {Object} req - Request object with order ID
 * @param {Object} res - Response object
 */
const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    // Handle both token structures for user ID
    const userId = req.user.user ? req.user.user.id : req.user.id;
    // Handle both token structures for role check
    const userRole = req.user.user ? req.user.user.role : req.user.role;
    
    // Admin can view any order, regular users can only view their own orders
    const whereClause = userRole === 'admin' ? { id } : { id, userId };
    
    const order = await Order.findOne({
      where: whereClause,
      include: [{
        model: OrderItem,
        as: "items",
        include: [{
          model: Tea,
          as: "product"
        }]
      }, {
        model: User,
        as: "user",
        attributes: ["id", "firstName", "lastName", "email", "phone", "address"]
      }]
    });
    
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    
    res.status(200).json({
      data: order,
      message: "Order fetched successfully"
    });
    
  } catch (err) {
    console.error("Error fetching order:", err);
    res.status(500).json({ error: `Failed to fetch order: ${err.message}` });
  }
};

/**
 * Get all orders (admin only)
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
const getAllOrders = async (req, res) => {
  try {
    // Only admins can access all orders
    // Handle both token structures for admin role check
    const userRole = req.user.user ? req.user.user.role : req.user.role;
    if (userRole !== 'admin') {
      return res.status(403).json({ error: "Access denied. Admin role required." });
    }
    
    const orders = await Order.findAll({
      include: [{
        model: OrderItem,
        as: "items",
        include: [{
          model: Tea,
          as: "product"
        }]
      }, {
        model: User,
        as: "user",
        attributes: ["id", "firstName", "lastName", "email", "phone", "address"] // Include user fields
      }],
      order: [["createdAt", "DESC"]]
    });
    
    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found" });
    }
    
    res.status(200).json({
      data: orders,
      message: "All orders fetched successfully"
    });
    
  } catch (err) {
    console.error("Error fetching all orders:", err);
    res.status(500).json({ error: `Failed to fetch orders: ${err.message}` });
  }
};

/**
 * Update order status
 * @param {Object} req - Request object with order ID and new status
 * @param {Object} res - Response object
 */
const updateOrderStatus = async (req, res) => {
  try {
    // Only admins can update order status
    // Handle both token structures for admin role check
    const userRole = req.user.user ? req.user.user.role : req.user.role;
    if (userRole !== 'admin') {
      return res.status(403).json({ error: "Access denied. Admin role required." });
    }
    
    const { id } = req.params;
    const { status } = req.body;
    
    // Validate status
    const validStatuses = ["pending", "processing", "shipped", "delivered", "cancelled", "completed"];
    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({ error: "Invalid status value" });
    }
    
    // Find the order
    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    
    // Store previous status for email notification
    const previousStatus = order.status;
    
    // Update the status
    order.status = status;
    await order.save();
    
    // Get the updated order with items and user
    const updatedOrder = await Order.findByPk(id, {
      include: [{
        model: OrderItem,
        as: "items",
        include: [{
          model: Tea,
          as: "product"
        }]
      }, {
        model: User,
        as: "user",
        attributes: ["id", "firstName", "lastName", "email", "phone", "address"]
      }]
    });
    
    // Send status update email
    if (updatedOrder.user && updatedOrder.user.email && previousStatus !== status) {
      await sendOrderStatusUpdateEmail(
        updatedOrder,
        updatedOrder.user,
        previousStatus
      );
    }
    
    res.status(200).json({
      data: updatedOrder,
      message: "Order status updated successfully"
    });
    
  } catch (err) {
    console.error("Error updating order status:", err);
    res.status(500).json({ error: `Failed to update order status: ${err.message}` });
  }
};

/**
 * Delete an order (admin only)
 * @param {Object} req - Request object with order ID
 * @param {Object} res - Response object
 */
const deleteOrder = async (req, res) => {
  try {
    // Only admins can delete orders
    // Handle both token structures for admin role check
    const userRole = req.user.user ? req.user.user.role : req.user.role;
    if (userRole !== 'admin') {
      return res.status(403).json({ error: "Access denied. Admin role required." });
    }
    
    const { id } = req.params;
    
    // Find the order
    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    
    // Delete order items first (due to foreign key constraints)
    await OrderItem.destroy({
      where: { orderId: id }
    });
    
    // Delete the order
    await order.destroy();
    
    res.status(200).json({
      message: "Order deleted successfully"
    });
    
  } catch (err) {
    console.error("Error deleting order:", err);
    res.status(500).json({ error: `Failed to delete order: ${err.message}` });
  }
};

export const orderController = {
  createOrder,
  getUserOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
  deleteOrder
};
