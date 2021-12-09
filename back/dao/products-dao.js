//Connection/Comunication through Module to BD server.                  
let connection = require("./connection-wrapper");

//Insert to Db new Pro:
async function create(product) {// takes Pro Obj.
    const sql = `INSERT INTO products ( name, category_id, price, picture) Values (?,?,?,?)`;
    const parameters = [ product.name, product.category_id, product.price, product.picture ];
    const info = await connection.executeWithParams(sql, parameters);
    product.id = info.insertId; // Get the new created id from the database.
    return product;
};

//Update existing Pro details:
async function update(product){//takes Pro Obj.
    const sql = "UPDATE products SET name = ?, category_id = ?, price=?, picture=? WHERE id = ?";
    let parameters = [ product.name, product.category_id, product.price, product.picture, product.id];
    info = await connection.executeWithParams(sql, parameters);
    // console.log(info.affectedRows);
    return info;
};

//Counter for Products in Store:
async function counterPro(){//get amount of products in store.
    const sql = "SELECT count(id) as amount from products";
    const counterResult = await connection.execute(sql);
    return counterResult; 
};

//Get All Products Data:
async function retriveAll() {//Gets All Products in DB.
    const sql = "SELECT * FROM products";
    const getAllResult = await connection.execute(sql);
    return getAllResult;
};

//Get Pro By ID:
async function retriveBy(id) {//Gets spesific Obj, by Id.
    const sql = "SELECT * FROM products WHERE id=?";
    const parameters = [id];
    const getByIdResult = await connection.executeWithParams(sql, parameters);
    return getByIdResult[0];
};

//Get Products Of The Category:
async function retriveByCategory(id){//takes Category Id.
    const sql = "SELECT * FROM products P  WHERE category_id =?"
    const parameters = [id];
    const getResult = await connection.executeWithParams(sql, parameters);
    return getResult;//returns Products.
};

//Retrive Pro Name by Name:
async function checkNameAvilability(name){
    const sql = "SELECT name FROM products where name =?";
    const parameters =[name];
    let checkResult = await connection.executeWithParams(sql, parameters);
    return checkResult[0];
} 

module.exports = {
    create,
    update,
    retriveAll,
    retriveBy,
    retriveByCategory,
    counterPro,
    checkNameAvilability
};

// deleteBy,

// //Delete Pro By Id:
// async function deleteBy(id) {//Delete specific table row in DB, by id
//     const sql = `DELETE FROM products WHERE id = ?`;
//     const parameters = [id];
//     let info = await connection.executeWithParams(sql, parameters);
//     return info;
// };