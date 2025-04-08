const Restaurant = require("../models/RestaurantDetails");

exports.getRestaurantList = async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.json({ status: "ok", data: restaurants });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};
