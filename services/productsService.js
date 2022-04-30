const faker = require('faker');
const boom = require('@hapi/boom');
const { model } = require('../schemas/productSchema');

class ProductsService {

  constructor(){
    this.products = [];
    this.generate();
  }

  generate(){
    const limit = 100;//size ? size : 100;
    for (let index = 0; index < limit; index++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseFloat(faker.commerce.price(), 10),
        image: faker.image.imageUrl()
      });
    }
  }

  async create(data) {
    /*const newProduct = {
      id: faker.datatype.uuid(),
      ...data
    }
    this.products.push(newProduct);
    return newProduct;*/
    const newProduct = new model(data);
    newProduct.save();
  }

  async find() {
    return new Promise((resolve, reject)=> {
      resolve(model.find())
    });
  }

  async findOne(id) {
    const foundProduct =  await model.findById(id);//this.products.find(product => product.id === id);
    if (!foundProduct) {
      throw boom.notFound('Product not found');
    }
    /*if (foundProduct.isBlock) {
      throw boom.conflict('product is block');
    }*/
    return foundProduct;
  }

  async update(id, changes) {
    const foundProduct = await model.findById(id);
    if (!foundProduct) {
      throw boom.notFound('Product not found');
    }
    /*Object.keys(changes).map(key => {
      foundProduct[key] = changes[key];
    });
    const savedProduct = await foundProduct.save();
    return savedProduct;*/
    return (await model.updateOne({_id: id},changes)).acknowledged;
  }

  async delete(id) {
    const foundProduct = await model.findById(id);
    if (!foundProduct) {
      throw boom.notFound('Product not found');
    }
    return await model.deleteOne({_id: id});
  }
}

module.exports = ProductsService;
