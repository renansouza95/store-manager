const express = require('express');

const SalesController = require('../controllers/sales');
const SaleValidation = require('../middlewares/salesValidator');

const router = express.Router();

router
  .get('/', SalesController.getAll)
  .get('/:id', SalesController.getById)
  .post(
    '/',
    SaleValidation.idValidator,
    SaleValidation.quantValidator,
    SalesController.create,
  )
  .put(
    '/:id',
    SaleValidation.idValidator,
    SaleValidation.quantValidator,
    SalesController.update,
  )
  .delete('/:id', SalesController.deleteById);

module.exports = router;