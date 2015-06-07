/**
 * Created by toby on 21/05/15.
 */
"use strict";

(function() {
  var deviceFactory = require("./deviceFactory");
  var queryString = require("querystring");

  function stringToHexArray(str) {
    var arr = [];

    for (var i = 0, len = str.length; i < len; i+=2) {
      var next = str.substr(i,2);
      arr.push(parseInt(next,16));
    }

    return arr;
  }

  function parseMessageBody(body) {
    return queryString.parse(body);
  }

  function processMessage(msg) {
    var result = { msg: msg };

    try {
      if (validateMessage(msg, result)) {
        var device = deviceFactory.getDevice(msg.devType);
        if (device !== undefined) {
          result.deviceData = device.receiveMessage(msg);
        } else {
          result.error = "no device found for device type " + msg.devType;
        }
      } else {
        console.error(result.error);
      }
    } catch (e) {
      result.error = "processMessage - exception caught: " + e.message;
      console.error(result.error);
    }

    return result;
  }

  function validateMessage(msg, result) {
    var valid = true;
    if (typeof msg.device === "undefined") {
      result.error = "validateMessage - message device id missing";
      valid = false;
    }
    if (typeof msg.time === "undefined") {
      result.error = "validateMessage - message time missing";
      valid = false;
    }
    if (typeof msg.data === "undefined") {
      result.error = "validateMessage - message data missing";
      valid = false;
    }
    if (typeof msg.devType === "undefined") {
      result.error = "validateMessage - message device type missing";
      valid = false;
    }
    return valid;
  }

  exports.parseMessageBody = parseMessageBody;
  exports.processMessage = processMessage;
  exports.stringToHexArray = stringToHexArray;
}());