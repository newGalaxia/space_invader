game.GameEndScreen = me.ScreenObject.extend({
  onResetEvent : function () {
    // Game Over Screen

    this.name = "GameEndScreen";
	me.game.world.addChild(new me.ColorLayer("background", "#000000"), 0);
	  

    // add a new renderable component with the scrolling text
    me.game.world.addChild(new (me.Renderable.extend ({
      // constructor
      init : function () {
        this._super(me.Renderable, 'init', [0, 0, me.game.viewport.width, me.game.viewport.height]);

        // font for the scrolling text
        this.font = new me.BitmapFont(me.loader.getBinary('PressStart2P'), me.loader.getImage('PressStart2P'));

        // a tween to animate the arrow
        this.scrollertween = new me.Tween(this).to({scrollerpos: -1500 }, 2000).onComplete(this.scrollover.bind(this)).start();

        this.scroller = "GAME OVER - PRESS ENTER TO START NEW GAME";
        this.scrollerpos = 600;
      },

      // some callback for the tween objects
      scrollover : function () {
        // reset to default value
        this.scrollerpos = 640;
        this.scrollertween.to({scrollerpos: -2200 }, 10000).onComplete(this.scrollover.bind(this)).start();
      },

      update : function (dt) {
        return true;
      },

      draw : function (renderer) {
      // this.font.draw(renderer, "YOUR SCORE : " + game.data.score, 20, 240);
      this.font.draw(renderer, this.scroller, this.scrollerpos, 440);
      },
      onDestroyEvent : function () {
        //just in case
        this.scrollertween.stop();
      }
    })), 2);

    // change to play state on press Enter or click/tap
    me.input.bindKey(me.input.KEY.ENTER, "enter", true);
    me.input.bindPointer(me.input.pointer.LEFT, me.input.KEY.ENTER);
    this.handler = me.event.subscribe(me.event.KEYDOWN, function (action, keyCode, edge) {
      if (action === "enter") {
        // play something on tap / enter
        // this will unlock audio on mobile devices
        //me.audio.play("cling");
        game.newGame();
      }
    });
  },

  /**
   * action to perform when leaving this screen (state change)
   */
  onDestroyEvent : function () {
    me.input.unbindKey(me.input.KEY.ENTER);
    me.input.unbindPointer(me.input.pointer.LEFT);
    //me.event.unsubscribe(this.handler);
  }
});