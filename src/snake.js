function Snake(game) {
  this.game = game;

  var defaultX = Math.ceil(this.game.scaleWidth / 2);
  var defaultY = Math.ceil(this.game.scaleHeight / 2);

  this.ROUTE = {
		UP: 2,
		DOWN: 0,
		LEFT: 1,
		RIGHT: 3
	};

  this.body = [
    {x: defaultX, y: defaultY - 1},
    {x: defaultX, y: defaultY},
    {x: defaultX, y: defaultY + 1}
  ];

  this.setRoute('UP');
}

Snake.prototype.update = function () {
  var newHeadSnake = {
    x: this.body[0].x,
    y: this.body[0].y
  };

  if (this.isRoute('UP')) {
    newHeadSnake.y -= 1;
  } else if (this.isRoute('DOWN')) {
    newHeadSnake.y += 1;
  } else if (this.isRoute('LEFT')) {
    newHeadSnake.x -= 1;
  } else if (this.isRoute('RIGHT')) {
    newHeadSnake.x += 1;
  }

  // if on itself
	for (var i = 0; i < this.getSize() - 1; i++) {
		if (newHeadSnake.x == this.body[i].x && newHeadSnake.y == this.body[i].y) {
			this.game.setStatus(this.game.STATUS.GAME_OVER);
			return;
		}
	}

	// if outside scene
	var isOutsideX = newHeadSnake.x < 0 || newHeadSnake.x > this.game.scaleWidth - 1;
	var isOutsideY = newHeadSnake.y < 0 || newHeadSnake.y > this.game.scaleHeight - 1;

	if (isOutsideX || isOutsideY) {
		this.game.setStatus(this.game.STATUS.GAME_OVER);
		return;
	}

	// update array
	this.body.pop();
	this.body.unshift(newHeadSnake);

  // Check eat
  if (newHeadSnake.x == this.game.eat.position.x &&
    newHeadSnake.y == this.game.eat.position.y) {
    this.game.score++;
    this.game.renderScore();

    var isWin = this.addElement();
    if (isWin) {
      this.game.eat.remove();
      this.game.setStatus(this.game.STATUS.GAME_WIN);
    } else {
      this.game.eat.create();
    }
  }

};

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

Snake.prototype.setRoute = function(value) {
	this.route = this.ROUTE[value];
};

Snake.prototype.isRoute = function(value) {
	return this.route == this.ROUTE[value];
};

Snake.prototype.addElement = function () {
  var lastEl = this.body.length - 1,
      newEl = {
        x: this.body[lastEl].x,
        y: this.body[lastEl].y
      },
      x_diff = this.body[lastEl].x - this.body[lastEl - 1].x,
      y_diff = this.body[lastEl].y - this.body[lastEl - 1].y;

  if (x_diff > 0) {
    newEl.x += 1;
  } else if (x_diff < 0) {
    newEl.x -= 1;
  } else if (y_diff > 0) {
    newEl.y += 1;
  } else if (y_diff < 0) {
    newEl.y -= 1;
  }

  this.body.push(newEl);

  if (this.getSize() == this.game.scaleWidth * this.game.scaleHeight) {
    return true;
  }

  return false;
};