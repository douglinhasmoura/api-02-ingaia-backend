"use strict";

var _supertest = _interopRequireDefault(require("supertest"));

var _server = _interopRequireDefault(require(".src/shared/infra/http/server"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Test ImovelController', () => {
  it('should status 400 and return error because meters is invalid', async () => {
    const res = await (0, _supertest.default)(_server.default).get('/imovel/calcular').query({
      metros: 9
    });
    expect(res.statusCode).toEqual(400);
  });
  it('should status 400 and return error because meters is empty', async () => {
    const res = await (0, _supertest.default)(_server.default).get('/imovel/calcular');
    expect(res.statusCode).toEqual(400);
  });
  it('should status 400 and return error because meters are not readable', async () => {
    const res = await (0, _supertest.default)(_server.default).get('/imovel/calcular').query({
      metros: 'teste'
    });
    expect(res.statusCode).toEqual(400);
  });
  it('should status 200 an return correct value', async () => {
    const res = await (0, _supertest.default)(_server.default).get('/imovel/calcular').query({
      metros: 20
    });
    expect(res.statusCode).toEqual(200);
  });
  it('should status 200 and check is total is property', async () => {
    const res = await (0, _supertest.default)(_server.default).get('/imovel/calcular').query({
      metros: 50
    });
    expect(res.body).toHaveProperty('total');
  });
});