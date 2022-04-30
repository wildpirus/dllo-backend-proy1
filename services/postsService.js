const boom = require('@hapi/boom');
const { model } = require('../schemas/postSchema');

class PostsService {

  async create(data) {
    const newPost = await new model(data);
    await newPost.save();
    return newPost;
  }

  async findOne(id) {
    const foundPost =  await model.findById(id);
    return foundPost;
  }

  async findByUser(user_id) {
    const foundPosts =  await model.find({owner_id: user_id});
    return foundPosts;
  }

  async findRecent(){
    const foundPosts = await model.find({},' -updatedAt').sort({ updatedAt : -1});
    return foundPosts;
  }

}

module.exports = PostsService;
