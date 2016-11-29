describe("Snake", function() {
  var snake, game;

  beforeEach(function() {
    spyOn(document.body, "appendChild");

    game = new Game();
    snake = new Snake(game);
  });

  it("should be set route", function() {
    // by default
    expect(snake.isRoute('UP')).toBeTruthy();

    snake.setRoute('LEFT');
    expect(snake.isRoute('LEFT')).toBeTruthy();
  });

  it("should default size be 3", function() {
    expect(snake.getSize()).toEqual(3);
  });

  it("should have been added new element if Eat position coincides with the " +
    "position of the snake's head", function() {
    spyOn(snake, "addElement");

    // route UP
    game.eat.position = {
      x: snake.body[0].x,
      y: snake.body[0].y - 1
    };

    snake.update();
    expect(snake.addElement).toHaveBeenCalled();
  });

  it("should be 'Game Over' if Snake bite her tail on next step", function() {
    // route UP (change position Snake's head)
    snake.body[0] = {
      x: snake.body[1].x,
      y: snake.body[1].y + 1
    };

    snake.update();
    expect(game.getStatus()).toEqual(game.STATUS.GAME_OVER);
  });

  it("should be 'Game Over' if Snake will be outside on next step", function() {
    // route UP (change position Snake's head)
    snake.body[0] = {
      x: snake.body[0].x,
      y: 0
    };

    snake.update();
    expect(game.getStatus()).toEqual(game.STATUS.GAME_OVER);
  });
  
  it("should change position in the direction of movement", function() {
    snake.setRoute('LEFT');
    var newLeftPosition = {
      x: snake.body[0].x - 1,
      y: snake.body[0].y
    };

    snake.update();
    expect(snake.body[0]).toEqual(newLeftPosition);
  });

});
