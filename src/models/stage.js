var Stage = new Phaser.Class({
    Extends: Phaser.GameObjects.Sprite,
    initialize:
        function Stage(scene, x, y, texture, frame) {
            Phaser.GameObjects.Sprite.call(this, scene, x, y, texture, frame)
            this.name = 'stage'
            this.scene = scene
            this.scene.add.existing(this);
            this.loadImages();
    },
    loadImages: function () {
        this.scene.load.image('akuma-1', '../assets/stages/akuma/akuma-1.png')
        this.scene.load.image('akuma-2', '../assets/stages/akuma/akuma-2.png')
        this.scene.load.image('akuma-3', '../assets/stages/akuma/akuma-3.png')
    },
    start: function(){
        this.layer3 = this.scene.add.tileSprite(400, 360, 240, 290, 'akuma-3') //back
        this.layer2 = this.scene.add.tileSprite(400, 450, 800, 640, 'akuma-2') //middle
        this.layer1 = this.scene.add.tileSprite(400, 390, 800, 600, 'akuma-1') //front
        this.scene.tweens.add({targets: this.layer3, tilePositionX: {from: 1, to: -2}, ease: 'Linear',duration: 2000,yoyo: true,repeat: -1});
        this.scene.tweens.add({targets: this.layer2, tilePositionX: {from: -0.5, to: 2.5}, ease: 'Linear',duration: 3000,yoyo: true,repeat: -1});
    }
})

export default Stage
