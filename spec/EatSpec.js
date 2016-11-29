describe("Eat", function() {
  var eat, game,
      defaultPosition = {
        x: -1,
        y: -1
      };

  beforeEach(function() {
    // Mock append
    spyOn(document.body, "appendChild");

    game = new Game();
    eat = new Eat(game);
  });

  it("should init with (-1; -1)", function() {
    expect(eat.position).toEqual(defaultPosition);
  });

  it("should update position on create method", function() {
    eat.create();
    expect(eat.position).not.toEqual(defaultPosition);
  });

  it("should remove position", function() {
    eat.create();
    eat.remove();
    expect(eat.position).toEqual(defaultPosition);
  });
  
});
