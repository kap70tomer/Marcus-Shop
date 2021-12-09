const joi = require("joi");

class Product {

    constructor(id, name, category_id, price, picture) {
        this.id = id;
        this.name = name;
        this.category_id = category_id;
        this.price = price;
        this.picture = picture;
    };

    static validate(itemToValidate) {
        const validationSchema = {
            id: joi.number().optional(),
            name: joi.string().required(),
            category_id: joi.number().required(),
            price: joi.number().required(),
            picture: joi.optional(),
        };

        const error = joi.validate(itemToValidate, validationSchema, { abortEarly: false }).error;

        if (error) {
            return error.details.map(err => err.message);
        }
        return null;

    };

};

module.exports = Product;