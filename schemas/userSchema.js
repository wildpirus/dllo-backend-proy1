const Joi = require('joi');

const user_id = Joi.string();
const display_name = Joi.string();
const username = Joi.string();
const password = Joi.string();


const createUserSchema = Joi.object({
  display_name: display_name.required(),
  username: username.required(),
  password: password.required()
});

const loginUserSchema = Joi.object({
  username: username.required(),
  password: password.required()
});

const getUserSchema = Joi.object({
  user_id: user_id.required(),
});

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mySchema = new Schema({
  display_name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});
const model = mongoose.model('user',mySchema);

module.exports = {
  createUserSchema,
  loginUserSchema,
  getUserSchema,
  model
}
