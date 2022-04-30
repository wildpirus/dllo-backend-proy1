const Joi = require('joi');

const id = Joi.string();//.uuid();
const owner_id = Joi.string();
const img_url = Joi.string().uri();
const display_name = Joi.string();
const description = Joi.string();
const price = Joi.number().min(0);


const createPostSchema = Joi.object({
  owner_id: owner_id.required(),
  img_url: img_url,
  display_name: display_name.required(),
  description: description,
  price: price.required()
});

const updatePostSchema = Joi.object({
  img_url: img_url,
  display_name: display_name,
  description: description,
  price: price
});

const getPostSchema = Joi.object({
  post_id: id,
  user_id: owner_id
});

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mySchema = new Schema({
  owner_id: {
    type: Schema.Types.ObjectId,
    required: true
  },
  img_url: String,
  display_name: {
    type: String,
    required: true
  },
  description: String,
  price: {
    type: Number,
    required: true
  }
}, { timestamps: { createdAt: 'created_date' } });
const model = mongoose.model('post',mySchema);

module.exports = {
  createPostSchema,
  updatePostSchema,
  getPostSchema,
  model
}
