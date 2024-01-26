import Joi from 'joi'

export const contactAddSchema = Joi.object({
    name: Joi.string().required().messages({
        'any.required': `"name" missing required name field`, 
    }),
    email: Joi.string().required().messages({
        'any.required': `"email" missing required email field`, 
    }),
    phone: Joi.string().required().messages({
        'any.required': `"phone" missing required phone field`, 
    }),
    favorite: Joi.boolean(),
})

export const contactUpdateSchema = Joi.object({
    name: Joi.string(),
    email: Joi.string(),
    phone: Joi.string(),
    favorite: Joi.boolean(),
})

export const favoriteUpdateSchema = Joi.object({
    favorite: Joi.boolean()
})