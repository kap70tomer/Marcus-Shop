//Connection/Comunication through Module to BD server.                      !!! non tested!!!
let connection = require("./connection-wrapper");

async function create(category) {
    const sql = `INSERT INTO categories ( name ) Values (?)`;
    const parameters = [ category.name ];
    const info = await connection.executeWithParams(sql, parameters);
    category.id = info.insertId; // Get the new created id from the database.
    return;
};
//  create({name:""})

async function update(category){//Update Obj details, by ObJ.Id
    const sql = "UPDATE categories SET name = ? WHERE id = ?";
    const parameters = [ category.name, category.id ];
    await connection.executeWithParams(sql, parameters);
    console.log("Updated id: "+ category.id);
    return;
};
//  update({name:"", id:""})

async function retriveAll() {//Gets All table's data.
    const sql = "SELECT * FROM categories";
    const getAllResult = await connection.execute(sql);
    return getAllResult;
};
//  retriveAll()

async function retriveBy(id) { //Gets spesific Obj, by db-Row.id
    const sql = "SELECT * FROM categories WHERE id=?";
    const parameters = [id];
    const getByIdResult = await connection.executeWithParams(sql, parameters);
    return getByIdResult[0];
};
//  retriveBy(1)

 async function deleteBy(id) {//Delete specific table row in DB, by id
    const sql = `DELETE FROM categories WHERE id = ?`;
    const parameters = [id];
    await connection.executeWithParams(sql, parameters);
    await deleteCategoryProducts(id);
    console.log("Been deleted: " + id);
    return;
};
//  deleteBy(2)

//on category delete clean its  products from DB.
async function deleteCategoryProducts(id){
  const sql = "DELETE FROM products WHERE category_id = ?";
  const parameters = [id];
  await connection.executeWithParams(sql, parameters);
}

module.exports = {
    create,
    update,
    retriveAll,
    retriveBy,
    deleteBy
};//currd;