var Hitbox = new Phaser.Class({
    Extends: Phaser.GameObjects.Sprite,
    initialize:
        function Hitbox(scene, id) {
            Phaser.GameObjects.Sprite.call(this, scene, 0, 0, null, null)
            this.id  = id
            this.name = 'hitbox'
            this.config = null
            this.debug = scene.physics.config.debug
            this.visible = this.debug == true ? true : false
            this.damage = 0
            this.atklvl = 'h'
            this.onBlk = null
            this.onHit = null
            this.stun = null
            this.push = null
            this.isHit = false
            this.scene = scene
            this.scene.add.existing(this);
            this.scene.physics.add.existing(this)
            this.body.allowGravity = false;
            this.body.debugBodyColor = 0xf9e000
            this.body.setImmovable(true)
            this.body.setEnable(false)
    },
    setHit: function(value){
        this.isHit = value
    },
    display: function(config, xind, currframe){
        this.config = config
        var firstActive = config.hitbox.start
        var lastActive = config.hitbox.start + config.hitbox.active
        var hitframes = config.hitbox.hits
        if(currframe > firstActive && currframe <= lastActive){
            this.setCoord(config.hitbox.x * xind, config.hitbox.y, config.hitbox.width, config.hitbox.height)
            if(hitframes.includes(currframe)){
                if(this.isHit == true){
                    this.emit(this.id + '-hitboxHit', this.id, config.hitbox);
                }else if(this.isHit == 'blocked'){
                    config.hitbox.fx.name = 'hitsparks-purple'
                    this.emit(this.id + '-hitboxBlock', this.id, config.hitbox);
                }                
            }
        }else{
            this.setHit(false)
            this.clear()
        }
    },
    setCoord: function (x, y, width, height) {
        this.body.setEnable(true)
        this.body.setSize(width, height);
        this.setPosition(x, y);
    },
    clear: function () {
        this.active = false
        this.body.setSize(0, 0);
        this.body.reset(0,0)
        this.body.setEnable(false)
    }
})

export default Hitbox