const SaleController = require('../../../controllers/sales');
const SaleService = require('../../../services/sales');
const SaleModel = require('../../../models/sales');
const { expect } = require('chai');
const sinon = require('sinon');

describe('Sales Controllers', () => {

  const req = {};
  const res = {};

  const MSG_ERROR = { message: 'Sale not found' };

  describe('Get All', () => {

    const sale =
    [
      {
        "saleId": 1,
        "date": "2021-09-09T04:54:29.000Z",
        "productId": 1,
        "quantity": 2
      },
      {
        "saleId": 1,
        "date": "2021-09-09T04:54:54.000Z",
        "productId": 2,
        "quantity": 2
      }
    ]

    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();

      sinon.stub(SaleModel, 'getAll').resolves(sale);
    })

    after(() => {
      SaleModel.getAll.restore();
    })

    it('Deve chamar a função `res.status` com o valor 200', async () => {
      await SaleController.getAll(req, res);
      expect(res.status.calledWith(200)).to.be.true;
  });

    it('Deve chamar a função `res.json` com um array', async () => {
      await SaleController.getAll(req, res);
      expect(res.json.calledWith(sale)).to.be.true;
    });
  })

  describe('Get By ID', () => {
    describe('Quando a venda for encontrado', () => {

      req.params = { id: 1 }

      const sale =
      [
        {
          "date": "2021-09-09T04:54:29.000Z",
          "productId": 1,
          "quantity": 2
        },
        {
          "date": "2021-09-09T04:54:54.000Z",
          "productId": 2,
          "quantity": 2
        }
      ]

      before(() => {
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        sinon.stub(SaleService, 'getById').resolves(sale);
      })

      after (() => {
        SaleService.getById.restore();
      })

      it('Deve chamar a função `res.status` com o valor 200', async () => {
        await SaleController.getById(req, res);
        expect(res.status.calledWith(200)).to.be.true;
      })
    })

    describe('Quando a venda não for encontrada', () => {

      req.params = { id: 21 }

      before(() => {
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        sinon.stub(SaleService, 'getById').resolves(null);
      })

      after (() => {
        SaleService.getById.restore();
      })

      it('A resposta tem status 404', async () => {
        await SaleController.getById(req, res);
        expect(res.status.calledWith(404)).to.be.true;
      })

      it('Deve retornar uma mensagem de erro', async () => {
        await SaleController.getById(req, res);
        expect(res.json.calledWith(MSG_ERROR)).to.be.true;
      })

    })

  })

  describe('Create', () => {

    const sale =
    {
      "id": 1,
      "itemsSold": [
        {
          "productId": 1,
          "quantity": 3
        }
      ]
    }

    // describe('Se existir algum registro igual', () => {

    //   before(() => {
    //     res.status = sinon.stub().returns(res);
    //     res.json = sinon.stub().returns();
  
    //     sinon.stub(SaleService, 'create').resolves(null);
    //   })
  
    //   after (() => {
    //     SaleService.create.restore();
    //   })

    //   it('A resposta tem status 409', async () => {
    //     await SaleController.create(req, res);
    //     expect(res.status.calledWith(409)).to.be.true;
    //   })

    //   it('Deve retornar uma mensagem de erro', async () => {
    //     await SaleController.create(req, res);
    //     expect(res.json.calledWith({ message: 'Sale already exists' })).to.be.true;
    //   })

    // })

    describe('Se a funcão cria uma nova venda com sucesso', () => {

      before(() => {
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
  
        sinon.stub(SaleService, 'create').resolves(sale);
      })
  
      after (() => {
        SaleService.create.restore();
      })

      it('Deve chamar a função `res.status` com o valor 201', async () => {
        await SaleController.create(req, res);
        expect(res.status.calledWith(201)).to.be.true;
      });
  
      it('Deve chamar a função `res.json` com um objeto', async () => {
        await SaleController.create(req, res);
        expect(res.json.calledWith(sale)).to.be.true;
      });

    })

  })

})