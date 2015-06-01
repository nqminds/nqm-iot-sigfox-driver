/**
 * Created by toby on 22/05/15.
 */

"use strict";

var device = require("../devices/GFTDesignEnviroMon01");

var environmentMonitorMsg = {
  "device": "850C",
  "time": "1432198160",
  "duplicate": "false",
  "data": "6b0000000000010a01bd01ae",
  "avgSignal": "18.06",
  "lat": "51",
  "lng": "-1",
  "rssi": "-108.00",
  "devType": "GFTDesignEnviroMon01"
};

exports.testEnvironmentMonitorParser = function(test) {
  var result = device.receiveMessage(environmentMonitorMsg);

  test.expect(3);
  test.ok(!result.error || result.error.length === 0, "message processed");
  test.ok(result.temperature == 23.94, "temperature value is correct");
  test.ok(result.photoPercent == 42.03, "photo percent value is correct");
  test.done();
};