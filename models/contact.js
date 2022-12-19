const {Schema, model} = require("mongoose");
const Joi = require("joi");

const {handleMongooseError} = require("../helpers");

const contactSchema = new Schema ({
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },     
})

contactSchema.post("save", handleMongooseError)

const addShema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string().required(),
  email: Joi.string().required(),
  favorite: Joi.boolean(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
})

// const schemas ={
//   addShema,
//   updateFavoriteSchema,
// }

const Contact = model("contact", contactSchema)

module.exports ={
  Contact,
  addShema,
  updateFavoriteSchema,
} 