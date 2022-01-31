const joi = require("joi");

class CartItem {

    constructor(product_id, name, quantity, total_price, cart_id) {
        this.product_id = product_id;
        this.name = name;
        this.quantity = quantity;
        this.total_price = total_price;
        this.cart_id = cart_id;
    };

    static validate(cartItemToValidate) {
        const validationSchema = {
            product_id: joi.number().required(),
            name: joi.string().required(),
            quantity: joi.number().required(),
            total_price: joi.number().required(),
            cart_id: joi.number().required(),
        };

        const error = joi.validate(cartItemToValidate, validationSchema, { abortEarly: false }).error;

        if (error) {
            return error.details.map(err => err.message);
        }
        return null;

    };

};

module.exports = CartItem;