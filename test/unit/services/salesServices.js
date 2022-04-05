const SaleService = require('../../../services/sales');
const SaleModel = require('../../../models/sales');
const { expect } = require('chai');
const sinon = require('sinon');

describe('Sales Services', () => {

  const fakeSale = {
    saleId: 1,
    date: "2021-09-09T04:54:29.000Z",
    productId: 1,
    quantity: 5,
  }

  const saleMock = [fakeSale];

  const ERROR = { error: 500, message: 'Server error' };
  const ERROR_ID = { error: 404, message: 'Sale not found' };

  describe('Get By Id', () => {

    const saleID = [{ 
      date: "2021-09-09T04:54:29.000Z",
      productId: 1,
      quantity: 5
    }]
  
    describe('Se retorna a venda esperada', () => {
      before(() => {
        sinon.stub(SaleModel, 'getById').resolves(saleID);
      })

      after(() => {
        SaleModel.getById.restore();
      })

      it('retorno', async () => {
        const result = await SaleService.getById(1)
        expect(result).to.be.equal(saleID)
      })
    })

    describe('Se gera um erro', async () => {
      before(() => {
        sinon.stub(SaleModel, 'getById').resolves(ERROR_ID);
      })
  
      after(() => {
        SaleModel.getById.restore();
      })

      it('retorno', async () => {
        const result = await SaleService.getById()
        expect(result).to.be.equal(ERROR_ID)
      })
    })  
  })

  describe('Create', () => {
  
    const createSale = [{
      productId: 1,
      quantity: 3
    }]
  
    const returnSale = { id: 1, itemsSold: createSale };

    describe('Se cria uma venda nova', () => {
      before(() => {
        sinon.stub(SaleModel, 'create').resolves(returnSale);
      })

      after(() => {
        SaleModel.create.restore();
      })

      it('Retorna a venda criada', async () => {
        const result = await SaleService.create(createSale)
        expect(result.id).to.be.equal(1)
      })
    })

    describe('Se gera um erro', async () => {
      before(() => {
        sinon.stub(SaleModel, 'create').resolves(ERROR);
      })
  
      after(() => {
        SaleModel.create.restore();
      })

      it('retorno', async () => {
        const result = await SaleService.create()
        expect(result).to.be.equal(ERROR)
      })
    })
  })

  describe('Update', () => {
  
    const fakeUpdate = {
      id: 1,
      name: "Martelo de Thor",
      quantity: 10,
    }
  
    describe('Se altera um produto existente', () => {
      before(() => {
        sinon.stub(SaleModel, 'update').resolves(fakeUpdate);
      })
    
      after(() => {
        SaleModel.update.restore();
      })

      it('Retorna o produto alterado', async () => {
        const result = await SaleService.update('Martelo de Thor')
        expect(result).to.be.equal(fakeUpdate)
      })
    })

    describe('Se gera um erro', async () => {
      before(() => {
        sinon.stub(SaleModel, 'update').resolves(ERROR);
      })
  
      after(() => {
        SaleModel.update.restore();
      })

      it('retorno', async () => {
        const result = await SaleService.update()
        expect(result).to.be.equal(ERROR)
      })
    })
  })

  describe('Delete', () => {
  
    describe('Se deleta um produto existente', () => {
      before(() => {
        sinon.stub(SaleModel, 'deleteById').resolves(1);
      })

      after(() => {
        SaleModel.deleteById.restore();
      })

      it('Retorna numero de produtos apagados', async () => {
        const result = await SaleService.deleteById(1)
        expect(result).to.be.equal(1)
      })
    })

    describe('Se gera um erro', async () => {
      before(() => {
        sinon.stub(SaleModel, 'deleteById').resolves(ERROR);
      })
  
      after(() => {
        SaleModel.deleteById.restore();
      })

      it('retorno', async () => {
        const result = await SaleService.deleteById('abacaxi')
        expect(result).to.be.equal(ERROR)
      })
    })
  })
  
})