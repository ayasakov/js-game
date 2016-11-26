"use strict";

function Game() {
  this.canvasWidth = 450;
  this.canvasHeight = 450;
  this.score = 0;

  this.status = 1;
  this.STATUS = {
    NONE: 1,
    PLAY: 2,
    STOP: 3
  };

  // Canvas
  this.canvas = document.createElement('canvas');
  this.canvas.width = this.canvasWidth;
  this.canvas.height = this.canvasHeight;
  this.canvas.style.border = '5px solid #333';

  document.body.appendChild(this.canvas);

  // Context
  this.context = this.canvas.getContext('2d');
}

Game.prototype.init = function () {
  this.reset();
};

Game.prototype.reset = function () {
  this.score = 0;
};

Game.prototype.getStatus = function () {
  return this.status;
};

Game.prototype.drawMessage = function (title, description) {
  // Background
  this.context.beginPath();
  this.context.fillStyle = 'rbga(0, 0, 0, 0.5)';
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

Game.prototype.render = function () {
  this.context.fillStyle = 'rbga(0, 0, 0, 0.5)';
  this.context.fillRect(0, 0, this.canvasWidth, this.canvasHeight);

  switch (this.getStatus()) {
    case this.STATUS.PLAY:
      break;

    case this.STATUS.NONE:
      this.drawMessage('Змейка', 'Нажмите пробел для начала игры');
      break;

    case this.status.STOP:
      this.drawMessage('Конец игры', 'Нажмите пробел для начала игры');
      break;
  }
};

Game.prototype.handlePressKey = function (event) {
  if (pressKey.isKey('SPACE')) {
    if (this.getStatus() == this.STATUS.NONE) {
      
    }
  }
};