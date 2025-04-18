import Joi from "joi";

const userValidation = Joi.object()
  .keys({
    name: Joi.string().min(3).max(30).required().messages({
      "string.base": "Name should be a type of text",
      "string.empty": "Name cannot be an empty field",
      "string.min": "Name should have a minimum length of {#limit}",
      "string.max": "Name should have a maximum length of {#limit}",
      "any.required": "Name is a required field",
    }),

    password: Joi.string()
      .pattern(
        new RegExp(
          "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})"
        )
      )
      .required()
      .messages({
        "string.pattern.base":
          "Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character",
        "string.empty": "Password cannot be an empty field",
        "any.required": "Password is a required field",
      }),

    phoneNumber: Joi.string()
      .pattern(new RegExp("^[0-9]{10}$"))
      .required()
      .messages({
        "string.pattern.base": "Phone number must be a 10-digit number",
        "string.empty": "Phone number cannot be an empty field",
        "any.required": "Phone number is a required field",
      }),

    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "org"] } })
      .required()
      .messages({
        "string.email": "Please enter a valid email address",
        "string.empty": "Email cannot be an empty field",
        "any.required": "Email is a required field",
      }),

    gender: Joi.string()
      .valid("male", "female", "non-binary", "other")
      .required()
      .messages({
        "any.only": "Gender must be one of male, female, non-binary, or other",
        "string.empty": "Gender cannot be an empty field",
        "any.required": "Gender is a required field",
      }),
  })
  .unknown(false);



export default userValidation