"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AppError = _interopRequireDefault(require("../../../../shared/errors/AppError"));

var _functions = _interopRequireDefault(require("../../../../shared/utils/functions"));

var _dotenv = require("dotenv");

var _axios = _interopRequireDefault(require("axios"));

var _rabbitmqServer = _interopRequireDefault(require("../../../../shared/rabbitmq-server"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _dotenv.config)();

class ImovelController {
  async index(request, response) {
    try {
      const metros = request.query.metros;

      if (!metros) {
        throw new _AppError.default('Metragem não informada.', 400);
      }

      const fun = new _functions.default();

      if (!fun.between(metros, 10, 10000)) {
        throw new _AppError.default('Metragem não está dentro dos parâmetros, informe uma metragem entre 10 e 10.000 m².', 400);
      }

      const base_url = process.env.BASE_URL_RABBITMQ;
      const server = new _rabbitmqServer.default(base_url || '');
      await server.start();
      const result = await server.publishInQueue('fila01', JSON.stringify({
        metros: metros
      }));
      var total = 0;
      await server.consume('fila02', message => {
        //Recebe Fila02
        const valor_metro = JSON.parse(message.content.toString());
        const total = valor_metro.valor * metros;
        return response.json({
          total: total
        });
      });
    } catch (error) {
      if (error instanceof _AppError.default) {
        return response.status(error.statusCode).json({
          error: error.message
        });
      }

      return response.status(500).json({
        error: error.message
      });
    }
  }

  async show(request, response) {
    try {
      const metros = request.query.metros;

      if (!metros) {
        throw new _AppError.default('Metragem não informada.', 400);
      }

      const fun = new _functions.default();

      if (!fun.between(metros, 10, 10000)) {
        throw new _AppError.default('Metragem não está dentro dos parâmetros, informe uma metragem entre 10 e 10.000 m².', 400);
      }

      const req = await _axios.default.get(`${process.env.BASE_URL_API_1}/preco`);

      if (req.status === 200) {
        const preco = req.data.preco;
        const total = fun.calcValue(preco.valor, metros);
        return response.json({
          total
        });
      } else {
        throw new _AppError.default('Erro interno do servidor', req.status);
      }
    } catch (error) {
      if (error instanceof _AppError.default) {
        return response.status(error.statusCode).json({
          error: error.message
        });
      }

      return response.status(500).json({
        error: error.message
      });
    }
  }

}

exports.default = ImovelController;