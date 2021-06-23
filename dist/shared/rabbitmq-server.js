"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _amqplib = require("amqplib");

class RabbitmqServer {
  constructor(uri) {
    this.uri = uri;
    this.conn = void 0;
    this.channel = void 0;
  }

  async start() {
    this.conn = await (0, _amqplib.connect)(this.uri);
    this.channel = await this.conn.createChannel();
  }

  async publishInQueue(queue, message) {
    if (this.conn && this.channel) {
      // await this.channel.assertQueue(queue,{ durable: false});
      const result = this.channel.sendToQueue(queue, Buffer.from(message));
      console.log(" [x] Sent %s", message);
      return result;
    }

    return false;
  }

  async consume(queue, callback) {
    var _this$channel;

    return await ((_this$channel = this.channel) === null || _this$channel === void 0 ? void 0 : _this$channel.consume(queue, async message => {
      if (message) {
        var _this$channel2;

        callback(message);
        (_this$channel2 = this.channel) === null || _this$channel2 === void 0 ? void 0 : _this$channel2.ack(message);
        console.log(" [x] Receive %s", message === null || message === void 0 ? void 0 : message.content);
      }
    }));
  }

}

exports.default = RabbitmqServer;