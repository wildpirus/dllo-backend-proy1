const express = require('express');

const PostsService = require('../services/postsService');
const validatorHandler = require('../middlewares/validatorHandler');
const {
  createPostSchema,
  updatePostSchema,
  getPostSchema
} = require('../schemas/postSchema');


const router = express.Router();
const service = new PostsService();

//Get post
router.get('/',
  validatorHandler(getPostSchema, 'query'),
  async (req,res, next) => {
    try {
      if (req.query.post_id) {
        const post = await service.findOne(req.query.post_id);
        res.status(200).json(post);
      } else if(req.query.user_id){
        const posts = await service.findByUser(req.query.user_id);
        res.status(200).json(posts);
      }else {
        res.status(200).json({data: ""});
      }
    } catch (error) {
      next(error);
    }
});

//Create post
router.post('/',
  validatorHandler(createPostSchema, 'body'),
  async (req,res, next) => {
    try {
      const body = req.body;
      const newPost = await service.create(body);
      res.status(201).json(newPost);
    } catch (error) {
      next(error);
    }
  }
);

//Recent posts
router.get('/recent',
  async (req,res) => {
    try {
      const posts = await service.findRecent();
      res.status(200).json(posts);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
