const Joi = require('joi');

const listingSchema = Joi.object({
    listing: Joi.object({
        title: Joi.string()
                  .pattern(/^[a-zA-Z\s]+$/)
                  .required()
                  .messages({
                      "string.pattern.base": `"title" must contain only letters and spaces`
                  }),
        description: Joi.string()
  .pattern(/^[a-zA-Z0-9\s,\.]+$/)
  .required()
  .messages({
    "string.pattern.base": `"description" can only contain letters, numbers, spaces, commas, and periods`
  }),

       location: Joi.string()
  .pattern(/^[a-zA-Z0-9\s,]+$/)
  .required()
  .messages({
    "string.pattern.base": `"location" can only contain letters, digits, commas, and spaces`
  }),

        country: Joi.string()
                    .pattern(/^[a-zA-Z\s]+$/)
                    .required()
                    .messages({
                        "string.pattern.base": `"country" must contain only letters and spaces`
                    }),
        price: Joi.number().required().min(0),
        image: Joi.string().allow("", null)
    }).required()
});

module.exports = listingSchema;
