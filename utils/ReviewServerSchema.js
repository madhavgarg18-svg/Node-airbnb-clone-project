const Joi = require('joi');

const reviewServerSchema = Joi.object({
  review: Joi.object({
    rating: Joi.number()
      .min(1)
      .max(5)
      .required()
      .messages({
        "number.base": "Rating must be a number.",
        "number.min": "Rating must be at least 1.",
        "number.max": "Rating cannot be more than 5.",
        "any.required": "Rating is required."
      }),

    content: Joi.string()
      .min(5)
      .required()
      .messages({
        "string.base": "Comment must be a string.",
        "string.empty": "Comment cannot be empty.",
        "string.min": "Comment must be at least 5 characters long.",
        "any.required": "Comment is required."
      })
  }).required()
});

module.exports = reviewServerSchema;
