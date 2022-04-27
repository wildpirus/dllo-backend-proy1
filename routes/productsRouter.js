const express = require('express');

const ProductsService = require('../services/productsService');

const router = express.Router();
const service = new ProductsService();

router.get('/', async (req,res) => {
  const products = await service.find();
  res.json(products);
});

router.get('/filter', (req,res) => {
  res.send('Soy un filter');
});

router.get('/:id', async (req,res) => {
  const { id } = req.params;
  const product = await service.findOne(id);
  res.status(200).json(product);
});

router.post('/', async (req,res) => {
  const body = req.body;
  const newProduct = await service.create(body);
  res.status(201).json(newProduct);
});

router.patch('/:id', async (req,res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const product = await service.update(id,body);
    res.json({
      message: 'updated',
      product
    });
  } catch (error) {
    res.status(404).json({
      message: error.message
    });
  }
});

router.put('/:id', (req,res) => {
  const { id } = req.params;
  const body = req.body;
  res.json({
    message: 'All updated',
    id,
    body: body
  });
});

router.delete('/:id', async (req,res) => {
  const { id } = req.params;
  const rs = await service.delete(id);
  res.json(rs);
});

module.exports = router;
