const connection = require('./connection');

const getAll = async () => {
  const [sales] = await connection.execute(
    `SELECT t2.sale_id AS saleId, t1.date, t2.product_id AS productId, t2.quantity
    FROM sales AS t1
    INNER JOIN sales_products AS t2
    ON t1.id = t2.sale_id`,
    );
  return sales;
};

const getById = async (id) => {
  const [sale] = await connection.execute(
    `SELECT t1.date, t2.product_id AS productId, t2.quantity
    FROM sales AS t1
    INNER JOIN sales_products AS t2
    ON t1.id = t2.sale_id
    AND t2.sale_id = ?`, [id],
  );
  console.log(sale);
  return sale;
};

const create = async ({ productId, quantity }) => {
  await connection.execute('INSERT INTO sales SET id = ?, date = Date.now()', [productId]);
  const [{ insertId }] = await connection.execute(
    `INSERT INTO sales_products
    SET sale_id = ?, product_id = ?, quantity = ?`,
    [productId, quantity],
  );
  return {
    id: insertId,
    itemsSold: [{ productId, quantity }],
  };
};

const update = async ({ productId, quantity, id }) => {
  await connection.execute(
    `UPDATE sales_products
    SET product_id = ?,
    quantity = ?
    WHERE sale_id = ?`,
    [productId, quantity, id],
  );
  return {
    saleId: id,
    itemUpdated: [{ productId, quantity }],
  };
};

const deleteById = async (id) => {
  await connection.execute('DELETE FROM sales WHERE id = ?', [id]);
};

module.exports = { getAll, getById, create, update, deleteById };