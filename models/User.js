import { Schema, model } from "mongoose";
import { fixSaveError, fixUpdateSettings } from "./hooks.js"
import Joi from 'joi'

const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const subscripList = ["starter", "pro", "business"]

const userSchema = new Schema({
     password: {
    type: String,
        required: [true, 'Set password for user'],
  },
  email: {
    type: String,
      required: [true, 'Email is required'],
    match: emailRegexp,
    unique: true,
  },
  subscription: {
    type: String,
    enum: subscripList,
    default: "starter"
  },
  token: String,
  avatarURL: String,
}, {versionKey: false, timestamps: true})

userSchema.pre("findOneAndUpdate", fixUpdateSettings)

userSchema.post("save", fixSaveError)
userSchema.post("findOneAndUpdate", fixSaveError)

const User = model('user', userSchema)

export const userRegSchema = Joi.object({
    password: Joi.string().required(), 
  email: Joi.string().required().pattern(emailRegexp),
})
export const userSubscripSchema = Joi.object({
  subscription: Joi.string().valid(...subscripList).required().messages({
    'any.required': 'subscription is required'
  })
})

export default User