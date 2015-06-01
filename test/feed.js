/**
 * Created by toby on 23/05/15.
 */

"use strict";

var feedLib = require("ubiLiveDataFeed");
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

exports.sendData = function(test) {
  var result = device.receiveMessage(environmentMonitorMsg);
  var feed = new feedLib.LiveFeed({ host: "localhost", port: 3000, feedDescriptor: "feed-test-001" });

  test.expect(3);
  test.ok(!result.error, "message parsed OK");
  feed.initialise(function(error, reconnect) {
    test.ok(!error, "feed connected OK");
    feed.sendData(result,function(error, result) {
      test.ok(!error, "data sent");
      test.done();
      feed.close();
    });
  });
}