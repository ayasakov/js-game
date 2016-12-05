"use strict";

var APP = APP || {};

(function () {
  var KEYS = {
    SPACE: 32,
    SHIFT: 16,
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40
  };

  function isKey(key) {
    var code;
    if (typeof KEYS[key] !== 'undefined') {
      code = KEYS[key];
    } else {
      code = key.charCodeAt(0);
    }
    return (event.keyCode === code);
  }

  APP.shared = APP.shared || {};
  APP.shared.pressKey = {
    isKey: function (key) {
      return isKey(key.toUpperCase());
    },
    isLock: false
  };

})();