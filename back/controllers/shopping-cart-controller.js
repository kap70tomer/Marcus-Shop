//imports:
//logic server layer.
const logic = require("../logic/shopping-cart-logic");
//middleware JWT
const mapUser = require("../middleware/map");
//"express" with router module.
const express = require("express");
const router = express.Router();

// Get Cart by id: 
router.get("/byId/:id", async (request, response ,next) => {
    
    const id = +request.params.id;
    
    try {    
        const getResult = await logic.getByCart(id);
        response.status(200).json(getResult); // 200 - successful HTTP requests
    }
    catch (error) {
        return next(error);
    };
});

// Add Cart /Create:
router.post("/add", async (request, response ,next) => {
    
    let token = request.headers.authorization;
    let id = mapUser.checkMapForUserId(token);
   
    try {
        let newCart = await logic.add(id);
        response.status(201).json(newCart); // 201 - request has been fulfilled
    }
    catch (error) {
        return next(error);
    };
});

// Get by user id: 
router.get("/", async (request, response ,next) => {
    
    let token = request.headers.authorization;
    let id = mapUser.checkMapForUserId(token);
    
    try {    
        const getResult = await logic.getLastCarts(id);
        response.status(200).json(getResult); // 200 - successful HTTP requests
    }
    catch (error) {
        return next(error);
    };
});

// Update by ID:
router.put("/:id", async (request, response ,next) => {
    
    const id = +request.params.id;
    const cartToUpdate = request.body;
    cartToUpdate.id = id;
    
    try {
        await logic.update(cartToUpdate);
        response.status(200).json("Updated!"); // 200 - successful HTTP requests
    }
    catch (error) {
        return next(error);
    };
});

// Delete by Id:
router.delete("/:id", async (request, response ,next) => {
    
    const id = +request.params.id;
    
    try {    
        let deletedInfo = await logic.deleteBy(id);
        response.status(410).send(id+" deleted!" + deletedInfo); // 410 - resource requested is no longer available and will not be available again
    }
    catch (error) {
        return next(error);
    };
});

//Clear Cart(By ID) from its cart_items:
router.delete("/clear/:id", async (request, response ,next) => {

    const id = +request.params.id;

    try {
        let info = await logic.deleteCartItems(id);
        response.json(info);
    }
    catch (error){
        return next(error);
        }
});

module.exports = router;
