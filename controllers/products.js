const ProductModel = require('../models/products');
const ProductService = require('../services/products');

const getAll = async (req, res) => {
  try {
    const products = await ProductModel.getAll();
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await ProductService.getById(id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    return res.status(200).json(product);
  } catch (error) {
    return res.status(404).json({ message: 'Product not found' });
  }
};

const create = async (req, res) => {
  try {
    const { name } = req.body;
    const test = await ProductService.getByName(name);
    if (test) return res.status(409).json({ message: 'Product already exists' });
    const product = await ProductService.create(req.body);
    return res.status(201).json(product);
  } catch (error) {
    return res.status(409).json({ message: 'Product already exists' });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await ProductService.update({ ...req.body, id });
    return res.status(200).json(product);
  } catch (error) {
    return res.status(404).json({ message: 'Product not found' });
  }
};

const deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    await ProductService.deleteById(id);
    return res.status(204).end();
  } catch (error) {
    return res.status(404).json({ message: 'Product not found' });
  }
};

module.exports = { getAll, getById, create, update, deleteById };