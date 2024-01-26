import HttpError from '../helpers/HttpError.js'
import {contactAddSchema, contactUpdateSchema, favoriteUpdateSchema} from "../models/Contact.js"
import Contact from '../models/Contact.js';
import fs from "fs/promises"
import path from 'path';
import gravatar from 'gravatar'

const avatarsPath = path.resolve("public", "avatars");

const getAll = async (req, res, next) => {
    try {
        const { _id: owner } = req.user
        const { page = 1, limit = 20, favorite } = req.query
        const skip = (page - 1) * limit
        if (!favorite) {
            const result = await Contact.find({ owner }, "name email phone favorite avatarURL", { skip, limit });
            res.json(result)
        } else {
            const result = await Contact.find({ owner, favorite: favorite }, "name email phone favorite avatarURL", { skip, limit });
            res.json(result)
        }
        
        
  
    } catch (error) {
       next(error)
    }
}
const getContact = async (req, res, next) => {
    try {
        const { contactId} = req.params
        const {_id: owner} = req.user
        const result = await Contact.findOne({_id:contactId, owner: owner}, "name email phone favorite avatarURL");
        if (!result) {
            throw HttpError(404, `Not found`)
        }

        res.json(result)
    } catch (error) {
        next(error)
    }
}
const add = async (req, res, next) => {
    try {
        const { error} = contactAddSchema.validate(req.body)
        if (error) {
            throw HttpError(400, error.message)
        }
        const { email, phone } = req.body
        const  avatarURL = gravatar.url(email, { s: 250, d: 'robohash'})
        const user = await Contact.findOne({ phone })
        if (user) {
            throw HttpError(409, "Phone in use")
        }

        const { _id: owner} = req.user
        const result = await Contact.create({...req.body, owner, avatarURL}, "name email phone favorite avatarURL");

        res.status(201).json(result)
    } catch (error) {
        next(error)
    }
}
const remove = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const {_id: owner} = req.user
        const result = await Contact.findOneAndDelete({_id: contactId, owner: owner});
        if (!result) {
            throw HttpError(404, 'Not found')
        }
        res.status(200).json({"message": "contact deleted"})
    } catch (error) {
        next(error);
    }
}
const updateStatusContact = async (req, res, next) => { 
    try {
        const { error } = contactUpdateSchema.validate(req.body)
        if (error) {
            throw HttpError(400, error.message)
        }
        const { contactId } = req.params
        const {_id: owner} = req.user
        const result = await Contact.findOneAndUpdate({_id:contactId, owner:owner}, req.body)
         if (!result) {
            throw HttpError(404, 'Not found')
        }
        res.status(200).json(result);
    } catch (error) {
        next(error)
    }
}
export default {
    getAll,
    getContact,
    add,
    remove,
    updateStatusContact
}