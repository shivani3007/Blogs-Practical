const Joi = require('joi');
const {ROLES} = require('../utils/enums');

exports.register = {
    body : Joi.object({
        firstName : Joi.string().required().min(3),
        lastName : Joi.string().required(),
        email : Joi.string().email().required(),
        password: Joi.string().required(),
        dob:Joi.string().required(),
        role: Joi.string().required().valid(...Object.values(ROLES)),
    })
}

exports.login = {
    body: Joi.object({
        email : Joi.string().email().required(),
        password: Joi.string().required(),
    })
}