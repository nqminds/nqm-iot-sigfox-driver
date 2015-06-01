/**
 * Created by toby on 21/05/15.
 */

module.exports = (function() {

  function getDevice(deviceType) {
    var parser = require("./devices/" + deviceType);
    return parser;
  }

  return { getDevice: getDevice }
}());