const logic = require("../logic/orders-logic");
const mapUser = require("../middleware/map");
const express = require("express");
const router = express.Router();

// Add new/ create:
router.post("/add", async (request, response, next) => {
    
    let token = request.headers.authorization;
    let newOrder = request.body;
    
    newOrder.user_id =+ mapUser.checkMapForUserId(token);
    //get user id from tokens map.by token.
    try {
        await logic.add(newOrder);
        response.status(201).json("Order added"); // 201 - request has been fulfilled
    }
    catch (error) {        
        return next(error);
    };
});

// Get by id: 
router.get("/:id", async (request, response, next) => {
    
    const id = +request.params.id;
    
    try {    
        const getResult = await logic.getBy(id);
        response.status(200).json(getResult); // 200 - successful HTTP requests
    }
    catch (error) {
        return next(error);
    };
});


// Get all orders by user id:                                           later future use options for admin:
router.get("/byUser/:id", async (request, response, next) => {
    
    const id = +request.params.id;
    
    try {    
        const getResult = await logic.getByUser(id);
        response.status(200).json(getResult); // 200 - successful HTTP requests
    }
    catch (error) {
        return next(error);
    };
});


// Update by ID: change order details later admin option.
router.put("/:id", async (request, response, next) => {
    
    const id = +request.params.id;
    const orderToUpdate = request.body;
    // orderToUpdate.id = id;
    
    try {
        await logic.update(orderToUpdate);
        response.status(200).json("Updated!"); // 200 - successful HTTP requests
    }
    catch (error) {
        return next(error);
    };
});

// Delete by Id:
router.delete("/:id", async (request, response, next) => {
    
    const id = +request.params.id;
    
    try {    
        await logic.deleteBy(id);
        response.status(410).send("id: "+id+" deleted!"); // 410 - resource requested is no longer available and will not be available again
    }
    catch (error) {
        return next(error);
    };
});

// Get all orders: 
router.get("/", async (request, response, next) => {
    try {
        const getAllResult = await logic.getAll();
        response.status(200).json(getAllResult); // 200 - successful HTTP requests
    }
    catch (error) {
        return next(error);
    };
});


// Get amount of shop orders all history:
router.get("/counter/total", async (request, response, next) => {
    try {
        let counter = await logic.countOrders()
        response.status(200).json(counter); // 200 - successful HTTP requests
    }
    catch (error) {
     return next(error);
    };
});

module.exports = router;

