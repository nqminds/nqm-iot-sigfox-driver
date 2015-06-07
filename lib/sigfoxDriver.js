"use strict";

module.exports = (function() {
  var console = process.console ? process.console : global.console;
  var util = require("util");
  var EventEmitter = require("events").EventEmitter;
  var http = require("http");
  var url = require("url");
  var messages = require("./messages");

  function parseRequest(req, cb) {
    var self = this;
    var result = { statusCode:200, error: "", body: "" };

    if (req.method === "POST") {
      req.on("data", function(data) {
        result.body += data;
        if (result.body.length > self._config.maxRequestLength) {
          result.statusCode = 413;
          result.error = "request content too long";
          req.connection.destroy();
        }
      });
      req.on("end", function() {
        cb(result);
      });
    } else {
      // Bad request - expected POST.
      result.statusCode = 400;
      result.error = "Bad request, expected POST method";
      cb(result);
    }
  }

  function listener(req, res) {
    var self = this;
    var uri = url.parse(req.url);
    console.log(uri.path);
    if (uri.path === "/receive") {
      parseRequest.call(self, req, function(parseResult) {
        res.statusCode = parseResult.statusCode;
        if (parseResult.statusCode === 200) {
          var msg = messages.parseMessageBody(parseResult.body);
          parseResult = messages.processMessage(msg);
          if (!parseResult.error) {
            parseResult.deviceData.timestamp = Date.now();
            self.emit("data", self._config.feedId, parseResult.deviceData);
            res.write(JSON.stringify({ ok: true }));
          } else {
            console.error(parseResult.error);
            res.write(JSON.stringify({ ok: false }));
          }
          res.end();
        }
      });
    } else {
      res.statusCode = 404;
      res.write('{ error: "unknown endpoint - " + uri.path}');
      res.end();
    }
  }

  function SigFoxDriver(config) {
    console.log("creating sigfox adapter");
    EventEmitter.call(this);

    this._config = config;
  }

  util.inherits(SigFoxDriver, EventEmitter);

  SigFoxDriver.prototype.start = function() {
    console.log("starting SigFoxAdapter");
    this._server = http.createServer(listener.bind(this));
    this._server.listen(this._config.localPort);
  };

  SigFoxDriver.prototype.stop = function() {
    this._server.close();
  };

  return SigFoxDriver;
}());
