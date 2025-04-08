const express = require("express");

const orderController = require("../controllers/orderControllers");
const authenticateUser = require("../utils/functions");

const router = express.Router();

router.post("/create-order", authenticateUser, orderController.createOrder);
router.post("/details", authenticateUser, orderController.orderDetails);

module.exports = router;
