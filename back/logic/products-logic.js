//imports:
const dao = require("../dao/products-dao");
const Product = require("../models/product");
//error handler model and type
let ServerError = require("../errors/server-error");
let ErrorType = require("../errors/error-type");

//Retrive total amount of products in store:
async function countProducts(){
    const counterOfProducts = await dao.counterPro();
    //counts Products..return amount.
    await isValidResponse(counterOfProducts[0]);
    //validate response.
    if (counterOfProducts[0].amount == 0) {
        throw new ServerError(ErrorType.NO_PRODUCTS_IN_DATABASE);
    }//validate amount of products.
    return counterOfProducts[0].amount;
}

//Retrive all products:
async function getAll(){
    
    const getAllResult = await dao.retriveAll();
    
    await isValidResponse(getAllResult);
    //Validate retrived Data from DB.
    if (getAllResult.length == 0){
        throw new ServerError(ErrorType.NO_PRODUCTS_IN_DATABASE);
    }
    return getAllResult;
};

//Retrive product by its Id, 'MAKAT'.
async function getBy(id){
   //func Takes specfied Id.
    const getProductResult = await dao.retriveBy(id);
    //validate retrived product result.
    if(!getProductResult){
        throw new ServerError(ErrorType.PRODUCT_DOES_NOT_EXIST);
    }
    return getProductResult;
};

//Retrive all Products of specified Category C by C.id.
async function getByCategory(id){
   
    const getResultByCategory = await dao.retriveByCategory(id);
    //validate response.
    await isValidResponse(getResultByCategory);
    //validate data.
    if (getResultByCategory.length == 0){
        throw new ServerError(ErrorType.NO_PRODUCTS_IN_THIS_CATEGORIES_IN_DATABASE);
    }//exption thrown if no Products found under this category.
    return getResultByCategory;
};

//Update product details:
async function update(product){
    //validate Obj data.
    await isValidObjData(product);
    const updateResult = await dao.update(product);
    //send to DB than validate res of action.
    await isValidResponse(updateResult);   
    if(!updateResult.affectedRows){
        throw new ServerError(ErrorType.UPDATE_FAILED,"Failed to Update");
    }
    return updateResult;
};

//Add/Create/Insert new Product to store:
async function add(product){
    //validate product data.
    await isValidObjData(product);
    //validate that Pro name is'nt already taken.
    let checkNameAvilabiltyResult = await dao.checkNameAvilability(product.name);
    if (checkNameAvilabiltyResult){
        throw new ServerError(ErrorType.PRODUCT_NAME_EXIST,"Pro name Already Taken");
    }
    //insert Obj to DB new row. 
    const newProduct = await dao.create(product);
    //validate insert happend by the response.
    await isValidResponse(newProduct);
    console.log("Added!: "+ newProduct.id);
    return newProduct;
};

//validate product Obj Data:
async function isValidObjData(product){
    let typeError = Product.validate(product);
    if (typeError){
        console.log(typeError);
        throw new ServerError(ErrorType.INFORMATION_TYPE_IS_NOT_VALID);
    }
}

//func validate retreived obj as response is valid. 
async function isValidResponse(object){
    if (!object){
        throw new ServerError(ErrorType.GENERAL_ERROR);
    }
}; 

module.exports = {
    getAll,
    update,
    getBy,
    getByCategory,
    add,
    countProducts

    // deleteBy,
    
    //Remove product by id:...Admin only .. not in use 
    // async function deleteBy(id){
    //     //validate existing in DB.
    //     const idToDelete = await dao.retriveBy(id);
    //     //if id is not in DB dont proceed to delete.
    //     if (!idToDelete){
    //         throw new ServerError(ErrorType.PRODUCT_DOES_NOT_EXIST);
    //     }
    //     let info = await dao.deleteBy(id);//DELETE commit.
    //     await isValidResponse(info);
    //     if (info.affectedRows == 0){
    //         throw new ServerError(ErrorType.NO_ROWS_WERE_DELETED);
    //     }
    //     console.log(info);
    // };
}