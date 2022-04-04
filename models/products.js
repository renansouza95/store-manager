const connection = require('./connection');

const getAll = async () => {
  const [products] = await connection.execute('SELECT * FROM products');
  return products;
};

const getById = async (id) => {
  const [product] = await connection.execute('SELECT * FROM products WHERE id = ?', [id]);
  return product[0];
};

const getByName = async (name) => {
  const [product] = await connection.execute('SELECT * FROM products WHERE name = ?', [name]);
  return product[0];
};

const create = async ({ name, quantity }) => {
  const [{ insertId }] = await connection.execute('INSERT INTO products SET name = ?, quantity = ?',
    [name, quantity]);
  return {
    id: insertId,
    name,
    quantity,
  };
};

const update = async ({ name, quantity, id }) => {
  await connection.execute('UPDATE products SET name = ?, quantity = ? WHERE id = ?',
    [name, quantity, id]);
  return {
    id,
    name,
    quantity,
  };
};

const deleteById = async (id) => {
  const [{ affectedRows }] = await connection.execute('DELETE FROM products WHERE id = ?', [id]);
  return affectedRows;
};

module.exports = { getAll, getById, getByName, create, update, deleteById };