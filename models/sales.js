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
  return sale;
};

const create = async (sale) => {
  const [{ insertId }] = await connection.execute('INSERT INTO sales SET date = now()');
  await sale.forEach((e) => connection.execute(
    `INSERT INTO sales_products
    SET sale_id = ?, product_id = ?, quantity = ?`,
    [insertId, e.productId, e.quantity],
  ));
  return {
    id: insertId,
    itemsSold: sale,
  };
};

const update = async (sale, id) => {
  await sale.forEach((e) => connection.execute(
    `UPDATE sales_products
    SET product_id = ?,
    quantity = ?
    WHERE sale_id = ?`,
    [e.productId, e.quantity, id],
  ));
  return {
    saleId: id,
    itemUpdated: sale,
  };
};

const deleteById = async (id) => {
  await connection.execute('DELETE FROM sales WHERE id = ?', [id]);
  const [{ affectedRows }] = await connection.execute(
    'DELETE FROM sales_products WHERE sale_id = ?', [id],
  );
  return affectedRows;
};

module.exports = { getAll, getById, create, update, deleteById };