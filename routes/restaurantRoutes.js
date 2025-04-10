const express = require("express");
const restaurantController = require("../controllers/restaurantController");

const router = express.Router();

router.get("/restaurant-list", restaurantController.getRestaurantList);

module.exports = router;
