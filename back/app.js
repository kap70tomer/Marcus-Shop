//import Apps Controllers .
const shoppingCartController = require("./controllers/shopping-cart-controller");
const categoriesController = require("./controllers/categories-controller");
const cartItemsController = require("./controllers/cart-items-controller");
const productsController = require("./controllers/products-controller");
const ordersController = require("./controllers/orders-controller");
const usersController = require("./controllers/users-controller");

//import Apps Middlewares.
const loginFilter = require('./middleware/login-filter');
const errorHandler = require('./errors/error-handler');
const fileUpload = require("express-fileupload");

//import server depedencies libarys.
const express = require("express");
const cors = require("cors");
const fs = require("fs");

// @@var server<EXPRESS> an Express application. The express() function is a top-level function exported by the express module. main enviroment of Node.js.
// use to built REST api aka CRUD, (request, response, next()) => {chained middleware structure}.
const server = express();

//Set App to JSON usage only.
server.use(express.json());


//Express built-in file upload middleware.
server.use(fileUpload());

//Cross Origin Source requests allowed.
server.use(cors());

// Create App's uploads folder,served at:"api/uploads",if doesnt exist.
// using interaction with machine's files system.
if (!fs.existsSync("./uploads")) { 
    fs.mkdirSync("./uploads");
}

//App static assets folder. served on : 'api/uploads'.
server.use(express.static('uploads'));

//App Users Authentication Filter json-web-token. must be authenticated user to use the api.
server.use(loginFilter());

// Route for handling categories: 'api/categories/' ~> Categories Controller.
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

//located last errors handler to ansure 'next' after controller will get here and catch if ane exepction is thrown by the controllers.
server.use(errorHandler);

server.listen(3000, () => {
    console.log("Listening on http://localhost:3000");
});//Start server on Port 3000 local PC.