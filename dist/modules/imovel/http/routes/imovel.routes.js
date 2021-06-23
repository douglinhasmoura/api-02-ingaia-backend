"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _ImovelController = _interopRequireDefault(require("../controllers/ImovelController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const imovelRouter = (0, _express.Router)();
const imovelController = new _ImovelController.default();
/**
 * @swagger
 * /imovel/calcular:
 *   get:
 *     description: Metódo para calcular o m² de um determinado imóvel.
 *     parameters:
 *     - in: query
 *       name: metros
 *       type: number
 *       required: true
 *       description: Valor em número da metragem.
 *     responses:
 *       200:
 *         description: Retorna o valor calculado do m².
 */

imovelRouter.get('/calcular', imovelController.show);
var _default = imovelRouter;
exports.default = _default;