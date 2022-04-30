const express = require('express');

const HistoryService = require('../services/historyService');
const validatorHandler = require('../middlewares/validatorHandler');
const {
  getHistoryByUserSchema
} = require('../schemas/historySchema');


const router = express.Router();
const service = new HistoryService();

//Get by User
router.get('/:user_id',
  validatorHandler(getHistoryByUserSchema, 'params'),
  async (req,res) => {
    try {
      const { user_id } = req.params;
      const history = await service.findByUser(user_id);
      res.status(200).json(history);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
