var Fireball = new Phaser.Class({
    Extends: Phaser.GameObjects.Sprite,
    initialize:
        function Fireball(scene, id) {
            Phaser.GameObjects.Sprite.call(this, scene, 0, 0, null, null)
            this.name = 'fireball'
            this.config = null
            this.id = id;
            this.flipX = true
            this.depth = 2
            this.xind = 1
            this.isHit = false
            this.scene = scene
            this.scene.add.existing(this);
            this.scene.physics.add.existing(this)
            this.body.allowGravity = false;
            this.body.debugBodyColor = 0xffffff            
    },
    setHit: function(value){
        this.isHit = value
        if(value == true){
            this.emit(this.id +'-hitboxHit', this.id, this.config.hitbox);
            this.play(this.config.fx.name,true)
            this.on('animationcomplete', function(){
                if(this.anims.currentAnim.key == this.config.fx.name) this.clear()
            }, this);
        }else if(value == 'blocked'){
            this.emit(this.id +'-hitboxBlock', this.id, this.config.hitbox);
            this.play('hitsparks-purple',true)
            this.on('animationcomplete', function(){
                if(this.anims.currentAnim.key == 'hitsparks-purple') this.clear()
            }, this);
        }
    },
    setConfig: function(config){
        this.config = config
    },
    setCoord: function(x,y,xind){
        this.xind = xind
        if(this.xind == 1){
            this.body.setOffset(250, 230)
            this.body.reset(x + this.config.x, y + this.config.y)
        }else{
            this.body.setOffset(350, 230)
            this.body.reset(x - this.config.x, y + this.config.y)
        }
    },
    shoot: function(){  
        this.setVisible(true)
        this.xind == -1 ? this.resetFlip() :this.setFlipX(true)
        this.play(this.config.texture);
        this.body.setVelocityX(this.config.speed * this.xind)
    },
    clear: function(){
        this.setVisible(false)
        this.body.reset(0,0)
    }
})

export default Fireball
