/**
 * Created by toby on 21/05/15.
 */

"use strict";

var messages = require("../messages");

exports.stringToHexArray = function(test) {
  var raw = "6b0000000000010a01bd01ae";
  var arr = messages.stringToHexArray(raw);

  test.expect(13);
  test.ok(arr.length === 12, "Verify expected message length");
  test.ok(arr[0] === 0x6b, "Verify array item 0");
  test.ok(arr[1] === 0x00, "Verify array item 1");
  test.ok(arr[2] === 0x00, "Verify array item 2");
  test.ok(arr[3] === 0x00, "Verify array item 3");
  test.ok(arr[4] === 0x00, "Verify array item 4");
  test.ok(arr[5] === 0x00, "Verify array item 5");
  test.ok(arr[6] === 0x01, "Verify array item 6");
  test.ok(arr[7] === 0x0a, "Verify array item 7");
  test.ok(arr[8] === 0x01, "Verify array item 8");
  test.ok(arr[9] === 0xbd, "Verify array item 9");
  test.ok(arr[10] === 0x01, "Verify array item 10");
  test.ok(arr[11] === 0xae, "Verify array item 11");
  test.done();
};

exports.parseMessageBody = function(test) {
  var body = "device=850C&time=1432199971&duplicate=false&snr=14.02&station=066D&data=6e0000000000010e01bd01dd&avgSignal=18.16&lat=51&lng=-1&rssi=-113.00&devType=GFTDesignEnviroMon01";
  var msg = messages.parseMessageBody(body);

  test.expect(11);
  test.ok(msg.device === "850C", "device id is correct");
  test.ok(msg.time === "1432199971", "message time is correct");
  test.ok(msg.duplicate === "false", "message duplicate is correct");
  test.ok(msg.snr === "14.02", "message snr is correct");
  test.ok(msg.station === "066D", "message station is correct");
  test.ok(msg.data === "6e0000000000010e01bd01dd", "message data is correct");
  test.ok(msg.avgSignal === "18.16", "message avgSignal is correct");
  test.ok(msg.lat === "51", "message latitude is correct");
  test.ok(msg.lng === "-1", "message longitude is correct");
  test.ok(msg.rssi === "-113.00", "message rssi is correct");
  test.ok(msg.devType === "GFTDesignEnviroMon01", "device type is correct");
  test.done();
};

exports.processMessage = function(test) {
  var body = "device=850C&time=1432199971&duplicate=false&snr=14.02&station=066D&data=6e0000000000010e01bd01dd&avgSignal=18.16&lat=51&lng=-1&rssi=-113.00&devType=GFTDesignEnviroMon01";
  var msg = messages.parseMessageBody(body);

  test.expect(1);
  test.ok(messages.processMessage(msg), "process message body");
  test.done();
};