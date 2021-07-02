game.Laser = me.Entity.extend({
    init : function (x, y) {
        this._super(me.Entity, "init", [x, y, { width: game.Laser.width, height: game.Laser.height }]);
        this.name = "PlayerLaser";
        this.z = 5;
        this.body.setVelocity(0, 200);
        this.body.collisionType = me.collision.types.PROJECTILE_OBJECT;
        this.renderable = new (me.Renderable.extend({
            init : function () {
                this._super(me.Renderable, "init", [0, 0, game.Laser.width, game.Laser.height]);
            },
            destroy : function () {},
            draw : function (renderer) {
                var color = renderer.getColor();
                renderer.setColor('#5EFF7E');
                renderer.fillRect(0, 0, this.width, this.height);
                renderer.setColor(color);
            }
        }));
        this.alwaysUpdate = true;
        this.name = "Laser";
    },

    update : function (time) {
        this.body.vel.y -= this.body.accel.y * time / 1000;
        if (this.pos.y + this.height <= 0) {
            me.game.world.removeChild(this);
        }

        this.body.update();
        me.collision.check(this);

        return true;
    },
    onCollision : function (res, other) {
        if (other.body.collisionType === me.collision.types.ENEMY_OBJECT) {
            me.game.world.removeChild(this);
            game.playScreen.enemyManager.removeChild(other);
            game.data.enemyCount--;
            // this is evil - the enemies move faster as you shoot them
            //game.playScreen.enemyManager.vel += 5;
            return true;
        }

        if (other.body.collisionType === me.collision.types.COLLECTABLE_OBJECT) {
            me.game.world.removeChild(this);
            game.playScreen.motherShipManager.removeChild(other);
            return true;
        }
        
        return false;
    }    
});

game.Laser.width = 6;
game.Laser.height = 28;