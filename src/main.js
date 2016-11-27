"use strict";

(function () {
  var game = new Game();

  function init() {
    game.init();
    setTimeout(main, 1000 / 6);
  }

  function main() {
    game.update();
    game.render();

    setTimeout(main, 1000 / (game.score + 6));
  }

  document.addEventListener('keydown', function(e) {
    game.handlePressKey(e);
  });

  init();
})();