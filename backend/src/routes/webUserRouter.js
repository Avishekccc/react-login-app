import { Router } from "express";
import {
  createWebUserController,
  deleteSpecificWebUserController,
  forgotPasswordWebUserController,
  loginWebUserController,
  myProfileWebUserController,
  readAllWebUserController,
  readSpecificWebUserController,
  resetPasswordWebUserController,
  updateMyProfileWebUserController,
  updatePasswordWebUserController,
  updateSpecificWebUserController,
  verifyEmail,
} from "../controller/webUserController.js";
import isAuthenticated from "../middleware/isAuthenticate.js";
import authorized from "../middleware/authorized.js";

let webUserRouter = Router();

webUserRouter
  .route("/")
  .post(createWebUserController)
  .get(
    isAuthenticated,
    authorized(["admin", "superadmin"]),
    readAllWebUserController
  );

webUserRouter.route("/verify-email").patch(verifyEmail);

webUserRouter.route("/login").post(loginWebUserController);

webUserRouter
  .route("/my-profile")
  .get(isAuthenticated, myProfileWebUserController);

webUserRouter
  .route("/update-profile")
  .patch(isAuthenticated, updateMyProfileWebUserController);

webUserRouter
  .route("/update-password")
  .patch(isAuthenticated, updatePasswordWebUserController);

webUserRouter.route("/forgot-password").post(forgotPasswordWebUserController);
webUserRouter
  .route("/reset-password")
  .patch(isAuthenticated, resetPasswordWebUserController);
// always place dynamic route at last

webUserRouter
  .route("/:id")
  .get(
    isAuthenticated,
    authorized(["admin", "superadmin"]),
    readSpecificWebUserController
  )
  .patch(
    isAuthenticated,
    authorized(["admin", "superadmin"]),
    updateSpecificWebUserController
  )
  .delete(
    isAuthenticated,
    authorized(["superadmin"]),
    deleteSpecificWebUserController
  );

export default webUserRouter;
