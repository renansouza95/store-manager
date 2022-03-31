require('dotenv').config();
const express = require('express');
const ProductRouters = require('./routers/products');
const SalesRouters = require('./routers/sales');

const app = express();

app.use(express.json());

app.use('/products', ProductRouters);
app.use('/sales', SalesRouters);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
