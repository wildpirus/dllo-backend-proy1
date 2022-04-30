const Joi = require('joi');

const id = Joi.string();
const product_id = Joi.string();
const user_id = Joi.string();


const createHistorySchema = Joi.object({
  product_id: product_id.required(),
  user_id: user_id.required()
});

const getHistorySchema = Joi.object({
  id: id.required(),
});

const getHistoryByUserSchema = Joi.object({
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
});
const model = mongoose.model('history',mySchema);

module.exports = {
  createHistorySchema,
  getHistorySchema,
  getHistoryByUserSchema,
  model
}
