const boom = require('@hapi/boom');
const { model } = require('../schemas/userSchema');
const bcrypt = require("bcrypt");

class UsersService {

  //Register
  async create(data) {
    const foundUser = await model.findOne({ username: data.username });
    if (foundUser) {
      throw boom.conflict('Username in use');
    }
    const salt = await bcrypt.genSalt(10);
    data.password = await bcrypt.hash(data.password, salt);
    const newUser = await new model(data);
    await newUser.save();
    return newUser;
  }

  //Get user
  async findOne(id) {
    const foundUser =  await model.findById(id,'-password');
    if (!foundUser) {
      throw boom.notFound('User not found');
    }
    return foundUser;
  }

  //Login
  async login(data) {
    const foundUser = await model.findOne({ username: data.username });
    if (!foundUser) {
      throw boom.notFound('Username not found');
    }
    const matchedPassword = await bcrypt.compare(data.password, foundUser.password);
    if (!matchedPassword){
      throw boom.notFound('Incorrect password');
    }
    return foundUser;
  }

  //Prev login
  async prevLogin(id) {
    const foundUser = await model.findById(id,'-password');
    if (!foundUser) {
      throw boom.notFound('User not found');
    }
    return foundUser;
  }
}

module.exports = UsersService;
