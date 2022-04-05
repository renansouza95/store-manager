const ProductModel = require('../models/products');

const getById = async (id) => {
  try {
    const product = await ProductModel.getById(id);
    return product;
  } catch (error) {
  return { error: 404, message: 'Product not found' };
  }
};

const getByName = async (name) => {
  try {
    const product = await ProductModel.getByName(name);
    return product;
  } catch (error) {
    return { error: 500, message: 'Server error' };
  }
};

const create = async (product) => {
  try {
    const created = await ProductModel.create(product);
    return created;
  } catch (error) {
    return { error: 500, message: 'Server error' };
  }
};

const update = async (product) => {
  try {
    const updated = await ProductModel.update(product);
    return updated;
  } catch (error) {
    return { error: 500, message: 'Server error' };
  }
};

const deleteById = async (id) => {
  try {
    const response = await ProductModel.deleteById(id);
    return response;
  } catch (error) {
    return { error: 500, message: 'Server error' };
  }
};

module.exports = { getById, getByName, create, update, deleteById };