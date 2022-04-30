const Joi = require('joi');

const id = Joi.string();
const product_id = Joi.string();
const user_id = Joi.string();


const createCartSchema = Joi.object({
  product_id: product_id.required(),
  user_id: user_id.required()
});

const getCartSchema = Joi.object({
  user_id: user_id.required(),
});

const removeFromCartSchema = Joi.object({
  item_id: id.required(),
});

const buyCartSchema = Joi.object({
  user_id: user_id.required(),
});

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mySchema = new Schema({
  product_id: {
    type: Schema.Types.ObjectId,
    required: true
  },
  user_id: {
    type: Schema.Types.ObjectId,
    required: true
  }
}, { timestamps: { createdAt: 'created_date' } });
const model = mongoose.model('cart',mySchema);

module.exports = {
  createCartSchema,
  getCartSchema,
  removeFromCartSchema,
  buyCartSchema,
  model
}
