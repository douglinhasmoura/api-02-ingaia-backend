"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _swaggerJsdoc = _interopRequireDefault(require("swagger-jsdoc"));

var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));

var _routes = _interopRequireDefault(require("../http/routes/routes"));

var _dotenv = require("dotenv");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _dotenv.config)();
const PORT = process.env.PORT || 3000;
const app = (0, _express.default)();
app.use(_express.default.json());
app.use(_routes.default);
const swaggerDefinition = {
  info: {
    title: 'API-02',
    version: '1.0.0'
  }
};
const options = {
  swaggerDefinition,
  apis: ['./dist/modules/imovel/http/routes/*.js']
};
const swaggerSpecification = (0, _swaggerJsdoc.default)(options);
app.use('/api-docs', _swaggerUiExpress.default.serve, _swaggerUiExpress.default.setup(swaggerSpecification));
app.listen(PORT, async () => {
  console.log(`Server Started on port: ${PORT}`); // const server = new RabbitmqServer('amqp://admin:admin@rabbitmq:5672');
  // await server.start();
  // server.publishInQueue('fila01', '');
});
var _default = app;
exports.default = _default;