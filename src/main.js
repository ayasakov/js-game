"use strict";

var APP = APP || {};

(function () {
  var game = new APP.Game();

  function init() {
    game.init();
    setTimeout(main, 1000 / 6);
  }

  function main() {
    game.update();
    game.render();

    setTimeout(main, 1000 / (game.score + 6));
  }

  // Event Listeners
  document.addEventListener('keydown', function(e) {
    game.handlePressKey(e);
  });
  window.addEventListener('load', init);

})();