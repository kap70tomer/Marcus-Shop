let ErrorType = {
    
    GENERAL_ERROR : {id: 1, httpCode: 600, message : "A big fuck up which we'll never tell you of had just happend. And now : A big fat lie....'A general error ....'", isShowStackTrace: true},
    EMAIL_ALREADY_EXIST : {id: 2, httpCode: 601, message : "This Email is already in use.", isShowStackTrace: false},
    UNAUTHORIZED : {id: 3, httpCode: 401, message : "Login failed, invalid user name or password", isShowStackTrace: false},
    NOT_FOUND : {id:4, httpCode: 604, message: "Whatever it is, it can NOT be found.", isShowStackTrace: false},
    NO_USERS_IN_DATABASE: { id: 5, httpCode: 603, message: "No users in db", isShowStackTrace: false },
    NO_ROWS_WERE_DELETED: { id: 6, httpCode: 604, message: "Delete failed", isShowStackTrace: false },
    NO_USER_IN_DATABASE: { id: 7, httpCode: 605, message: "User does not exist in db", isShowStackTrace: false },
    INFORMATION_TYPE_IS_NOT_VALID: { id: 8, httpCode: 606, message: "Inputs Data is not valid", isShowStackTrace: false },
    NO_PRODUCTS_IN_DATABASE: { id: 9, httpCode: 607, message: "No Products found in db", isShowStackTrace: false },
    PRODUCT_DOES_NOT_EXIST: { id: 10, httpCode: 404, message: "No Product found, with this ID", isShowStackTrace: false },
    PRODUCT_NAME_EXIST: { id: 11, httpCode: 609, message: "Product name is already taken", isShowStackTrace: false },
    NO_ORDERS_IN_DATABASE: { id: 12, httpCode: 610, message: "No orders in db", isShowStackTrace: false },
    USER_DONT_HAVE_ORDER: { id: 13, httpCode: 611, message: "No order for this user ", isShowStackTrace: false },
    NO_CATEGORIES_IN_DATABASE: { id: 15, httpCode: 613, message: "No CATEGORIES in db", isShowStackTrace: false },
    NO_PRODUCTS_IN_THIS_CATEGORIES_IN_DATABASE: { id: 17, httpCode: 615, message: "no products in the category", isShowStackTrace: false },
    NO_CARTS_IN_DATABASE: { id: 18, httpCode: 616, message: "no carts in the db", isShowStackTrace: false },
    UPDATE_FAILED: { id: 19, httpCode: 409, message: "DB did NOT succeed to update", isShowStackTrace: false },
    FAILED_TO_CLOSE_CART: { id: 20, httpCode: 600, message: "couldnt Change Cart Status", isShowStackTrace: false},
    FAILED_TO_ORDER: { id: 21, httpCode: 610, message:"Failed to set order in DB", isShowStackTrace: false},
    FAILED_TO_ADD_ITEM: {id: 22, httpCode: 606, message: "Failed to Add Cart Item to DB", isShowStackTrace: false},
    FAILED_TO_LOAD_CART_ITEMS: { id:23 , httpCode:666 , message: "could not retrive cart items and load this cart", isShowStackTrace: false },
    DATE_IS_FULL: { id:24 , httpCode:667 , message: "This Date Is Fully booked with deliveries.", isShowStackTrace: false },
    
     

}

module.exports = ErrorType;