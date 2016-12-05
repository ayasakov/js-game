"use strict";

var APP = APP || {};

APP.Game = function () {
  this.square = 15;
  this.canvasWidth = 450;
  this.canvasHeight = 450;
  this.score = 0;

  this.snakeHeadColor = '#aa0000';
  this.snakeBodyColor = '#aaa';

  this.status = 1;
  this.STATUS = {
    NONE: 1,
    PLAY: 2,
    GAME_OVER: 3,
    GAME_WIN: 4,
    PAUSE: 5
  };

  // Canvas
  this.canvas = document.createElement('canvas');
  this.canvas.width = this.canvasWidth;
  this.canvas.height = this.canvasHeight;
  this.canvas.style.border = '5px solid #333';

  document.body.appendChild(this.canvas);

  this.scaleWidth = Math.ceil(this.canvasWidth / this.square);
  this.scaleHeight = Math.ceil(this.canvasHeight / this.square);

  // Context
  this.context = this.canvas.getContext('2d');

  // Snake
  this.snake = new APP.Snake(this);
  // Eat
  this.eat = new APP.Eat(this);
};

APP.Game.prototype.init = function () {
  this.reset();
};

APP.Game.prototype.renderScore = function () {
  var scoreElement = document.getElementById('scores');
  if (!scoreElement) {
    scoreElement = document.createElement('span');
    scoreElement.id = 'scores';
    document.body.appendChild(document.createElement('br'));
    document.body.appendChild(scoreElement);
  }
  scoreElement.textContent = 'SCORES: ' + this.score;
};

APP.Game.prototype.reset = function () {
  this.snake = new APP.Snake(this);
  this.eat = new APP.Eat(this);
  this.score = 0;
  this.renderScore();
};

APP.Game.prototype.drawMessage = function (title, description) {
  // Background
  this.context.beginPath();
  this.context.fillStyle = 'rgba(0, 0, 0, 0.8)';
  this.context.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
  this.context.closePath();

  // Title
  this.context.beginPath();
  this.context.font = '32px Arial monospace';
  this.context.fillStyle = '#aa0000';
  this.context.textAlign = 'center';
  this.context.fillText(title, this.canvasWidth / 2, this.canvasHeight / 2);

  // Description
  this.context.beginPath();
  this.context.font = '14px Arial monospace';
  this.context.fillStyle = '#aa0000';
  this.context.textAlign = 'center';
  this.context.fillText(description, this.canvasWidth / 2, this.canvasHeight - 32);
};

APP.Game.prototype.update = function() {
  if (this.getStatus() === this.STATUS.PLAY) {
    this.snake.update();
  }

  APP.shared.pressKey.isLock = false;
};

APP.Game.prototype.render = function () {
  this.context.fillStyle = 'rgba(0, 0, 0, 0.5)';
  this.context.fillRect(0, 0, this.canvasWidth, this.canvasHeight);

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