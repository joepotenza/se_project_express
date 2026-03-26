const { Joi, celebrate } = require("celebrate");
const validator = require("validator");

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

module.exports.validateClothingItemData = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "any.required": "The 'name' field is required",
      "string.min": "The minimum length of the 'name' field is 2",
      "string.max": "The maximum length of the 'name' field is 30",
      "string.empty": "The 'name' field must not be empty",
    }),

    imageUrl: Joi.string().required().custom(validateURL).messages({
      "any.required": "The 'imageUrl' field is required",
      "string.empty": "The 'imageUrl' field must not be empty",
      "string.uri": "the 'imageUrl' field must be a valid URL",
    }),

    weather: Joi.string().required().valid("hot", "warm", "cold").messages({
      "any.required": "The 'weather' field is required",
      "any.only": "The 'weather' field must be one of ['hot', 'warm', 'cold']",
    }),
  }),
});

module.exports.validateUserData = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "any.required": "The 'name' field is required",
      "string.min": "The minimum length of the 'name' field is 2",
      "string.max": "The maximum length of the 'name' field is 30",
      "string.empty": "The 'name' field must be filled in",
    }),

    email: Joi.string().required().email().messages({
      "any.required": "The 'email' field is required",
      "string.empty": "The 'email' field must be filled in",
      "string.email": "The 'email' field must be a valid email address",
    }),

    password: Joi.string().required().messages({
      "any.required": "The 'password' field is required",
      "string.empty": "The 'password' field must be filled in",
    }),

    avatar: Joi.string().required().custom(validateURL).messages({
      "any.required": "The 'avatar' field is required",
      "string.empty": "The 'avatar' field must be filled in",
      "string.uri": "the 'avatar' field must be a valid URL",
    }),
  }),
});

module.exports.validateUserDataForUpdate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "any.required": "The 'name' field is required",
      "string.min": "The minimum length of the 'name' field is 2",
      "string.max": "The maximum length of the 'name' field is 30",
      "string.empty": "The 'name' field must be filled in",
    }),

    avatar: Joi.string().required().custom(validateURL).messages({
      "any.required": "The 'avatar' field is required",
      "string.empty": "The 'avatar' field must be filled in",
      "string.uri": "the 'avatar' field must be a valid URL",
    }),
  }),
});

module.exports.validateUserAuthenticationData = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      "any.required": "The 'email' field is required",
      "string.empty": "The 'email' field must be filled in",
      "string.email": "The 'email' field must be a valid email address",
    }),

    password: Joi.string().required().messages({
      "any.required": "The 'password' field is required",
      "string.empty": "The 'password' field must be filled in",
    }),
  }),
});

module.exports.validateClothingItemId = celebrate({
  params: Joi.object().keys({
    itemId: Joi.string().required().length(24).hex().messages({
      "any.required": "The 'itemId' field is required",
      "string.empty": "The 'itemId' field must be filled in",
      "string.length": "The 'itemId' field must be a valid object Id",
      "string.hex": "The 'itemId' field must be a valid object Id",
    }),
  }),
});
