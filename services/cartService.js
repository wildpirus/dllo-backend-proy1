const boom = require('@hapi/boom');
const { model } = require('../schemas/cartSchema');
const historyModel = require('../schemas/historySchema').model;

class CartService {

  async findByUser(user_id) {
    const foundCart = await model.find({ user_id: user_id });
    return foundCart;
  }

  async add(data){
    const newCart = await new model(data);
    await newCart.save();
    return newCart;
  }

  async delete(id){
    return await model.findByIdAndDelete(id);
  }

  async buy(user_id){
    const productsOnCart = model.find({ user_id: user_id }).sort({ created_at: -1 });
    await Promise.all(productsOnCart.map((product) => {
      return historyModel.create({
        product_id: product.product_id,
        user_id: product.user_id
      });
    }));
    await model.deleteMany({ user_id: user_id });
    return {res: 'successful!'};
  }

}

module.exports = CartService;
