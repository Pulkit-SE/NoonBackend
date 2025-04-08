const mongoose = require("mongoose");
require("dotenv").config();

const Restaurant = require("../models/RestaurantDetails");

// Static data to insert
const staticRestaurants = [
  {
    name: 'Kinoki',
    id: 1,
    description: 'A pan asian restaurant',
    rating: '4.5',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSeeLiytIhEzR_s5fBzWl2Va0s1jy5gseyhA&s',
    menu: [
      {
        title: 'Sushi',
        maxItems: 5,
        price: '$5',
        qty: 0,
        image:
          'https://www.licious.in/blog/wp-content/uploads/2022/04/shutterstock_1617156526-min.jpg',
      },
      {
        title: 'Bao',
        maxItems: 2,
        price: '$9',
        qty: 0,
        image:
          'https://breadtopia.com/wp-content/uploads/2022/09/20220831_132211-scaled.jpg',
      },
      {
        title: 'Burger',
        maxItems: 2,
        price: '$3.99',
        qty: 0,
        image:
          'https://assets.epicurious.com/photos/5c745a108918ee7ab68daf79/1:1/w_2560%2Cc_limit/Smashburger-recipe-120219.jpg',
      },
    ],
  },
  {
    name: 'McDonalds',
    id: 2,
    description: 'A fast food chain',
    rating: '4.2',
    image:
      'https://resize.indiatvnews.com/en/resize/newbucket/1200_-/2017/06/mcdonalds-sign-1497007560.jpg',
    menu: [
      {
        title: 'Pizza',
        maxItems: 8,
        price: '$2.99',
        qty: 0,
        image:
          'https://hips.hearstapps.com/hmg-prod/images/classic-cheese-pizza-recipe-2-64429a0cb408b.jpg?crop=0.6666666666666667xw:1xh;center,top&resize=1200:*',
      },
      {
        title: 'Fries',
        maxItems: 10,
        price: '$1.99',
        qty: 0,
        image:
          'https://www.recipetineats.com/tachyon/2022/09/Crispy-Fries_8.jpg',
      },
      {
        title: 'Roll',
        maxItems: 1,
        price: '$3.99',
        qty: 0,
        image:
          'https://ministryofcurry.com/wp-content/uploads/2023/11/Kolkatta-Egg-Roll-4.jpg',
      },
    ],
  },
  {
    name: 'Burger King',
    id: 3,
    description: 'A fast food chain',
    rating: '4.6',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Burger_King_2020.svg/1200px-Burger_King_2020.svg.png',
    menu: [
      {
        title: 'Fries',
        maxItems: 8,
        price: '$1.23',
        qty: 0,
        image:
          'https://www.licious.in/blog/wp-content/uploads/2022/04/shutterstock_1617156526-min.jpg',
      },
      {
        title: 'Burger',
        maxItems: 6,
        price: '$7',
        qty: 0,
        image:
          'https://www.licious.in/blog/wp-content/uploads/2022/04/shutterstock_1617156526-min.jpg',
      },
      {
        title: 'Cold drink',
        maxItems: 2,
        price: '$0.99',
        qty: 0,
        image:
          'https://www.licious.in/blog/wp-content/uploads/2022/04/shutterstock_1617156526-min.jpg',
      },
      {
        title: 'Wrap',
        maxItems: 2,
        price: '$4.99',
        qty: 0,
        image:
          'https://www.licious.in/blog/wp-content/uploads/2022/04/shutterstock_1617156526-min.jpg',
      },
      {
        title: 'Garlic bread',
        maxItems: 4,
        price: '$11.99',
        qty: 0,
        image:
          'https://www.licious.in/blog/wp-content/uploads/2022/04/shutterstock_1617156526-min.jpg',
      },
    ],
  },
  {
    name: 'Burgrill',
    id: 5,
    description:
      'A fast food restaurant for burgers. We are specialised in creating outstanding burgers and fries',
    rating: '4.8',
    image: 'https://burgrill.in/uploads/24125ffad7b077fe68764aebdae504ce.jpg',
    menu: [
      {
        title: 'Burger',
        maxItems: 5,
        price: '$5',
        qty: 0,
        image:
          'https://www.licious.in/blog/wp-content/uploads/2022/04/shutterstock_1617156526-min.jpg',
      },
      {
        title: 'Fries',
        maxItems: 2,
        price: '$2',
        qty: 0,
        image:
          'https://www.licious.in/blog/wp-content/uploads/2022/04/shutterstock_1617156526-min.jpg',
      },
      {
        title: 'Coke',
        maxItems: 1,
        price: '$3.99',
        qty: 0,
        image:
          'https://www.licious.in/blog/wp-content/uploads/2022/04/shutterstock_1617156526-min.jpg',
      },
    ],
  },
  // Add more static data here
];

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    // Insert static data
    return Restaurant.insertMany(staticRestaurants);
  })
  .then(() => {
    console.log("Static data inserted successfully");
    mongoose.connection.close(); // Close the connection
  })
  .catch((err) => {
    console.error("Error inserting static data:", err);
    mongoose.connection.close(); // Close the connection
  });
