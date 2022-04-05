const ProductService = require('../../../services/products');
const ProductModel = require('../../../models/products');
const { expect } = require('chai');
const sinon = require('sinon');

describe('Products Services', () => {

  const fakeProduct = {
    name: "Martelo de Thor",
    quantity: 10,
  }

  const productsMock = [fakeProduct];

  const ERROR = { error: 500, message: 'Server error' };
  const ERROR_ID = { error: 404, message: 'Product not found' };

  describe('Get By Id', () => {
  
    describe('Se retorna o produto esperado', () => {
      before(() => {
        sinon.stub(ProductModel, 'getById').resolves(productsMock);
      })
    
      after(() => {
        ProductModel.getById.restore();
      })

      it('retorno', async () => {
        const result = await ProductService.getById(1)
        expect(result).to.be.equal(productsMock)
      })
    })

    describe('Se gera um erro', async () => {
      before(() => {
        sinon.stub(ProductModel, 'getById').resolves(ERROR_ID);
      })
  
      after(() => {
        ProductModel.getById.restore();
      })

      it('retorno', async () => {
        const result = await ProductService.getById()
        expect(result).to.be.equal(ERROR_ID)
      })
    })  
  })

  describe('Get By Name', () => {
  
    describe('Se retorna o produto esperado', () => {
      before(() => {
        sinon.stub(ProductModel, 'getByName').resolves(productsMock);
      })
    
      after(() => {
        ProductModel.getByName.restore();
      })

      it('retorno', async () => {
        const result = await ProductService.getByName('Martelo de Thor')
        expect(result).to.be.equal(productsMock)
      })
    })

    describe('Se gera um erro', async () => {
      before(() => {
        sinon.stub(ProductModel, 'getByName').resolves(ERROR);
      })
  
      after(() => {
        ProductModel.getByName.restore();
      })

      it('retorno', async () => {
        const result = await ProductService.getByName('OCEANO')
        expect(result).to.be.equal(ERROR)
      })
    })
  })

  describe('Create', () => {
  
    describe('Se cria um produto novo', () => {
      before(() => {
        sinon.stub(ProductModel, 'create').resolves(fakeProduct);
      })
    
      after(() => {
        ProductModel.create.restore();
      })

      it('Retorna o produto criado', async () => {
        const result = await ProductService.create('Martelo de Thor')
        expect(result).to.be.equal(fakeProduct)
      })
    })

    describe('Se gera um erro', async () => {
      before(() => {
        sinon.stub(ProductModel, 'create').resolves(ERROR);
      })
  
      after(() => {
        ProductModel.create.restore();
      })

      it('retorno', async () => {
        const result = await ProductService.create()
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
        sinon.stub(ProductModel, 'update').resolves(fakeUpdate);
      })
    
      after(() => {
        ProductModel.update.restore();
      })

      it('Retorna o produto alterado', async () => {
        const result = await ProductService.update('Martelo de Thor')
        expect(result).to.be.equal(fakeUpdate)
      })
    })

    describe('Se gera um erro', async () => {
      before(() => {
        sinon.stub(ProductModel, 'update').resolves(ERROR);
      })
  
      after(() => {
        ProductModel.update.restore();
      })

      it('retorno', async () => {
        const result = await ProductService.update()
        expect(result).to.be.equal(ERROR)
      })
    })
  })

  describe('Delete', () => {
  
    describe('Se deleta um produto existente', () => {
      before(() => {
        sinon.stub(ProductModel, 'deleteById').resolves(1);
      })

      after(() => {
        ProductModel.deleteById.restore();
      })

      it('Retorna numero de produtos apagados', async () => {
        const result = await ProductService.deleteById(1)
        expect(result).to.be.equal(1)
      })
    })

    describe('Se gera um erro', async () => {
      before(() => {
        sinon.stub(ProductModel, 'deleteById').resolves(ERROR);
      })
  
      after(() => {
        ProductModel.deleteById.restore();
      })

      it('retorno', async () => {
        const result = await ProductService.deleteById('abacaxi')
        expect(result).to.be.equal(ERROR)
      })
    })
  })
  
})