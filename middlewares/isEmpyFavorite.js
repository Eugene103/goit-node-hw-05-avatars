import HttpError from '../helpers/HttpError.js'

const isEmptyFavorite = (req, res, next) => {
    const { length } = Object.keys(req.body)
    if (!length) {
        return next(HttpError(400, "missing field favorite"))
    }
    next();
}
export default isEmptyFavorite