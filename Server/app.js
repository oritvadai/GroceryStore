require("./data-access-layer/dal");
const express = require("express");
const cors = require("cors");
const usersController = require("./controllers/users-controller");
const categoriesController = require("./controllers/categories-controller");
const productsController = require("./controllers/products-controller");
const cartsController = require("./controllers/carts-controller");
const itemsController = require("./controllers/items-controller");
const ordersController = require("./controllers/orders-controller");

const server = express();

server.use(cors());
server.use(express.json());

server.use("/api/users", usersController);
server.use("/api/categories", categoriesController);
server.use("/api/products", productsController);
server.use("/api/carts", cartsController);
server.use("/api/items", itemsController);
server.use("/api/orders", ordersController);


server.listen(3000, () => console.log("Listening on http://localhost:3000"));