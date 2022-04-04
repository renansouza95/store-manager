const ProductModel = require('../../../models/products');
const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../models/connection');

describe('Products Model', () => {

  const fakeProduct = {
    name: "Martelo de Thor",
    quantity: 10,
  }

  const productsMock = [fakeProduct];

  describe('Get All', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves([productsMock]);
    })
  
    after(() => {
      connection.execute.restore();
    })

    it('Se retorna uma lista com todos os produtos', async () => {
      const result = await ProductModel.getAll();
      expect(result).to.be.equal(productsMock)
    })
  })

  describe('Get By Id', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves([productsMock]);
    })

    after(() => {
      connection.execute.restore();
    })

    it('Se retorna determinado produto', async () => {
      const result = await ProductModel.getById(1);
      expect(result).to.be.equal(fakeProduct)
    })
  })

  describe('Get By Name', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves([productsMock]);
    })

    after(() => {
      connection.execute.restore();
    })

    it('Se retorna determinado produto', async () => {
      const result = await ProductModel.getByName(fakeProduct.name);
      expect(result).to.be.equal(fakeProduct)
    })
  })

  describe('Create', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves([{ insertId: 1 }])
    })
  
    after(() => {
      connection.execute.restore();
    })

    it('retorna o produto', async () => {
      const result = await ProductModel.create(fakeProduct)
      expect(result.id).to.be.equals(1);
    })
  });


  describe('Update', () => {
    const updateProduct = {
      id: 1,
      name: "Martelo de Thor",
      quantity: 10,
    }
  
    before(() => {
      sinon.stub(connection, 'execute').resolves([updateProduct])
    })
  
    after(() => {
      connection.execute.restore();
    })

    it('retorna o produto', async () => {
      const result = await ProductModel.update(updateProduct)
      expect(result.id).to.be.equals(1);
    })
  });

  describe('Delete', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);
    })

    after(() => {
      connection.execute.restore();
    })

    it('Se retorna determinado produto', async () => {
      const result = await ProductModel.deleteById(1);
      expect(result).to.be.equal(1)
    })
  })

})