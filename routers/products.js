const express = require('express');

const ProductController = require('../controllers/products');
const ProductValidation = require('../middlewares/productsValidator');

const router = express.Router();

router
  .get('/', ProductController.getAll)
  .get('/:id', ProductController.getById)
  .post(
    '/',
    ProductValidation.nameValidator,
    ProductValidation.quantValidator,
    ProductController.create,
  )
  .put(
    '/:id',
    ProductValidation.nameValidator,
    ProductValidation.quantValidator,
    ProductController.update,
  )
  .delete('/:id', ProductController.deleteById);

module.exports = router;