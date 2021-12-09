const joi = require("joi");

class Order {

    constructor(id ,user_id, cart_id, total_price, city_delivery, street_delivery, date_delivery, credit) {
        this.id = id;
        this.user_id = user_id;
        this.cart_id = cart_id;
        this.total_price = total_price;
        this.city_delivery = city_delivery;
        this.street_delivery = street_delivery;
        this.date_delivery = date_delivery;
        this.credit = credit;
    };

    static validate(purchaseToValidate) {
        const validationSchema = {
            id: joi.number().optional(),
            user_id: joi.number().optional(),
            cart_id: joi.number().required(),
            total_price: joi.number().optional(),
            city_delivery: joi.string().required(),
            street_delivery: joi.string().required(),
            date_delivery: joi.date().required(),
            credit: joi.number().min(4).positive().required(),
        };

        const error = joi.validate(purchaseToValidate, validationSchema, { abortEarly: false }).error;

        if (error) {
            return error.details.map(err => err.message);
        }
        return null;

    };

};

module.exports = Order;