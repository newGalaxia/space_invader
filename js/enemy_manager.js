game.EnemyManager = me.Container.extend({
  init: function (playscreen) {
    this._super(me.Container, "init", [
      15,
      32,
      this.COLS * 64 - 32,
      this.ROWS * 64 - 32,
    ]);
    this.COLS = 9;
    this.ROWS = 4;
    this.vel = 16;
    this.playscreen = playscreen;
    this.onChildChange = function () {
      this.updateChildBounds();

      // if (this.children.length === 0) {
      //   this.playscreen.reset();
      // }
    };
  },
  update: function (time) {
    _this = this;
    // this is the check for new wave condition
    if (this.children.length === 0 && this.createdEnemies) {
      console.log("ici");
      _this.playscreen.reset();
      game.data.initialEnemyVelocity += 5;
    }

    // if (this.children.length > 0 && this.createdEnemies) {
    //   var childIndex = common.functions.getRandomInt(
    //     0,
    //     this.children.length - 1
    //   );
    //   var theChild = this.getChildAt(childIndex);
    //   var randomInt = common.functions.getRandomInt(1, 1000);
    //   if (randomInt > 975) {
    //     me.game.world.addChild(
    //       me.pool.pull(
    //         "enemyLaser",
    //         theChild._absPos.x + game.EnemyLaser.width,
    //         theChild._absPos.y + game.EnemyLaser.height
    //       )
    //     );
    //   }
    // }
    this._super(me.Container, "update", [time]);
    this.updateChildBounds();
  },
  createEnemies: function () {
    //this.createdEnemies = true;
    for (var i = 0; i < this.COLS; i++) {
      for (var j = 0; j < this.ROWS; j++) {
        this.addChild(me.pool.pull("enemy", i * 64, j * 64));
      }
    }
  },
  onActivateEvent: function () {
    var _this = this;
    this.timer = me.timer.setInterval(function () {
      var bounds = _this.childBounds;

      if (
        (_this.vel > 0 && bounds.right + _this.vel >= me.game.viewport.width) ||
        (_this.vel < 0 && bounds.left + _this.vel <= 0)
      ) {
        _this.vel *= -1;
        _this.pos.y += 16;
        if (_this.vel > 0) {
          _this.vel += 5;
        } else {
          _this.vel -= 5;
        }
        console.log("LA");

        _this.playscreen.checkIfLoss(bounds.bottom);
      } else {
        _this.pos.x += _this.vel;
      }
    }, 1000);
  },
  onDeactivateEvent: function () {
    me.timer.clearInterval(this.timer);
  },
});
