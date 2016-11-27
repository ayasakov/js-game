"use strict";

function Game() {
  this.square = 15;
  this.canvasWidth = 450;
  this.canvasHeight = 450;
  this.score = 0;

  this.snakeHeadColor = '#aa0000';
  this.snakeBodyColor = '#789';

  this.status = 1;
  this.STATUS = {
    NONE: 1,
    PLAY: 2,
    GAME_OVER: 3
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
  this.snake = new Snake(this);
  // Eat
  this.snake = new Eat(this);
}

Game.prototype.init = function () {
  this.reset();
};

Game.prototype.reset = function () {
  this.snake = new Snake(this);
  this.eat = new Eat(this);
  this.score = 0;
};

Game.prototype.drawMessage = function (title, description) {
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

Game.prototype.update = function() {
	if (this.getStatus() == this.STATUS.PLAY) {
		this.snake.update();
	}

  pressKey.isLock = false;
};

Game.prototype.render = function () {
  this.context.fillStyle = 'rgba(0, 0, 0, 0.5)';
  this.context.fillRect(0, 0, this.canvasWidth, this.canvasHeight);

  this.snake.render();
  this.eat.render();

  switch (this.getStatus()) {
    case this.STATUS.PLAY:
      break;

    case this.STATUS.NONE:
      this.drawMessage('Змейка', 'Нажмите пробел для начала игры');
      break;

    case this.STATUS.GAME_OVER:
      this.drawMessage('Конец игры', 'Нажмите пробел для начала игры');
      break;
  }
};

Game.prototype.handlePressKey = function (event) {
  if (pressKey.isKey('SPACE')) {
    if (this.getStatus() == this.STATUS.GAME_OVER) {
      this.reset();
      this.setStatus(this.STATUS.PLAY);
    } else if (this.getStatus() == this.STATUS.NONE) {
      this.setStatus(this.STATUS.PLAY);
    }
  }

  if (this.getStatus() == this.STATUS.PLAY && !pressKey.isLock) {
		pressKey.isLock = true;

		if (pressKey.isKey('UP') && !this.snake.isRoute('DOWN')) {
			this.snake.setRoute('UP');
		} else if (pressKey.isKey('DOWN') && !this.snake.isRoute('UP')) {
			this.snake.setRoute('DOWN');
		} else if (pressKey.isKey('LEFT') && !this.snake.isRoute('RIGHT')) {
			this.snake.setRoute('LEFT');
		} else if (pressKey.isKey('RIGHT') && !this.snake.isRoute('LEFT')) {
			this.snake.setRoute('RIGHT');
		}
	}
};

Game.prototype.setStatus = function(value) {
	this.onStatusChange(value, this.status);
	this.status = value;
};

Game.prototype.getStatus = function () {
  return this.status;
};

Game.prototype.onStatusChange = function(newstatus, oldstatus) {
	if (newstatus == this.STATUS.PLAY && oldstatus != this.STATUS.PAUSE) {
		this.eat.create();
	}
};