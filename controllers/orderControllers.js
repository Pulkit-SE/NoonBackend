const Order = require("../models/OrderDetails");
const User = require("../models/UserDetails");
const Restaurant = require("../models/RestaurantDetails");

exports.createOrder = async (req, res) => {
  const { restaurantId, items, totalAmount } = req.body;
  console.log("rest", restaurantId);
  try {
    // Find the user and restaurant
    const id = req.user; // Get the userId from the validated token
    console.log("req.user.userId", req.user);
    const user = await User.findOne({ _id: id });
    const restaurant = await Restaurant.findById(restaurantId);

    if (!user || !restaurant) {
      throw new Error("User or Restaurant not found");
    }

    // Create the order
    const order = new Order({
      user: id, // Link the order to the user
      restaurant: restaurantId, // Link the order to the restaurant
      items,
      totalAmount,
    });

    order.status = "Success";

    // Save the order
    await order.save();

    // Add the order to the user's orders array
    user.orders.push(order._id);
    await user.save();

    // Add the order to the restaurant's orders array (optional)
    restaurant.orders.push(order._id);
    await restaurant.save();

    console.log("Order created successfully:", order);
    res.json({ status: "ok", data: order });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ status: "error", message: error.message });
  }
};

exports.orderDetails = async (req, res) => {
  const { orders = [] } = req.body;
  console.log("rest", orders);
  try {
    // Find the user and restaurant
    const id = req.user; // Get the userId from the validated token
    console.log("req.user.userId", req.user);
    const user = await User.findOne({ _id: id });

    if (!user && !orderId) {
      throw new Error("User or Order not found");
    }

    // Fetch the orders
    const orders = await Order.findById({ _id: orderId });

    console.log("xxx orders", orders);

    res.json({ status: "ok", data: orders });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ status: "error", message: error.message });
  }
};
