var Hurtbox = new Phaser.Class({
    Extends: Phaser.GameObjects.Sprite,
    initialize:
        function Hurtbox(scene, id) {
            Phaser.GameObjects.Sprite.call(this, scene, 0, 0, null, null)
            this.id  = id
            this.name = 'hurtbox'
            this.debug = scene.physics.config.debug
            this.visible = this.debug == true ? true : false
            scene.add.existing(this);
            scene.physics.add.existing(this)
            this.body.allowGravity = false;
            this.body.debugBodyColor = 0xfa00ff
            this.body.setImmovable(true)
    },
    display: function(config){
        this.setPosition(config.x, config.y)
        this.body.setSize(config.width,config.height)
    },
    getPlayer: function(){
        var parent = this.id == 'p1' ? this.scene.player1 : this.scene.player2
        return parent
    }
})

export default Hurtbox