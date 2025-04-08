const mongoose = require("mongoose");
const Restaurant = require("../models/RestaurantDetails"); // Adjust the path to your model

// Connect to MongoDB
mongoose
  .connect("mongodb+srv://noonuser:noonuser@cluster0.vvw0x.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    // Run the migration
    return migrateRestaurants();
  })
  .then(() => {
    console.log("Migration completed successfully");
    mongoose.connection.close(); // Close the connection
  })
  .catch((err) => {
    console.error("Error during migration:", err);
    mongoose.connection.close(); // Close the connection
  });

// Migration function
const migrateRestaurants = async () => {
  try {
    // Find all restaurants without the `orders` field
    const restaurants = await Restaurant.find({ orders: { $exists: false } });

    // Add an empty `orders` array to each restaurant
    for (const restaurant of restaurants) {
      restaurant.orders = []; // Set the new field
      await restaurant.save(); // Save the updated document
      console.log(`Updated restaurant: ${restaurant._id}`);
    }

    console.log(`Updated ${restaurants.length} restaurants`);
  } catch (error) {
    console.error("Error migrating restaurants:", error);
    throw error;
  }
};