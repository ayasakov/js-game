"use strict";

var APP = APP || {};

APP.View = function () {
  this.square = 15;
  this.canvasWidth = 450;
  this.canvasHeight = 450;

  this.snakeHeadColor = '#aa0000';
  this.snakeBodyColor = '#aaa';

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
};

APP.View.prototype.clearField = function () {
  this.context.fillStyle = 'rgba(0, 0, 0, 0.8)';
  this.context.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
};

APP.View.prototype.drawMessage = function (title, description) {
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

APP.View.prototype.renderScore = function () {
  var scoreElement = document.getElementById('scores');
  if (!scoreElement) {
    scoreElement = document.createElement('span');
    scoreElement.id = 'scores';
    document.body.appendChild(document.createElement('br'));
    document.body.appendChild(scoreElement);
  }
  scoreElement.textContent = 'SCORES: ' + this.score;
};

APP.View.prototype.renderEat = function () {
  if (this.position.x != -1 && this.position.y != -1) {
    this.game.context.beginPath();
    this.game.context.fillStyle = '#00aa00';
    this.game.context.arc(this.position.x * this.game.square + this.game.square / 2,
      this.position.y * this.game.square + this.game.square / 2,
      this.game.square / 2 - 2, 0, Math.PI * 2);
    this.game.context.fill();
    this.game.context.closePath();
  }
};

APP.View.prototype.renderSnake = function () {
  for (var i = this.getSize() - 1; i != -1; i--) {
    if (i === 0) {
      this.game.context.fillStyle = this.game.snakeHeadColor;
    } else {
      this.game.context.fillStyle = this.game.snakeBodyColor;
    }

    this.game.context.fillRect(this.body[i].x * this.game.square + 1,
      this.body[i].y * this.game.square + 1,
      this.game.square - 2, this.game.square - 2);
  }
};