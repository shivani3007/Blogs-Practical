const Joi = require('joi');
const {BLOG_STATUS} = require('../utils/enums');

exports.create = {
    body : Joi.object({
        title : Joi.string().required(),
        category: Joi.string().required(),
        description:Joi.string().required(),
        status: Joi.string().required().valid(...Object.values(BLOG_STATUS)),
    })
}