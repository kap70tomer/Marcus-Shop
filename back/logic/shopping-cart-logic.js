//imports:
let ServerError = require("../errors/server-error");
let ErrorType = require("../errors/error-type");
//error handler model and type.
const dao = require("../dao/shopping-cart-dao");
const Cart = require("../models/cart");
//dao server layer , Cart obj model.

//Get Users Last Visits:
async function getLastCarts(id){
    let lastCarts = [];
    //store array as model for last carts objs.

    let cartsResponse = await dao.retriveLastCartsByUser(id);
    //retrive carts IDs by given user id.
    if (!cartsResponse) {
        throw new ServerError(ErrorType.NO_CARTS_IN_DATABASE);
    }//throw if user has no last visits.
    
    //for each used cart [calc total cost + Date time data].
    for(let i=0 ; i<cartsResponse.length;i++){
        let lastCart = await dao.retriveLastCartBy(cartsResponse[i].id);
        // await isValidResponse(lastCart);
        //validate res.
        lastCarts.push(lastCart[0]);
        //push to array last carts model.
    }
    return lastCarts;
}

//Calc Cart Total Price by cart ID:
async function getTotalPrice(id){
    
    const calcTotalResult = await dao.calcTotalCartPrice(id);
    //Validate response from DB.
    await isValidResponse(calcTotalResult);
    return calcTotalResult;
}

//Retrive a single Cart by its Id:
async function getByCart(id){
   
    const getByCartResult = await dao.retriveByCart(id);
    
    if (getByCartResult == undefined){
        throw new ServerError(ErrorType.NO_CARTS_IN_DATABASE);
    }//no cart found with the given id.

    await isValidResponse(getByCartResult);
    //validate response. not valid throws general error.
    return getByCartResult;
    //return cart Data.
}

async function update(cart){
    
    await isValidObjData(cart);
    // class cart validate func(). for obj data.
    const updateCartResult = await dao.update(cart);
    await isValidResponse(updateCartResult);
    //validate response.
    
    console.log("Updated!: "+ id);
    return;
}

// Delete single cart by its id:
async function deleteBy(id){
    
    const checkForIdResponse = await dao.retriveByCart(id);
    await isValidResponse(checkForIdResponse);
    if( checkForIdResponse == undefined ){
        throw new ServerError(ErrorType.NOT_FOUND);
    }
    //validate existing in DB.
    
    let deletedCartItemsResponse = await dao.deleteCartItems(id);
    await isValidResponse(deletedCartItemsResponse);
    //empty related tables data of this cart.
    let deleteCart = await dao.deleteByCart(id);
    await isValidResponse(deleteCart);
    //DELETE commit.
    console.log("Deleted!: "+deleteCart);
    return deleteCart;
}

//Clear Cart items from cart:
async function deleteCartItems(id){
    // takes cart Id and Delete all cart items related.
    const idToDelete = await dao.retriveByCart(id);
    await isValidResponse(idToDelete);
    let info = await dao.deleteCartItems(id);
    return info;
    
}

//Create/Insert New cart In Db: 
async function add(id){
    //takes User Id and create new cart for him.
    const newCart = await dao.create(id);
    //commit adding.
    await isValidResponse(newCart);
    //validate Exe response.
    return newCart;
    //return insert New id.
}

//validate Obj cart data:
async function isValidObjData(cart){
    let typeError = Cart.validate(cart);
    if (typeError){
        throw new ServerError(ErrorType.INFORMATION_TYPE_IS_NOT_VALID);
    }
}

//validates Responses from DB by returned obj.
async function isValidResponse(object){
    if (!object){
        throw new ServerError(ErrorType.GENERAL_ERROR);
    }
}; 
//function exported to upper layer to use.
module.exports = {
    getTotalPrice,
    update,
    getByCart,
    deleteBy,
    add,
    deleteCartItems,
    getLastCarts
}

// //retrive single cart by user id.
// async function getByCartUser(id){
   
//     const getByUserResult = await dao.retriveLastCartBy(id);
//     await isValidResponse(getByUserResult);
//     //validate response.obj.
    
//     console.log(getByUserResult)
//     return getByUserResult;
// }
// getByCartUser(20)// cart id
// getByCartUser,