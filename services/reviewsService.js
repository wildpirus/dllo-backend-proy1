const boom = require('@hapi/boom');
const { model } = require('../schemas/reviewSchema');

class ReviewsService {

  async create(data) {
    const newReview = await new model(data);
    await newReview.save();
    return newReview;
  }

  async findByProduct(product_id) {
    const foundReviews =  await model.find({ product_id: product_id }).sort({ rating: -1 });
    return foundReviews;
  }

  async findByUser(user_id) {
    const foundReviews =  await model.find({user_id: user_id}).sort({ rating: -1 });
    return foundReviews;
  }

}

module.exports = ReviewsService;
