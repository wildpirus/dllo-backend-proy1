const boom = require('@hapi/boom');
const { model } = require('../schemas/historySchema');

class HistoryService {

  async findByUser(user_id) {
    const foundHistory = await model.find({ user_id: user_id })
    return foundHistory;
  }

}

module.exports = HistoryService;
