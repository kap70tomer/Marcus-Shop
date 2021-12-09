//imports:
let ServerError = require("../errors/server-error");
let ErrorType = require("../errors/error-type");
//error handler model and type.
let dao = require("../dao/users-dao");
let User = require("../models/user");
//server dao layer, user object model.
let crypto = require("crypto");
let salt = "salamtak9";
//crypto provide MD5 Hash functions, 
//var "salt" for stronger hashing.


//User Login:
async function login(user){
    
    await isValidObjData(user);
    //validate Obj data.
    
    user.password = await generateHash(user.password);
    //set new Hashed & Salted Password.
    let loginResult;
    try{
        loginResult = await dao.login(user);
    }
    //Login action commit.
    
    catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(user), e);
    }
    //hendle error if accord during login becuse of server / connection unstable.etc..

    if(!loginResult){
        //Validation of login attempt result.
        throw new ServerError(ErrorType.UNAUTHORIZED);
    }
    //throw if user input is not recognized by the system in any user detailes.
    
    console.log("logged in!");
    return loginResult;
}

//retrive single user by ID:
async function getUser(id){
   
    const getUserResult = await dao.retriveBy(id);
    //validate retrived obj.
    
    if(getUserResult[0] == undefined){
        throw new ServerError(ErrorType.NO_USER_IN_DATABASE);
    }//undifiend here means that there is no such id nor user in DB.
    
    await isValidResponse(getUserResult[0]);
    //validate res.
    
    return getUserResult[0];
}

// Delete single user by ID:
async function deleteUser(id){
    
    let userToDelete = await dao.retriveBy(id); 
    //validate ID is existing in DB.
   
    await isValidResponse(userToDelete);
    //validate response.
   
    let deleteResponse = await dao.deleteBy(id);
    //DELETE commit.
   
    if (deleteResponse.affectedRows == 0) {
        throw new ServerError(ErrorType.NO_ROWS_WERE_DELETED);
    }//validate delete.
    return;
};

// Insert new User to DB:
async function addUser(user){
    
    await isValidObjData(user);
    //validate user Obj data.
   
    let isUserExistByEmail = await dao.isUserExistByEmail(user.email);
    //validate is email in use.
   
    if(!isUserExistByEmail){
        throw new ServerError(ErrorType.EMAIL_ALREADY_EXIST,JSON.stringify(user),e);
    }//validate email is not taken.
    
    //md5 function takes password as string and generates a Hash of it.
    user.password = await generateHash(user.password);
    //set to User Obj new hashed & salted Password.
    
    const newUser = await dao.create(user);
    // commit Db insert of new User Obj.
    
    await isValidResponse(newUser);
    // validate add Exe response.
   
    return newUser;
}

// Hash password func: 
async function generateHash(password){
    //takes user password and return it hashed and salted.
      let hash = crypto.createHash('md5').update(salt + password).digest('hex');

      return hash;
  }

//validate obj:
async function isValidObjData(user){
    let typeError = User.validate(user);
    if (typeError){
        console.log(typeError)
        throw new ServerError(ErrorType.INFORMATION_TYPE_IS_NOT_VALID);
    }
}

//function validates DB response, takes (Res Obj).
async function isValidResponse(object){
    if (!object){//response is empty / null.
        throw new ServerError (ErrorType.GENERAL_ERROR);
    };
}; 
// exports(provide) this module functions to the controller(upper layer) usage.
module.exports = {
    login,
    getUser,
    deleteUser,
    addUser
}

// updateUser,

// change specific user Details (put).

// async function updateUser(user){
    //     //update user details:
    //     User.validate(user);
    //     const updateUserDetailsResult = await dao.update(user);
    //     //set update in DB.
    //     console.log("updateUserDetailsResult")
    //     await isValidResponse(updateUserDetailsResult);
    //     // validate response of update.
    //     console.log("Updated!");
    //     return updateUserDetailsResult;


    // addUser({city: "BEER-SHEVA",
    // email: "Halabi66@walla.com",
    // last_name: "Goooo",
    // name: "Yonat",
    // password: "123123",
    // street: "Tipo44"})
// };