const express = require('express');

const usersRouter = require('./usersRouter');
const postsRouter = require('./postsRouter');
const reviewsRouter = require('./reviewsRouter');
const historyRouter = require('./historyRouter');
const cartRouter = require('./cartRouter');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/', express.Router().get('/',
    async (req,res, next) => {
      try {
        res.status(200).send("Welcome to the backend API for CADITO!");
      } catch (error) {
        next(error);
      }
    }
  ));
  router.use('/users', usersRouter);
  router.use('/posts', postsRouter);
  router.use('/reviews', reviewsRouter);
  router.use('/history', historyRouter);
  router.use('/cart', cartRouter);
}

module.exports = routerApi;
