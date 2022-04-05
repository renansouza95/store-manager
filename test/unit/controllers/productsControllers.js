const ProductController = require('../../../controllers/products');
const ProductService = require('../../../services/products');
const ProductModel = require('../../../models/products');
const { expect } = require('chai');
const sinon = require('sinon');

describe('Products Controllers', () => {

  const req = {};
  const res = {};

  const MSG_ERROR = { message: 'Product not found' };

  describe('Get All', () => {

    const products = [
      {
        "id": 1,
        "name": "produto A",
        "quantity": 10
      },
      {
        "id": 2,
        "name": "produto B",
        "quantity": 20
      }
    ]

    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();

      sinon.stub(ProductModel, 'getAll').resolves(products);
    })

    after(() => {
      ProductModel.getAll.restore();
    })

    it('Deve chamar a função `res.status` com o valor 200', async () => {
      await ProductController.getAll(req, res);
      expect(res.status.calledWith(200)).to.be.true;
    });

    it('Deve chamar a função `res.json` com um array', async () => {
      await ProductController.getAll(req, res);
      expect(res.json.calledWith(products)).to.be.true;
    });

  });

  describe('Get By ID', () => {
    describe('Quando o produto for encontrado', () => {

      req.params = { id: 1 }

      const product = {
          "id": 1,
          "name": "produto A",
          "quantity": 10
      }

      before(() => {
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        sinon.stub(ProductService, 'getById').resolves(product);
      })

      after (() => {
        ProductService.getById.restore();
      })

      it('Deve chamar a função `res.status` com o valor 200', async () => {
        await ProductController.getById(req, res);
        expect(res.status.calledWith(200)).to.be.true;
      });

      it('Deve chamar a função `res.json` com um objeto', async () => {
        await ProductController.getById(req, res);
        expect(res.json.calledWith(product)).to.be.true;
      });
    });

    describe('Quando o produto não for encontrado', () => {

      req.params = { id: 21 }

      before(() => {
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        sinon.stub(ProductService, 'getById').resolves(null);
      })

      after (() => {
        ProductService.getById.restore();
      })

      it('A resposta tem status 404', async () => {
        await ProductController.getById(req, res);
        expect(res.status.calledWith(404)).to.be.true;
      })

      it('Deve retornar uma mensagem de erro', async () => {
        await ProductController.getById(req, res);
        expect(res.json.calledWith(MSG_ERROR)).to.be.true;
      })

    })
  
  });

  describe('Create', () => {

    const product = {
      "id": 1,
      "name": "produto A",
      "quantity": 10
  }

    describe('Se existir algum registro igual', () => {

      req.body = { name: 'Arroz' } 

      before(() => {
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
  
        sinon.stub(ProductService, 'create').resolves(null);
      })
  
      after (() => {
        ProductService.create.restore();
      })

      it('A resposta tem status 409', async () => {
        await ProductController.create(req, res);
        expect(res.status.calledWith(409)).to.be.true;
      })

      it('Deve retornar uma mensagem de erro', async () => {
        await ProductController.create(req, res);
        expect(res.json.calledWith({ message: 'Product already exists' })).to.be.true;
      })

    })

    // describe('Se a funcão cria um novo produto com sucesso', () => {

    //   before(() => {
    //     res.status = sinon.stub().returns(res);
    //     res.json = sinon.stub().returns();
  
    //     sinon.stub(ProductService, 'create').resolves(product);
    //   })
  
    //   after (() => {
    //     ProductService.create.restore();
    //   })

    //   it('Deve chamar a função `res.status` com o valor 201', async () => {
    //     await ProductController.create(req, res);
    //     expect(res.status.calledWith(201)).to.be.true;
    //   });
  
    //   it('Deve chamar a função `res.json` com um objeto', async () => {
    //     await ProductController.create(req, res);
    //     expect(res.json.calledWith(product)).to.be.true;
    //   });
    // })

  });

})
