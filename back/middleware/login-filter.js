const expressJwt = require('express-jwt');
const config = require('../config.json');

// Extracting the text from the secret's JSON
let { secret } = config;


function authenticateJwtRequestToken() {
    // Load secret into 
    //     for (let index = 0; index < mapUser.length; index++) {
    //         if ()
    // }
    return expressJwt({ secret }).unless({

        path: [
            // public routes that don't require authentication
            '/users/login',
            '/users/add',
            '/users/changePassword',
            '/orders/counter/total',
            '/products/counter/total',
            '/products',
            '/categories'
        ]
    });
}

module.exports = authenticateJwtRequestToken;