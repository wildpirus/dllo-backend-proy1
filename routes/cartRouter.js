const express = require('express');

const CartService = require('../services/cartService');
const validatorHandler = require('../middlewares/validatorHandler');
const {
  createCartSchema,
  getCartSchema,
  removeFromCartSchema,
  buyCartSchema
} = require('../schemas/cartSchema');


const router = express.Router();
const service = new CartService();

//Get cart
router.get('/',
  validatorHandler(getCartSchema, 'query'),
  async (req,res, next) => {
    try {
      const { user_id } = req.query;
      const cart = await service.findByUser(user_id);
      res.status(200).json(cart);
    } catch (error) {
      next(error);
    }
  }
);

//Add to cart
router.post('/',
  validatorHandler(createCartSchema, 'body'),
  async (req,res, next) => {
    try {
      const body = req.body;
      const newCart = await service.add(body);
      res.status(201).json(newCart);
    } catch (error) {
      next(error);
    }
  }
);

//Remove from cart
router.delete('/',
  validatorHandler(removeFromCartSchema, 'query'),
  async (req,res) => {
    try {
      const { item_id } = req.query;
      const cart = await service.delete(item_id);
      res.status(200).json(cart);
    } catch (error) {
      next(error);
    }
  }
);

//buy cart
router.post('/buy',
  validatorHandler(buyCartSchema, 'body'),
  async (req,res, next) => {
    try {
      const { user_id } = req.body;
      const buyedCart = await service.buy(user_id);
      res.status(201).json(buyedCart);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
