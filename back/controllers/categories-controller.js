const logic = require("../logic/categories-logic");
const express = require("express");
const router = express.Router();


// Add new/ create:  future admin use
router.post("/add", async (request, response, next) => {
    
    const newCategory = request.body;
    
    try {
        await logic.add(newCategory);
        response.status(201).json("Category added"); // 201 - request has been fulfilled
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

// Update by ID: future admin use
router.put("/:id", async (request, response) => {
    
    const id = +request.params.id;
    const categoryToUpdate = request.body;
    categoryToUpdate.id = id;
    
    try {
        await logic.update(categoryToUpdate);
        response.status(200).json("Updated!"); // 200 - successful HTTP requests
    }
    catch (error) {
        return next(error);
    };
});

// Delete by Id: future admin use
router.delete("/:id", async (request, response) => {
    
    const id = +request.params.id;
    
    try {    
        await logic.deleteBy(id);
        response.status(410).send("id: "+id+" deleted!"); // 410 - resource requested is no longer available and will not be available again
    }
    catch (error) {
        return next(error);
    };
});

// Get all: 
router.get("/", async (request, response, next) => {
    
    try {
        const getAllResult = await logic.getAll();
        response.status(200).json(getAllResult); // 200 - successful HTTP requests
    }
    catch (error) {
       return next(error);
    };
});


module.exports = router;

