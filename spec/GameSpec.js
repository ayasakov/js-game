describe("Game", function() {
  var game;

  beforeEach(function() {
    spyOn(document.body, "appendChild");
    game = new Game();
  });

  it("should prepare game board", function() {
    var board = document.createElement('canvas');
    board.width = game.canvasWidth;
    board.height = game.canvasHeight;
    board.style.border = '5px solid #333';
    
    expect(document.body.appendChild).toHaveBeenCalledWith(board);
  });

  it("should be set Game status", function () {
    spyOn(game, "onStatusChange");
    game.setStatus(game.STATUS.PLAY);
    expect(game.getStatus()).toEqual(game.STATUS.PLAY);
    expect(game.onStatusChange).toHaveBeenCalled();
  });
  
  it("should render and update score", function () {
    var scores = document.createElement('span');
    scores.id = 'scores';
    scores.textContent = 'SCORES: 1';

    game.score++;
    game.renderScore();
    expect(document.body.appendChild).toHaveBeenCalledWith(scores);
  });

});
