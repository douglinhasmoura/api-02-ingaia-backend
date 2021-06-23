"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class functions {
  between(value, min, max) {
    return value >= min && value <= max;
  }

  calcValue(price, meters) {
    const total = price * meters;
    return total;
  }

}

exports.default = functions;