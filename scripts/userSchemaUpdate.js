const mongoose = require("mongoose");
const User = require("../models/UserDetails"); // Adjust the path to your model

// Connect to MongoDB
mongoose
  .connect("mongodb+srv://noonuser:noonuser@cluster0.vvw0x.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    // Run the migration
    return migrateUsers();
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
const migrateUsers = async () => {
  try {
    // Find all users without the `orders` field
    const users = await User.find({ orders: { $exists: false } });

    // Add an empty `orders` array to each user
    for (const user of users) {
      user.orders = []; // Set the new field
      await user.save(); // Save the updated document
      console.log(`Updated user: ${user._id}`);
    }

    console.log(`Updated ${users.length} users`);
  } catch (error) {
    console.error("Error migrating users:", error);
    throw error;
  }
};
