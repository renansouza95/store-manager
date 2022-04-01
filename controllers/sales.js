const SaleModel = require('../models/sales');
const SaleService = require('../services/sales');

const MSG_ERROR = 'Sale not found';

const getAll = async (req, res) => {
  try {
    const sales = await SaleModel.getAll();
    return res.status(200).json(sales);
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const sale = await SaleService.getById(id);
    if (!sale || sale.length === 0) return res.status(404).json({ message: MSG_ERROR });
    return res.status(200).json(sale);
  } catch (error) {
    return res.status(404).json({ message: MSG_ERROR });
  }
};

const create = async (req, res) => {
  try {
    const product = await SaleService.create(req.body);
    return res.status(201).json(product);
  } catch (error) {
    return res.status(409).json({ message: 'Sale already exists' });
  }
};

const update = async (req, res) => {
 try {
   const { id } = req.params;
   const test = await SaleService.getById(id);
   if (test === undefined) return res.status(404).json({ message: MSG_ERROR });
   const sale = await SaleService.update(req.body, id);
   return res.status(200).json(sale);
 } catch (error) {
   return res.status(404).json({ messge: MSG_ERROR });
 }
};

const deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    const test = await SaleService.getById(id);
    if (test === undefined || test.length === 0) {
      return res.status(404).json({ message: MSG_ERROR });
    }
    await SaleService.deleteById(id);
    return res.status(204).end();
  } catch (error) {
    return res.status(404).json({ message: MSG_ERROR });
  }
};

module.exports = { getAll, getById, create, update, deleteById };