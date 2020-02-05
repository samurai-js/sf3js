var Effects = new Phaser.Class({
    Extends: Phaser.GameObjects.Sprite,
    initialize:
        function Effects(scene, config) {
            Phaser.GameObjects.Sprite.call(this, scene, config.x, config.y, config.texture, config.frame)
            this.name = 'effects'
            this.config = config
            this.xind = 1
            this.depth = 99
            this.loadFrames(scene);
            scene.add.existing(this);
            this.on('animationcomplete', this.clear, this);
    },
    loadFrames: function (scene) {
        for (var i = 0; i < this.config.items.length; i++) {
            var item = this.config.items[i];
            scene.anims.create({ key: item.group + '-' +  item.name, frames: scene.anims.generateFrameNames(item.group, { start: item.frame.start, end: item.frame.end, zeroPad: 5, suffix:'.png'}), frameRate: item.frame.frameRate, repeat: item.frame.repeat });
        }
    },
    setConfig: function(config, xind = 1){
        this.config = config
        this.xind = xind
        xind == 1 ? this.resetFlip() : this.setFlipX(true)
        this.setPosition(this.config.x * this.xind, this.config.y)
    },
    showFX: function(texture){
        this.setVisible(true)
        this.play(texture, true)
    },
    clear: function(){
        this.setVisible(false)
    }
})

export default Effects
