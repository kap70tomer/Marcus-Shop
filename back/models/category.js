const joi = require("joi");

class Category {

    constructor(category) {
        this.category = category;
    };

    static validate(categoryToValidate) {
        const validationSchema = {
            id: joi.number().optional(),
            name: joi.string().required(),
        };

        const error = joi.validate(categoryToValidate, validationSchema, { abortEarly: false }).error;

        if (error) {
            return error.details.map(err => err.message);
        }
        return null;

    };

};

module.exports = Category;