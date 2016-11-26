"use strict";

(function () {
  var game = new Game();

  function init() {
    game.init();
    main();
  }

  function main() {
    game.render();
  }

  document.addEventListener('keydown', function(e) {
    game.handlePressKey(e);
  });

  init();
})();