/**
 * Created by toby on 21/05/15.
 */

"use strict";

module.exports = (function() {

  var tempCalibration = -50.0;
  var refVoltage = 1.237;
  var messages = require("../messages");

  function receiveMessage(msgIn) {
    var msgData = messages.stringToHexArray(msgIn.data);

    var msg = {};
    if (msgData.length === 12) {
      msg.counter = msgData[0];
      msg.analogueTemperature = msgData[6]*256 + msgData[7];
      msg.referenceReading = msgData[8]*256 + msgData[9];
      msg.photoValue = msgData[10]*256 + msgData[11];

      msg.temperature = (((refVoltage * 100 * msg.analogueTemperature) / msg.referenceReading) + tempCalibration).toFixed(2);
      msg.photoPercent = ((msg.photoValue * 100) / 1023).toFixed(2);
    } else {
      msg.error = "invalid message, length is " + msgData.length;
    }

    return msg;
  }

  return { receiveMessage: receiveMessage };
}());