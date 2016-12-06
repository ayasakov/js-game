"use strict";

var APP = APP || {};

APP.Eat = function (game) {
  this.game = game;

  this.position = {
    x: -1,
    y: -1
  }
};

APP.Eat.prototype.remove = function () {
  this.position = {
    x: -1,
    y: -1
  }
};

APP.Eat.prototype.create = function () {
  var newPosition = {
    x: Math.floor(Math.random() * this.game.scaleWidth),
    y: Math.floor(Math.random() * this.game.scaleHeight)
  };

  if (newPosition.x == this.position.x && newPosition.y == this.position.y) {
    this.create();
    return 0;
  }

  for (var i = 0; i < this.game.snake.getSize(); i++) {
    if (newPosition.x == this.game.snake.body[i].x &&
      newPosition.y == this.game.snake.body[i].y) {
      this.create();
      return 0;
    }
  }

  this.position.x = newPosition.x;
  this.position.y = newPosition.y;
};

APP.Eat.prototype.render = function () {
  APP.View.prototype.renderEat.apply(this);
};