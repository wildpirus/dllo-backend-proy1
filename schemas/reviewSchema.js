const Joi = require('joi');

const id = Joi.string();
const user_id = Joi.string();
const product_id = Joi.string();
const rating = Joi.number().min(0);
const description = Joi.string();


const createReviewSchema = Joi.object({
  user_id: user_id.required(),
  product_id: product_id.required(),
  rating: rating.required(),
  description: description
});

const updateReviewSchema = Joi.object({
  rating: rating,
  description: description
});

const getReviewSchema = Joi.object({
  id: id.required(),
});

const getReviewsSchema = Joi.object({
  product_id: product_id,
  user_id: user_id
});

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mySchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    required: true
  },
  product_id: {
    type: Schema.Types.ObjectId,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  description: String
}, { timestamps: { createdAt: 'created_date' } });
const model = mongoose.model('review',mySchema);

module.exports = {
  createReviewSchema,
  updateReviewSchema,
  getReviewSchema,
  getReviewsSchema,
  model
}
