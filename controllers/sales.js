const SaleModel = require('../models/sales');
const SaleService = require('../services/sales');

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
    if (!sale || sale.length === 0) return res.status(404).json({ message: 'Sale not found' });
    return res.status(200).json(sale);
  } catch (error) {
    return res.status(404).json({ message: 'Sale not found' });
  }
};

const create = async (req, res) => {
  try {
    const { id } = req.params;
    const test = await SaleModel.getById(id);
    if (test) return res.status(409).json({ message: 'Sale already exists' });
    const product = await SaleModel.create(req.body);
    return res.status(201).json(product);
  } catch (error) {
    return res.status(409).json({ message: 'Sale already exists' });
  }
};

const update = async (req, res) => {
 try {
   const { id } = req.params;
   const sale = await SaleService.update({ ...req.body, id });
   return res.status(200).json(sale);
 } catch (error) {
   return res.status(404).json({ messge: 'Sale not found' });
 }
};

module.exports = { getAll, getById, create, update };