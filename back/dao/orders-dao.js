//Connection/Comunication through Module to BD server.                    
let connection = require("./connection-wrapper");

//Insert/Create/Add new Order to DB:
async function create(order) {

    const sql = `INSERT INTO orders ( user_id, cart_id, total_price, city_delivery, street_delivery, date_delivery, credit) Values (?,?,?,?,?,?,?)`;
    const parameters = [  order.user_id, order.cart_id, order.total_price, order.city_delivery, order.street_delivery, order.date_delivery, order.credit];
   
    const info = await connection.executeWithParams(sql, parameters);
    order.id = info.insertId; // Get the new created id from the database.
    return order;
};

//Update Closes Cart Status:
async function closeCartUpdate(id){
    const sql=`update shopping_cart set isChecked ="1" where id = ?`;
    const parameters =[id];
    
    let finishCart = await connection.executeWithParams(sql, parameters);
    return finishCart;
}

//Get Count for Orders in Store:
async function counterOrder(){
    const sql = "SELECT count(id) as amount from orders";

    const counterResult = await connection.execute(sql);
    return counterResult;
}

//Update Order details, by ObJ.Id
async function update(order){
   
    const sql = "UPDATE orders SET user_id = ?, cart_id = ?, total_price = ?, city_delivery = ?, street_delivery = ?, date_delivery = ?, credit = ? WHERE id = ?";
    const parameters = [ order.user_id, order.cart_id, order.total_price, order.city_delivery, order.street_delivery, order.date_delivery, order.credit, order.id];
   
    await connection.executeWithParams(sql, parameters);
    console.log("Updated id: "+ order.id);
    return;
};

//Gets All Orders: Admin function.
async function retriveAll() {
   
    const sql = "SELECT * FROM orders";
    
    const getAllResult = await connection.execute(sql);
    return getAllResult;
};

//Get Order by Id:
async function retriveBy(id) {
    
    const sql = "SELECT * FROM orders WHERE id=?";
    const parameters = [id];
    
    const getByIdResult = await connection.executeWithParams(sql, parameters);
    return getByIdResult[0];
};

//Calc Total Order Price:
async function calcOrderTotalPrice(order){

    const sql = "SELECT Sum(total_price) as total From cart_items where cart_items.cart_id = ?";
    const parameters = [ order.cart_id ];
    
    const orderTotalPrice = await connection.executeWithParams(sql, parameters);
    return orderTotalPrice[0].total;
}

//Get Orders of specified User:
async function retriveOrderByUser(id) {//Get orders and status related to User, by Id.
    const sql = "SELECT orders.id, users.name, orders.cart_id, orders.total_price, orders.picture, shopping_cart.isChecked"+
    "FROM orders O Join users U on U.id = O.user_id"+
    "Join shopping_cart SC on SC.user_id = O.user_id WHERE (O.user_id =?)"
    const parameters = [id];
    
    const getByUserResult = await connection.executeWithParams(sql, parameters);
    return getByUserResult;
}


//Delete specific Order by ID: Admin func.
async function deleteBy(id) {
    
    const sql = `DELETE FROM orders WHERE id = ?`;
    const parameters = [id];
    
    let info = await connection.executeWithParams(sql, parameters);
    console.log(info.affectedRows);
    return info;
};

//validate booked dates for delivery:
async function deliveryDateAvilability(order_date) {
    const sql = "select count(id) booked from Orders where date_delivery = ?";
    const parameters = [order_date];
    
    let dateBookingRes = await connection.executeWithParams(sql, parameters);
        
    return dateBookingRes[0].booked;
}

module.exports = {
    deliveryDateAvilability,
    create,
    update,
    retriveAll,
    retriveBy,
    retriveOrderByUser,
    calcOrderTotalPrice,
    deleteBy,
    counterOrder,
    closeCartUpdate
};//currrd;