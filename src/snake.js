function Snake(game) {
  this.game = game;

  var defaultX = Math.ceil(this.game.scaleWidth / 2);
  var defaultY = Math.ceil(this.game.scaleHeight / 2);

  this.body = [
    {x: defaultX, y: defaultY - 1},
    {x: defaultX, y: defaultY},
    {x: defaultX, y: defaultY + 1}
  ];

  //this.setRoute('UP');
}

Snake.prototype.render = function () {
  for (var i = this.getSize() - 1; i != -1; i--) {
    if (i == 0) {
      this.game.context.fillStyle = this.game.snakeHeadColor;
    } else {
      this.game.context.fillStyle = this.game.snakeBodyColor;
    }

    this.game.context.fillRect(this.body[i].x * this.game.square + 1,
      this.body[i].y * this.game.square + 1,
      this.game.square - 2, this.game.square - 2);
  }
};

Snake.prototype.getSize = function () {
  return this.body.length;
};