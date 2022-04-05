const SaleModel = require('../../../models/sales');
const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../models/connection');

describe('Sales Model', () => {

  const fakeSale = {
    saleId: 1,
    date: "2021-09-09T04:54:29.000Z",
    productId: 1,
    quantity: 5,
  }

  const saleMock = [fakeSale];

  describe('Get All', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves([saleMock]);
    })
  
    after(() => {
      connection.execute.restore();
    })

    it('Se retorna uma lista com todas as vendas', async () => {
      const result = await SaleModel.getAll();
      expect(result).to.be.equal(saleMock)
    })
  })

  describe('Get By Id', () => {
    const saleID = [{ 
      date: "2021-09-09T04:54:29.000Z",
      productId: 1,
      quantity: 5
    }]

    before(() => {
      sinon.stub(connection, 'execute').resolves([saleID]);
    })

    after(() => {
      connection.execute.restore();
    })

    it('Se retorna determinada venda', async () => {
      const result = await SaleModel.getById(1);
      expect(result).to.be.equal(saleID)
    })
  })

  describe('Create', () => {
  
    const createSale = [{
      productId: 1,
      quantity: 3
    }]

    before(() => {
      sinon.stub(connection, 'execute').resolves([{ insertId: 1 }])
    })
  
    after(() => {
      connection.execute.restore();
    })

    it('retorna a venda', async () => {
      const result = await SaleModel.create(createSale)
      expect(result.id).to.be.equals(1);
    })
  });

  describe('Update', () => {
    const updateSale = [{
      productId: 1,
      quantity: 6
    }]

    const updateMock = [{
      saleId: 1,
      itemUpdated: updateSale
    }];
  
    before(() => {
      sinon.stub(connection, 'execute').resolves([updateMock])
    })
  
    after(() => {
      connection.execute.restore();
    })

    it('retorna a venda', async () => {
      const result = await SaleModel.update(updateSale)
      expect(result.itemUpdated).to.be.equals(updateSale);
    })
  });

  describe('Delete', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);
    })

    after(() => {
      connection.execute.restore();
    })

    it('Se deleta o registro', async () => {
      const result = await SaleModel.deleteById(1);
      expect(result).to.be.equal(1)
    })
  })

})