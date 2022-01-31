//Connection/Comunication through Module to BD server.
let connection = require("./connection-wrapper");

//calculate Cart Price:
async function calcTotalCartPrice(id){
    const sql = `select sum(cart_items.total_price) total from cart_items where cart_id = ?`
    let parameters =[id];
    let calcTotalResult = await connection.executeWithParams(sql, parameters);
    return calcTotalResult[0];
}

//create new cart:
async function create(user_id) {
    const sql = `INSERT INTO shopping_cart (user_id) values (?)`;
    const parameters = [ user_id];
    const info = await connection.executeWithParams(sql, parameters);
    let newId = info.insertId; // Get the new created id from the database.
    return newId;
};

//change cart status to closed:
async function update(cart){//Update cart status, by Id
    const sql = "UPDATE shopping_cart SET  isChecked = 1 WHERE id = ?";
    const parameters = [ cart.isChecked, cart.id ];
    let info = await connection.executeWithParams(sql, parameters);
    console.log("Updated id: "+ cart.id);
    return info;
};

//get last users carts:
async function retriveLastCartsByUser(id) {//retrive Last Carts.
    const sql = `SELECT id FROM shopping_cart 
    where user_id =? order by creation_date desc limit 3`;
    let parameters = [id];
    const getAllResults = await connection.executeWithParams(sql, parameters);
    console.log("[DBG] get last 3 carts by user id => ", getAllResults)
    return getAllResults;
};

//get cart info by id:
async function retriveByCart(id) { //Gets spesific Obj, by Obj.id
    const sql = "SELECT * FROM shopping_cart WHERE id=?";
    const parameters = [id]
    const getByIdResult = await connection.executeWithParams(sql, parameters);
    return getByIdResult[0];
};

//get last carts info by id:
async function retriveLastCartBy(id) { //Gets spesific Obj, by Obj.id
    const sql = `Select shopping_cart.id, shopping_cart.creation_date, shopping_cart.isChecked, sum(cart_items.total_price) total
    from shopping_cart join cart_items 
    on shopping_cart.id = cart_items.cart_id 
    where cart_id =?
    order by isChecked, creation_date desc limit 3`;
    const parameters = [id]
    const getByUserIdResult = await connection.executeWithParams(sql, parameters);
    return getByUserIdResult;
};

//delete cart by id:
async function deleteByCart(id) {//Delete specific row in DB, by Obj.id

    const sql = `Delete From shopping_cart where id = ?`;
    const parameters = [id];
    let info = await connection.executeWithParams(sql, parameters);
    console.log("Cart Id Been deleted: " + id);
    return info;
};

//clear cart from items:
async function deleteCartItems(id){
    const sql = "Delete from cart_items where cart_id = ?";
    const parameters = [id];
    let info = await connection.executeWithParams(sql, parameters);
    return info;
};

module.exports = {
    create,
    update,
    retriveLastCartBy,
    retriveByCart,
    retriveLastCartBy,
    deleteByCart,
    deleteCartItems,
    calcTotalCartPrice,
    retriveLastCartsByUser
};