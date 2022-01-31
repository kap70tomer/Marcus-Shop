const joi = require("joi");

class Cart {

    constructor(id, user_id, creation_date, isChecked) {
        this.id = id;
        this.user_id = user_id;
        this.creation_date = creation_date;
        this.isChecked = isChecked;
    };

    static validate(cartToValidate) {
        const validationSchema = {
            id: joi.required(),
            user_id: joi.number().required(),
            isChecked: joi.required(),
        };

        const error = joi.validate(cartToValidate, validationSchema, { abortEarly: false }).error;

        if (error) {
            return error.details.map(err => err.message);
        }
        return null;

    };

};

module.exports = Cart;