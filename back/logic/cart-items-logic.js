//imports:
const dao = require("../dao/cart-items-dao");
const Cart_item = require("../models/Cart_item");
//error handler model and type
let ServerError = require("../errors/server-error");
let ErrorType = require("../errors/error-type");

//Add new item to cart items:
async function add(item){
    //static class validation. for obj data.
    await isValidObjData(item);
    
    //check if item already in cart and if so will add to it, the quantity of after added same cart_item.  
    let inCartAlreadyItem = await isAlreadyExist(item);
    
    //validate duplacate item. in cart.
    if(inCartAlreadyItem){ 
      //if already in cart. 
        inCartAlreadyItem.quantity += item.quantity;  
        //set new quantity to existing item in cart.
    
        let cost = await update(inCartAlreadyItem);
        //return new cart total cost.
        return cost;  
    }
//if item is new to Cart:
    else{
        let addedNewItem = await calcTotalItemPrice(item);
        //set price to cart item, server side calc result.
        await isValidResponse(addedNewItem);
        //validate calc res.
        let addedNewItemResult = await dao.create(addedNewItem);
        //add to cart with fixed price.
        await isValidResponse(addedNewItemResult);
        //validate insert response.
        if(!addedNewItemResult.affectedRows){
            throw new ServerError(ErrorType.FAILED_TO_ADD_ITEM);
        }        
        const calcResult = await calcTotalCartPrice(item.cart_id);
        //send client new total cost.
        return calcResult;
    };
};

//Validate item existance in cart.
async function isAlreadyExist(item){
    let isExists = await dao.retriveByProductInCart(item);
    if(!isExists){
        return;
    }
    return isExists;
}

//Get single item price.
async function getPriceBy(id){
    const getPrice =+ await dao.retriveItemPriceBy(id);
    await isValidResponse(getPrice);
    console.log("Price: " + getPrice);
    return getPrice;
};

//Calc Total price of Cart_Item in Cart:
async function calcTotalItemPrice(item){
    
    let id = item.product_id;    
    const productPrice =+ await getPriceBy(id);
    //get price from bd. 
    item.total_price =+ (productPrice * item.quantity);
    //set aproved price to cart item.
    return item;
}

//CALC Total Cart Price by cart id:
async function calcTotalCartPrice(id){
    
    let calcTotalResult = await dao.calcTotalPriceOfCart(id);
    await isValidResponse(calcTotalResult);
    //validate result.
    return calcTotalResult;
};

//Get product by cart Item:
async function getProductBy(item){
    await isValidObjData(item);
    //validate item data.
    const getProResult = await dao.retriveByProduct(item);
    await isValidResponse(getProResult);
    //validate retrived obj.
    return getProResult;
}

//Get Cart_items by Cart ID:
async function getByCart(id){
    //get cart items by cart id.
    const getCartResult = await dao.retriveByCart(id);
    //validate retrived obj.
    await isValidResponse(getCartResult);

    if(getCartResult.length == 0){
        throw new ServerError(ErrorType.FAILED_TO_LOAD_CART_ITEMS);
    }
    return getCartResult;
}

//Update/change items details:
async function update(item){
    //validate data type.
    await isValidObjData(item);
    
    //validate price by inner calc DB ensure.
    let trustedItem = await calcTotalItemPrice(item);
    //trusted with server price.
    //validate price insert.
    const updateResult = await dao.update(trustedItem);
    //send to DB than validate result of action.
    await isValidResponse(updateResult);
    if(updateResult.affectedRows == 0){
        throw new ServerError(ErrorType.UPDATE_FAILED);
    }
    let cartTotal = await calcTotalCartPrice(item.cart_id);
    await isValidResponse(cartTotal);
    return cartTotal;
}

//Delete from Cart by CartItem:
async function deleteBy(item){
   //validate data type:
    await isValidObjData(item);
    
    //validate existing in DB.
    const isCartIdExist = await dao.retriveByCart(item.cart_id);
    //if id is not in DB dont proceed to delete.
    await isValidResponse(isCartIdExist);

    let deleteResponse = await dao.deleteBy(item);
    //DELETE commit.
    
    if (deleteResponse.affectedRows == 0){
        throw new ServerError(ErrorType.NO_ROWS_WERE_DELETED);
    }//validate deleted rows.
    
    let currentTotal = await dao.calcTotalPriceOfCart(item.cart_id);
    //Calc total after deleting item from cart.
    return currentTotal;
}

//validate item data:
async function isValidObjData(item){
    let typeError = Cart_item.validate(item);
    if (typeError){
        console.log(typeError);
        throw new ServerError(ErrorType.INFORMATION_TYPE_IS_NOT_VALID);
    }
}

//validate Response Obj.
async function isValidResponse(object){
    if (!object){
        throw new ServerError(ErrorType.GENERAL_ERROR);
    }
}

module.exports = {
    getPriceBy,
    update,
    getProductBy,
    calcTotalCartPrice,
    getByCart,
    deleteBy,
    add
}

// getAll,
// async function getAll(){
        
    //     const getAllResult = await dao.retriveAll();
    //     //Validate response from DB.
    //     await isValidResponse(getAllResult);
    //     if (getAllResult.length == 0){
    //         throw new ServerError(ErrorType.GENERAL_ERROR)
    //     }
        
    //     console.log("Sucessful Retrive All! "+ JSON.stringify(getAllResult));
    //     return getAllResult;
    // }
