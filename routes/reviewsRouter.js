const express = require('express');

const ReviewsService = require('../services/reviewsService');
const validatorHandler = require('../middlewares/validatorHandler');
const {
  createReviewSchema,
  getReviewsSchema
} = require('../schemas/reviewSchema');


const router = express.Router();
const service = new ReviewsService();

//Create review
router.post('/',
  validatorHandler(createReviewSchema, 'body'),
  async (req,res, next) => {
    try {
      const body = req.body;
      const newReview = await service.create(body);
      res.status(201).json(newReview);
    } catch (error) {
      next(error);
    }
  }
);

//Recent posts
router.get('/',
  validatorHandler(getReviewsSchema, 'query'),
  async (req,res) => {
    try {
      if (req.query.product_id){
        const { product_id } = req.query;
        const reviews = await service.findByProduct(product_id);
        res.status(200).json(reviews);
      }else if (req.query.user_id){
        const { user_id } = req.query;
        const reviews = await service.findByUser(user_id);
        res.status(200).json(reviews);
      }else {
        res.status(200).json({data: ""});
      }
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
