const express = require('express');

const SalesController = require('../controllers/sales');

const router = express.Router();

router
  .get('/', SalesController.getAll)
  .get('/:id', SalesController.getById)
  .post('/', SalesController.create);
  // .put('/:id', SalesController.update)
  // .delete('/:id', SalesController.deleteById);

module.exports = router;