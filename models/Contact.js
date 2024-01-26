import { Schema, model } from "mongoose";
import { fixSaveError, fixUpdateSettings } from "./hooks.js"
import Joi from 'joi'

const contactSchema = new Schema({
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
        type: String,
        required: [true, 'Set email for contact'],
    },
    phone: {
        type: String,
        required: [true, 'Set phone for contact'],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    avatarURL: String,
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
  }, {versionKey: false, timestamps: true})

contactSchema.pre("findOneAndUpdate", fixUpdateSettings)

contactSchema.post("save", fixSaveError)
contactSchema.post("findOneAndUpdate", fixSaveError)

const Contact = model('contact', contactSchema)

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
    favorite: Joi.boolean().required()
})

export default Contact