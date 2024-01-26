import { isValidObjectId } from "mongoose";
import HttpError from "../helpers/HttpError.js";

const isCheckId = (req, res, next)=> {
    const {contactId} = req.params;
    if(!isValidObjectId(contactId)) {
        return next(HttpError(404, `${contactId} not valid id`))
    }
    next();
}

export default isCheckId
