const logic = require("../logic/cart-items-logic");
const express = require("express");
const router = express.Router();

// Add new/ create:
router.post("/add", async (request, response, next) => {
    
    const newItem = request.body;
    
    try {
        let insertItem = await logic.add(newItem);
        console.log(insertItem);
        response.status(201).json(insertItem); // 201 - request has been fulfilled
    }
    catch (error) {
        return next(error);
    };
});


// Get by product id and: 
router.get("/proId/:id", async (request, response, next) => {
    
    const id =+ request.params.id;
    
    try {    
        const getResult = await logic.getProductBy(id);
        response.status(200).json(getResult); // 200 - successful HTTP requests
    }
    catch (error) {
        return next(error);
    };
});
//retrive all items of the cart by cart id.
router.get("/:id", async (request, response, next) => {
     
    let id = request.params.id;
    
    try {    
        const getResult = await logic.getByCart(id);
        response.status(200).json(getResult); // 200 - successful HTTP requests
    }
    catch (error) {
        return next(error);
    };
});


// Update by ID:
router.put("/:id", async (request, response, next) => {
    
    const id = +request.params.id;
    const itemToUpdate = request.body;
    itemToUpdate.product_id = id;
    
    try {
        let update = await logic.update(itemToUpdate);
        response.status(200).json(update); // 200 - successful HTTP requests
    }
    catch (error) {
        return next(error);
    };
});

// Delete cart item:
router.post("/delete", async (request, response, next) => {
    
    const itemToDelete =request.body;
    
    try {    
        let itemDeleteResult = await logic.deleteBy(itemToDelete);
        console.log(itemDeleteResult)
        response.send(itemDeleteResult); // 410 - resource requested is no longer available and will not be available again
    }
    catch (error) {
        return next(error);
    };
});


// Get Specified Cart Total Price:
router.get("/total/:id", async (request, response, next) => {
    //cart id to Calc Total.
    let id =+ request.params.id

    try {
        const getTotalResult = await logic.calcTotalCartPrice(id);
        response.status(200).json(getTotalResult); // 200 - successful HTTP requests
    }
    catch (error) {
        return next(error);
    };
});


module.exports = router;

