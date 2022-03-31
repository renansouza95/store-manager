const idValidator = (req, res, next) => {
  const { productId } = req.body;
  console.log('SALES ID');
  if (!productId) return res.status(400).json({ message: '"productId" is required' });

  next();
};

const quantValidator = (req, res, next) => {
  const { quantity } = req.body;
  console.log('SALES QUANTITY');
  if (quantity === undefined) {
    return res.status(400).json({ message: '"quantity" is required' });
  }

  if (quantity <= 0) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }

  next();
};

module.exports = { idValidator, quantValidator };