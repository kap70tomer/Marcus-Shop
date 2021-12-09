//Connection/Comunication through Module to BD server.                      
let connection = require("./connection-wrapper");

//Get price by product id.
async function retriveItemPriceBy(id){

    const sql = "select price from products where id = ?";
    const parameters = [ id ];
   //set quary to exe 
    const getPriceResult = await connection.executeWithParams(sql,parameters);
    //commit exe of quary with params
    console.log(getPriceResult[0].price)
    return getPriceResult[0].price;
}

//CALC TOTAL CART PRICE, by cart id:
async function calcTotalPriceOfCart(id){
//quantity * product price = total item price. for validation.
   const sql = `SELECT sum(products.price * cart_items.quantity) as total_price 
   FROM products join cart_items on products.id = cart_items.product_id 
   where cart_id =?`;
   
   const parameters = [ id ]; 
   const getTotalPriceResult = await connection.executeWithParams(sql, parameters);
   
   console.log(getTotalPriceResult[0].total_price);
   return getTotalPriceResult[0].total_price;
};

//Add/Create/Insert new Cart_itemm OBJ to DB:
async function create(item) {   
   
    const sql = `INSERT INTO cart_items (product_id, quantity, total_price, cart_id ) Values (?,?,?,?)`;
    let parameters = [item.product_id, item.quantity, item.total_price, item.cart_id ];
   
    let info = await connection.executeWithParams(sql, parameters);    
    return info;
};

//Update Cart_Item Obj data:
async function update(item){
   
    const sql = "UPDATE cart_items SET quantity = ?, total_price = ? WHERE (product_id = ? and cart_id = ?)";
    const parameters = [ item.quantity, item.total_price, item.product_id, item.cart_id ];
   
    let info = await connection.executeWithParams(sql, parameters);
    return info;
};

//Get Cart's Cart_Items, by Cart id:
async function retriveByCart(id) { 
    
    const sql = "SELECT cart_items.*, products.name FROM shopping.cart_items join shopping.products "+
    "on cart_items.product_id = products.id where cart_id = ?";
    const parameters = [id];
    
    const getByIdResult = await connection.executeWithParams(sql, parameters);
    return getByIdResult;
};

//Validate is cart item exists in cart already:
async function retriveByProductInCart(item) { 
    
    const sql = "SELECT * FROM cart_items WHERE product_id=? and cart_id =?";
    const parameters = [ item.product_id, item.cart_id ];
    //set query.
    let getByPnCIdResult = await connection.executeWithParams(sql, parameters);
    //commit.
    return getByPnCIdResult[0];
};

//Delete by Cart_item:
async function deleteBy(item) {
    
    const sql = `DELETE FROM cart_items WHERE product_id = ? and cart_id = ?`;
    const parameters = [item.product_id, item.cart_id];
    
    let info = await connection.executeWithParams(sql, parameters);
    return info;
};

module.exports = {
    create,
    retriveItemPriceBy,
    calcTotalPriceOfCart,
    update,
    retriveByCart,
    retriveByProductInCart,
    deleteBy
};
//currd
// retriveAll,

// async function retriveAll() {//Gets All table's data.
   
//     const sql = "SELECT * FROM cart_items";
   
//     const getAllResult = await connection.execute(sql);
//     return getAllResult;
// };
// //  retriveAll()