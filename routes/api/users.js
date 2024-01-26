import express from "express";
import isEmptyBody from "../../middlewares/isEmptyBody.js"
import usersController from "../../controllers/users-controller.js";
import isCheckHeaders from "../../middlewares/isCheckHeaders.js";
import ulpoad from "../../middlewares/upload.js";

const usersRouter = express.Router();

usersRouter.post("/register", isEmptyBody, usersController.signup);

usersRouter.post("/login", isEmptyBody, usersController.signin)

usersRouter.post("/logout", isCheckHeaders, usersController.sigout)

usersRouter.get("/current", isCheckHeaders, usersController.getCurrent)

usersRouter.patch("/", isCheckHeaders, isEmptyBody, usersController.updateSubs)

usersRouter.patch('/avatars', ulpoad.single('avatarURL'), isCheckHeaders, usersController.updateAvatars)

export default usersRouter