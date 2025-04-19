import bcrypt from "bcrypt";
import expressAsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { secretKey } from "../../constant.js";
import {
  creatWebUserService,
  deleteSpecificWebUserService,
  forgotPasswordWebUserService,
  loginWebUserService,
  readAllWebUserService,
  readSpecificWebUserService,
  resetPasswordWebUserService,
  updateMyProfileWebUsersrvice,
  updatePasswordWebUsersrvice,
  updateSpecificWebUserService,
  updateWebUserService,
} from "../service/webUserService.js";
import { sendEmail } from "../utils/sendmail.js";

export const createWebUserController = expressAsyncHandler(
  async (req, res, next) => {
    let data = req.body;
    let hashPassword = await bcrypt.hash(data.password, 10);
    data = {
      ...data,
      isVerifiedEmail: false,
      password: hashPassword,
    };
    data.password = hashPassword;
    let result = await creatWebUserService(data);

    // generate token
    let info = {
      id: result._id,
    };
    let expiryInfo = {
      expiresIn: "365d",
    };

    let token = jwt.sign(info, secretKey, expiryInfo);

    await sendEmail({
      from: "Avishek <shahabhishek513@gmail.com>",
      to: data.email,
      subject: "account created",
      html: `<h1>You have successfully Registered in our system.</h1>
      <a href="https://react-login-backend-yoap.onrender.com/verify-email?token=${token}">
      https://react-login-backend-yoap.onrender.com/verify-email?token=${token}
      </a>
      <h1>Click link to verify your email</h1>
      `,
    });
    res.status(201).json({
      sucess: true,
      message: "WebUser created successfully.",
      data: result,
    });
  }
);

export const readAllWebUserController = expressAsyncHandler(
  async (req, res, next) => {
    let result = await readAllWebUserService({});
    res.status(200).json({
      success: true,
      message: "WebUser read successfully",
      result: result,
    });
  }
);

export const readSpecificWebUserController = expressAsyncHandler(
  async (req, res, next) => {
    let id = req.params.id;
    let result = await readSpecificWebUserService(id);
    res.status(200).json({
      success: true,
      message: "WebUser read successfully",
      result: result,
    });
  }
);

export const updateSpecificWebUserController = expressAsyncHandler(
  async (req, res, next) => {
    let id = req.params.id;
    let data = req.body;
    delete data.email;
    delete data.password;
    let result = await updateSpecificWebUserService(id, data);
    res.status(201).json({
      success: true,
      message: "WebUser updated successfully",
      result: result,
    });
  }
);

export const deleteSpecificWebUserController = expressAsyncHandler(
  async (req, res, next) => {
    let result = await deleteSpecificWebUserService(req.params.id);
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      result: result,
    });
  }
);

export const verifyEmail = expressAsyncHandler(async (req, res, next) => {
  let tokenString = req.headers.authorization;
  let tokenArray = tokenString.split(" ");
  let token = tokenArray[1];
  let infoObj = await jwt.verify(token, secretKey);
  let userId = infoObj.id;
  // console.log(userId)
  let result = await updateWebUserService(userId);
  res.status(200).json({
    success: true,
    message: "user verified success.",
  });
});

export const loginWebUserController = expressAsyncHandler(
  async (req, res, next) => {
    let user = await loginWebUserService(req.body.email);
    if (user) {
      if (user.isVerifiedEmail) {
        let isValidPassword = await bcrypt.compare(
          req.body.password,
          user.password
        );
        if (isValidPassword) {
          /* 
      generate token 
      send token to postman
      */
          let info = {
            id: user._id,
          };

          let expiresInfo = {
            expiresIn: "365d",
          };
          let token = jwt.sign(info, secretKey, expiresInfo);
          res.status(200).json({
            success: true,
            message: "login successfully.",
            data: user,
            token: token,
          });
        } else {
          res.status(400).json({
            success: false,
            message: "crediential does not match",
          });
        }
      } else {
        res.status(400).json({
          success: false,
          message: "crediential does not match",
        });
      }
    } else {
      res.status(400).json({
        success: false,
        message: "crediential does not match",
      });
    }
  }
);

export const myProfileWebUserController = expressAsyncHandler(
  async (req, res, next) => {
    let result = await readSpecificWebUserService(req.id);
    // console.log("444654564dsaf")
    res.status(200).json({
      success: true,
      message: "WebUser read successfully",
      result: result,
    });

    /* 
    send token from postman
    get token from postman
    verify token
        if not verify throw error
        else
           get id from token
           get profile details from WebUser id
           send profile info to postman
    
    */
  }
);

export const updateMyProfileWebUserController = expressAsyncHandler(
  async (req, res, next) => {
    let data = req.body;
    // console.log(data);
    delete data.email;
    delete data.password;
    let result = await updateMyProfileWebUsersrvice(req.id, data);
    res.status(201).json({
      sucess: true,
      message: "profile updated successfully",
      result: result,
    });
  }
);

export const updatePasswordWebUserController = expressAsyncHandler(
  async (req, res, next) => {
    let id = req.id;
    // console.log(id)
    let oldPassword = req.body.oldPassword;
    let newPassword = req.body.newPassword;

    let data = await readSpecificWebUserService(id);
    // console.log(data)
    let hashPassword = data.password;
    // console.log(hashPassword)

    let isValidPassword = await bcrypt.compare(oldPassword, hashPassword);

    if (isValidPassword) {
      let newHashPassword = await bcrypt.hash(newPassword, 10);
      let result = await updatePasswordWebUsersrvice(id, {
        password: newHashPassword,
      });

      res.status(201).json({
        success: true,
        message: "password updated successfully.",
        result: result,
      });
    } else {
      let error = new Error("crediential does not match.");
      throw error;
    }
  }
);

export const forgotPasswordWebUserController = expressAsyncHandler(
  async (req, res, next) => {
    let email = req.body.email;
    let result = await forgotPasswordWebUserService(email);
    // console.log(result)
    if (result) {
      let info = {
        id: result._id,
      };

      let expiresInfo = {
        expiresIn: "365d",
      };
      let token = jwt.sign(info, secretKey, expiresInfo);

      await sendEmail({
        from: "Avishek <shahabhishek513@gmail.com>",
        to: result.email,
        subject: "Reset password",
        html: `<h1>Please click given link to reset password.</h1>
      <a href="http://localhost:3000/reset-password?token=${token}">
      http://localhost:3000/reset-password?token=${token}
      </a>
      `,
      });
      res.status(200).json({
        success: true,
        message: "To rest password link has been send to email.",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "email does not exists.",
      });
    }
  }
);

export const resetPasswordWebUserController = expressAsyncHandler(
  async (req, res, next) => {
    let id = req.id;
    // console.log(id);
    let hashPassword = await bcrypt.hash(req.body.password, 10);

    let result = await resetPasswordWebUserService(id, {
      password: hashPassword,
    });

    res.status(201).json({
      success: "true",
      message: "password reset successfully.",
    });
  }
);
