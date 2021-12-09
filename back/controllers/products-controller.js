//imports:
const logic = require("../logic/products-logic");
//logic server layer 
const express = require("express");
const router = express.Router();
//"express" server router module.
const uuid = require("uuid");
//UUID generates unique srtings.

//get Picture by Name:
router.get("/uploads/:name", (request, response)=>{       
    // Extracting the filename
    let fileName = request.params.name;

    // console.log(fileName);
    // console.log(__dirname);

    let fullQualifiedFileName = __dirname + "/uploads/"+fileName;
    
    response.sendFile(fullQualifiedFileName);
})

//add New picture file in Uploads directory:
router.post("/file", async (request, response, next)=>{
    try {      
        // Extract the uploaded image.
        // IMPORTANT - The "image" property is implanted by the "express-fileupload".
        // middleware.
        const file = request.files.file;
        
        // Extracting the uploaded file's extension (e.g. yossi.png or yossi.zip).
        const extension = file.name.substr(file.name.lastIndexOf("."));
        
        // Generating a unique identifier in order to prevent conflicts between.
        // files with the same name - yet different.
        let newUuidFileName = uuid.v4();
        
        let newFileName = newUuidFileName + extension;

        file.mv("./uploads/" + newFileName); 
        // E.g: "C:\my-project\uploads\204b3caf-9e37-4600-9537-9f7b4cbb181b.jpg".
        let successfulUploadResponse = {name:newFileName};
        console.log(successfulUploadResponse.name);
        // returning the product object
        response.status(200).json(successfulUploadResponse);
    }
    catch (error) {
        return next(error);
    }
});

// Add new/ create:
router.post("/add", async (request, response ,next) => {
    
    const newProduct = request.body;
    
    try {
        let pro = await logic.add(newProduct);
        response.status(201).json(pro); // 201 - request has been fulfilled
    }
    catch (error) {
        return next(error);
    };
});

// Get Product by id: 
router.get("/:id", async (request, response ,next) => {
    
    const id = +request.params.id;
    
    try {    
        const getResult = await logic.getBy(id);
        response.status(200).json(getResult); // 200 - successful HTTP requests
    }
    catch (error) {
        return next(error);
    };
});

// Get products by category id: - decided to use filter on client side for better preformance..
router.get("/byCategory/:id", async (request, response ,next) => {
    
    const id = +request.params.id;
    
    try {    
        const getResult = await logic.getByCategory(id);
        response.status(200).json(getResult); // 200 - successful HTTP requests
    }
    catch (error) {
        return next(error);
    };
});

// Update by ID:
router.put("/:id", async (request, response ,next) => {
    
    const id = +request.params.id;
    const productToUpdate = request.body;
    productToUpdate.id = id;
    
    try {
        await logic.update(productToUpdate);
        response.status(200).json("Updated id:! "+ id); // 200 - successful HTTP requests
    }
    catch (error) {
        return next(error);
    };
});

// Get amount of products in store:
router.get("/counter/total", async (request, response, next) => {
    try {
        let counter = await logic.countProducts();
        
        response.status(200).json(counter); // 200 - successful HTTP requests
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

