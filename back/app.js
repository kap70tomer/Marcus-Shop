//import Controllers Api.
const shoppingCartController = require("./controllers/shopping-cart-controller");
const categoriesController = require("./controllers/categories-controller");
const cartItemsController = require("./controllers/cart-items-controller");
const productsController = require("./controllers/products-controller");
const ordersController = require("./controllers/orders-controller");
const usersController = require("./controllers/users-controller");

//import server routing Module.
const express = require("express");
const cors = require("cors");
const fs = require("fs");

const server = express();

if (!fs.existsSync("./uploads")) { // create "/uploads" folder if not exist.
    fs.mkdirSync("./uploads");
}

//import Middleware
const loginFilter = require('./middleware/login-filter');
const errorHandler = require('./errors/error-handler');
const fileUpload = require("express-fileupload");

// Registering the file upload middleware
server.use(fileUpload());
server.use(cors());

//Set data type for server use.
server.use(express.json());
//Server static public folder.products pics.
server.use(express.static('uploads'));
//Set server usage of jwt middleware tech Filter
server.use(loginFilter());

// The relative route for handling categories: 
server.use("/categories", categoriesController);

// The relative route for handling shopping carts: 
server.use("/carts", shoppingCartController);

// The relative route for handling products: 
server.use("/products", productsController);

// The relative route for handling cart items: 
server.use("/items", cartItemsController);

// The relative route for handling orders: 
server.use("/orders", ordersController);

// The relative route for handling users: 
server.use("/users", usersController);

//last handler to ansure 'next' after controller will get here.
server.use(errorHandler);

server.listen(3000, () => {
    console.log("Listening on http://localhost:3000");
});//Start server on Port 3000 local PC.