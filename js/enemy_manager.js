game.EnemyManager = me.Container.extend({
  init: function () {
    this._super(me.Container, "init", [
      15,
      32,
      this.COLS * 64 - 32,
      this.ROWS * 64 - 32,
    ]);
    this.COLS = 9;
    this.ROWS = 4;
    this.vel = 16;

    this.onChildChange = function () {
      this.updateChildBounds();
    };
  },
  createEnemies: function () {
    for (var i = 0; i < this.COLS; i++) {
      for (var j = 0; j < this.ROWS; j++) {
        this.addChild(me.pool.pull("enemy", i * 64, j * 64));
      }
    }
  },
});
