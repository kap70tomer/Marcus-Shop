//import Modules:
const dao = require("../dao/orders-dao");
const Order = require("../models/order");
//error handler model and type
let ServerError = require("../errors/server-error");
let ErrorType = require("../errors/error-type");

//Count Number of Orders from store:
async function countOrders(){
    
    const amountOfOrders = await dao.counterOrder();
    //get counter.

    await isValidResponse(amountOfOrders);
    //validate res obj.
    
    if (amountOfOrders[0].amount == 0){
        throw new ServerError(ErrorType.NO_ORDERS_IN_DATABASE);
    }//validate there are any orders on site.
    
    return amountOfOrders[0].amount;
}

//all orders "history" - Admin function.
async function getAll(){
    //get All orders
    const getAllResult = await dao.retriveAll();
   
    //Validate retrived Data from DB.
    await isValidResponse(getAllResult);
   
    if (getAllResult.length == 0){
        throw new ServerError(ErrorType.NO_ORDERS_IN_DATABASE);
    }
   
    return getAllResult;
};

//Retrive order by id:
async function getBy(id){
   
    const getResult = await dao.retriveBy(id);
    //validate response.
   
    await isValidResponse(getResult);
   
    if (getResult.length == 0){
        throw new ServerError(ErrorType.NO_ORDERS_IN_DATABASE);
    }
    
    return getResult;
};

//Retrive orders by User id:
async function getByUser(id){
   
    const getResult = await dao.retriveOrderByUser(id);
    //validate retrived obj.
   
    await isValidResponse(getResult);
    //validate res.
    
    if (getResult.length == 0){
       throw new ServerError(ErrorType.NO_ORDERS_IN_DATABASE);
    }//validate array of users order if there are any.
   
    return getResult;
};

//Update order details: - Admin function.
async function update(order){
    //Validate obj data.
    await isValidObjData(order);

    const updateOrderResult = await dao.update(order);
    //send to DB than validate result of action.
   
    await isValidResponse(updateOrderResult);

    console.log("Updated!: "+ order.id);
   
    return updateOrderResult[0].id;
};

//Delete order by id: - Admin function.
async function deleteBy(id){
    //validate existing in DB.
    const orderToDelete = await dao.retriveBy(id);
   
    //if id is not in DB dont proceed to delete().
    await isValidResponse(orderToDelete);
    //validate response.
   
    await dao.deleteBy(id);
    //DELETE Exe commit. 
   
    console.log("Deleted!: " + id);
    return;
}

//Create/Add/Insert new order:
async function add(order){
    //Validate obj data.
    await isValidObjData(order);

    let isValidDate = await dao.deliveryDateAvilability(order.date_delivery);
    //validate date for delivery:
    if (isValidDate == 3){
        throw new ServerError(ErrorType.DATE_IS_FULL);
    }
    
    //Change orders Cart status to closed:
    let closeCart = await dao.closeCartUpdate(order.cart_id);
   
    await isValidResponse(closeCart);
   //validate cart has been closed.
    if(closeCart.changedRows == 0){
        throw new ServerError(ErrorType.FAILED_TO_CLOSE_CART);
    }

    // Calc Final Total Price (on server side) of order:
    let finalTotal = await dao.calcOrderTotalPrice(order);    
   
    await isValidResponse(finalTotal);

    order.total_price = finalTotal;
    // set final price befor set order in DB.

    //Exe insert new Order to DB. 
    const newOrder = await dao.create(order);
   
    await isValidResponse(newOrder);
    //validate insert response.
      
    if (!newOrder.id){
        throw new ServerError(ErrorType.FAILED_TO_ORDER);
    }//validate insert by new id.
   
    return newOrder;
}

//validate order Obj Data:
async function isValidObjData(order){
    
    let typeError = Order.validate(order);
   
    if (typeError){
        console.log(typeError);
        throw new ServerError(ErrorType.INFORMATION_TYPE_IS_NOT_VALID);
    }
}

//validate Responses From DB:
async function isValidResponse(object){
   
    if (!object){
        throw new ServerError(ErrorType.GENERAL_ERROR);
    }
}


module.exports = {
    getAll,
    update,
    getBy,
    getByUser,
    deleteBy,
    add,
    countOrders
}