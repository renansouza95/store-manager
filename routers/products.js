const express = require('express');

const ProductController = require('../controllers/products');

const router = express.Router();

router
  .get('/', ProductController.getAll)
  .get('/:id', ProductController.getById)
  .post('/', ProductController.create)
  .put('/:id', ProductController.update)
  .delete('/:id', ProductController.deleteById);

module.exports = router;