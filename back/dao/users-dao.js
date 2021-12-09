//Connection/Comunication through Module to BD server.
let connection = require("./connection-wrapper");

async function login(user){//Login async Func.
    //Set var 'SQL' with query includes 'Params' to exe in DB model to approve, validate user Exists. 
    const sql = "SELECT id, user_type FROM users WHERE email = ? AND password = ?";
    const parameters = [user.email, user.password];
    //Async Execution of the Query.
    const userLoginResult = await connection.executeWithParams(sql, parameters);
    //VAR to hold server Response\Quary exe Result.
    //returns user login details.
    return userLoginResult[0];
}

async function create(user) {
    const sql = `INSERT INTO users(name ,last_name, email, password, city, street) Values (?,?,?,?,?,?)`;
    const parameters = [ user.name, user.last_name, user.email, user.password, user.city, user.street ];
    const info = await connection.executeWithParams(sql, parameters);
    user.id = info.insertId; // Get the new created id from the database.
    return user.id;
}

async function retriveBy(id) {
    const sql = "SELECT name, last_name, city, street FROM users WHERE id=?";
    let params = [id];
    let user = await connection.executeWithParams(sql, params);
    return user;
}
// retriveBy(1)

// async function update(user){//Maybe ill add as "customer profile" panel option.
//     const sql = "UPDATE users SET name = ?,last_name=?, email=?, password = ?, city=?, street=? where users.id =?";
//     const parameters = [user.name, user.last_name, user.email, user.password, user.city, user.street, user.id];
//     await connection.executeWithParams(sql, parameters);
//     console.log("Updated!");
// }
// // update({name:"tomer",last_name:"schwartz", email:"kap70tomer@gmail.com", password:"1234", city:"Shoham", street:"Mizpe 34", id: "1"})

async function deleteBy(id) {
    //Set user ID parameter for DELETE transaction.
    const parameters = id;
    
    //Delete from orders first..(FK won't allow delete otherways).   
    const sql1 = "DELETE FROM orders where user_id=?";
    //Commit to Delete from DB orders table.
    await connection.executeWithParameters(sql1, parameters);

    //Next Delete from shoppping carts table. (because FK appear here also..).
    const sql2 = "DELETE FROM shopping_carts where user_id=?";
    //Commit Delete users Carts from DB. table shopping carts.
    await connection.executeWithParameters(sql2, parameters);

    //Last Delete User from users table.
    const sql = "DELETE FROM users where id=?";
    //Commit last delete. leave no data of this id in DB tables.
    const deleteResponce = await connection.executeWithParameters(sql, parameters);
    //return SQL server response.
    return deleteResponce;
}


async function isUserExistByEmail(email){
    let sql = "Select id From users where email = ?"
    let parameter = email;
    let isExist = await connection.executeWithParams(sql, parameter);
    if(isExist){
        return true;
    }
    return false;
}

module.exports = {
    login,
    create,
    retriveBy,
    // update,
    deleteBy,
    isUserExistByEmail
};//l'crrud 