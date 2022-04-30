const Joi = require('joi');

const id = Joi.string();//.uuid();
const name = Joi.string().min(3).max(30);
const price = Joi.number().min(0);
const image = Joi.string().uri();


const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  image: image.required()
});

const updateProductSchema = Joi.object({
  name: name,
  price: price,
  image: image
});

const getProductSchema = Joi.object({
  id: id.required(),
});

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true
  }
});
const model = mongoose.model('product',mySchema);

module.exports = {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
  model
}
