// imported modules:
const dao = require("../dao/categories-dao");
const Category = require("../models/category");
//error handler model and type
let ServerError = require("../errors/server-error");
let ErrorType = require("../errors/error-type");

//Retrive all Categories:
async function getAll(){
    
    const getAllResult = await dao.retriveAll();
    //Validate retrived Data from DB.
    await isValidResponse(getAllResult);
    if(getAllResult.length == 0){
        throw new ServerError(ErrorType.NO_CATEGORIES_IN_DATABASE);
    }
    return getAllResult;
}

//Retrive Category by ID:
async function getBy(id){
    
    const getResult = await dao.retriveBy(id);
    //validate response obj.
    await isValidResponse(getResult);
    if(getResult.length == 0){
        throw new ServerError(ErrorType.NOT_FOUND,"no Category by this ID found")
    }
    return getResult;
}

// Update/Change category name: admin func.
async function update(category){
    //validate obj data.
    await isValidObjData(category);

    //update details
    const updateResult = await dao.update(category);
    //send to DB than validate result of action.
    await isValidResponse(updateResult);
    if(updateResult.affectedRows == 0){
        throw new ServerError(ErrorType.UPDATE_FAILED)
    }
    console.log("Updated!: "+ updateResult[0].id);
    return updateResult;
}

// delete category by id: admin func.
async function deleteBy(id){
    //validate existing in DB.
    const objIdToDelete = await dao.retriveBy(id);
    //if id is not in DB dont proceed to delete.
    await isValidResponse(objIdToDelete);
    
    let deleteRes = await dao.deleteBy(id);//DELETE commit.
    
    console.log("Deleted!"+ deleteRes);
    return deleteRes;
}

//Add new Category to store: Admin func
async function add(category){
    //validate data.
    await isValidObjData(category);
    //insert Obj to DB new row. 
    const newCategory = await dao.create(category);
    //validate insert.
    await isValidResponse(newCategory);
    
    console.log("Added!: "+ newCategory);
}

//validate obj data type:
async function isValidObjData(category){
    let typeError = Category.validate(category);
    if (typeError){
        throw new ServerError(ErrorType.INFORMATION_TYPE_IS_NOT_VALID);
    }
}
//validate Db Res obj:
async function isValidResponse(object){
    if (!object){
        throw new ServerError(ErrorType.GENERAL_ERROR);
    }
}


module.exports = {
    getAll,
    update,
    getBy,
    deleteBy,
    add
}