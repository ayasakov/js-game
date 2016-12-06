"use strict";

var APP = APP || {};

APP.Game = function () {
  APP.View.apply(this);

  this.score = 0;
  this.status = 1;
  this.STATUS = {
    NONE: 1,
    PLAY: 2,
    GAME_OVER: 3,
    GAME_WIN: 4,
    PAUSE: 5
  };

  // Snake
  this.snake = new APP.Snake(this);
  // Eat
  this.eat = new APP.Eat(this);
};

APP.Game.prototype = Object.create(APP.View.prototype);

APP.Game.prototype.init = function () {
  this.reset();
};

APP.Game.prototype.reset = function () {
  this.snake = new APP.Snake(this);
  this.eat = new APP.Eat(this);
  this.score = 0;
  this.renderScore();
};

APP.Game.prototype.update = function() {
  if (this.getStatus() === this.STATUS.PLAY) {
    this.snake.update();
  }

  APP.shared.pressKey.isLock = false;
};

APP.Game.prototype.render = function () {
  this.clearField();

  this.snake.render();
  this.eat.render();

  switch (this.getStatus()) {
    case this.STATUS.PLAY:
      break;

    case this.STATUS.NONE:
      this.drawMessage('Змейка..', 'Нажмите пробел для начала игры');
      break;

    case this.STATUS.GAME_OVER:
      this.drawMessage('Конец игры :(', 'Нажмите пробел для начала новой игры');
      break;

    case this.STATUS.GAME_WIN:
      this.drawMessage('Победа!', 'Нажмите пробел для начала новой игры');
      break;

    case this.STATUS.PAUSE:
      this.drawMessage('Пауза', 'Нажмите SHIFT или пробел для продолжения');
      break;
  }
};

APP.Game.prototype.handlePressKey = function (event) {
  if (APP.shared.pressKey.isKey('SPACE')) {
    if (this.getStatus() === this.STATUS.GAME_OVER ||
      this.getStatus() === this.STATUS.GAME_WIN) {
      this.reset();
      this.setStatus(this.STATUS.PLAY);
    } else if (this.getStatus() === this.STATUS.NONE) {
      this.setStatus(this.STATUS.PLAY);
    } else if (this.getStatus() === this.STATUS.PAUSE) {
      this.setStatus(this.STATUS.PLAY);
    } else if (this.getStatus() === this.STATUS.PLAY) {
      this.setStatus(this.STATUS.PAUSE);
    }
  }

  if (APP.shared.pressKey.isKey('SHIFT')) {
    if (this.getStatus() === this.STATUS.PLAY) {
      this.setStatus(this.STATUS.PAUSE);
    } else if (this.getStatus() === this.STATUS.PAUSE) {
      this.setStatus(this.STATUS.PLAY);
    }
  }

  if (this.getStatus() === this.STATUS.PLAY && !APP.shared.pressKey.isLock) {
    APP.shared.pressKey.isLock = true;

    if (APP.shared.pressKey.isKey('UP') && !this.snake.isRoute('DOWN')) {
      this.snake.setRoute('UP');
    } else if (APP.shared.pressKey.isKey('DOWN') && !this.snake.isRoute('UP')) {
      this.snake.setRoute('DOWN');
    } else if (APP.shared.pressKey.isKey('LEFT') && !this.snake.isRoute('RIGHT')) {
      this.snake.setRoute('LEFT');
    } else if (APP.shared.pressKey.isKey('RIGHT') && !this.snake.isRoute('LEFT')) {
      this.snake.setRoute('RIGHT');
    }
  }
};

APP.Game.prototype.setStatus = function(value) {
  this.onStatusChange(value, this.status);
  this.status = value;
};

APP.Game.prototype.getStatus = function () {
  return this.status;
};

APP.Game.prototype.onStatusChange = function(newstatus, oldstatus) {
  if (newstatus === this.STATUS.PLAY && oldstatus !== this.STATUS.PAUSE) {
    this.eat.create();
  }
};