const logic = require("../logic/users-logic");
const mapUser = require("../middleware/map");
const config = require("../config.json");
const jwt = require('jsonwebtoken');
const express = require("express");
const router = express.Router();


router.post("/login", async (request, response, next) => {
    
    let user = request.body;
    // After a successful login, add the following header to each request
    // Authorization: The word Bearer, space (" ") and then - the token.
    // Example : 
    // Authorization : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJBdmkiLCJpYXQiOjE1ODU0OTAxMjd9.O01aQaKcEOHgRexVwwX53T_SqMmKBxP3ng2dlriackA
    const token = jwt.sign({ sub: user }, config.secret);

    try {
        let loginResult = await logic.login(user);
        let loginResponse = {
            token: token,
            user_type: loginResult.user_type,
            id: loginResult.id,
        }
        response.status(200).json(loginResponse);
        //return login data to client.
        mapUser.saveUserInfo(token, loginResult);
        //cache user token on server.
    }
    catch (error) {
      return next(error);
    };
});

// Add new/ create:
router.post("/add", async (request, response, next) => {
    
    const userToAdd = request.body;
    console.log(userToAdd);
    try {
        let newUser = await logic.addUser(userToAdd);
        response.status(201).json(newUser); // 201 - request has been fulfilled
    }
    catch (error) {
       return next(error);
    };
});

// Get by id: 
router.get("/", async (request, response, next) => {
    
   const token = request.headers.authorization;
   const id = mapUser.checkMapForUserId(token);
//    console.log(id , token);
    try {
        const getResult = await logic.getUser(id);
        response.status(200).json(getResult); // 200 - successful HTTP requests
    }
    catch (error) {
        return next(error); // 404 - requested resource could not be found but may be available in the future
    };
});

// // Update user by ID:
// router.put("/:id", async (request, response) => {
    
//     const id =+ request.params.id;
//     const userToUpdate = request.body;
    
    
//     try {
//         await logic.updateUser(userToUpdate);
//         response.status(200).json("Updated!"); // 200 - successful HTTP requests
//     }
//     catch (error) {
//         response.status(404).json({ error: "Unable to update." }); // 404 - requested resource could not be found but may be available in the future
//     };
// });

// // Delete user by Id:
// router.delete("/:id", async (request, response) => {
//     try {

//         const id = +request.params.id;
//         await logic.deleteUser(id);
//         response.status(410).send("user id: "+id+" deleted!"); // 410 - resource requested is no longer available and will not be available again
//     }
//     catch (error) {
//         response.status(404).send({ error: " Id not found." }); // 404 - requested resource could not be found but may be available in the future
//     };
// });


module.exports = router;

