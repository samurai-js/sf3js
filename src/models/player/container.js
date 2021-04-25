import Bod from "src/models/player/bod"
import Effects from "src/models/player/effects"
import Hitbox from 'src/models/player/hitbox'
import Hurtbox from 'src/models/player/hurtbox'

var Container = new Phaser.Class({
    Extends: Phaser.GameObjects.Container,
    initialize:
        function Container(scene, x, y, config) {
            Phaser.GameObjects.Container.call(this, scene, x, y, null)
            this.id = config.id
            this.name = this.id + "-container"
            //this.scene = scene
            this.depth = 1
            this.add(this.setShadow()) 
            this.add(new Bod(this.scene, config)) 
            this.add(new Hitbox(this.scene, this.id)) 
            this.add(new Hurtbox(this.scene, this.id)) 
            this.add(new Effects(this.scene, scene.configs[2])) 
            this.setSize(config.width, 1);      
            scene.add.existing(this);  
            scene.physics.add.existing(this);   
            this.body.debugShowBody = true
            this.body.debugBodyColor = 0xffffff
            this.body.setOffset(0, 50)
            this.body.setCollideWorldBounds(true);
            this.body.setMass(config.weight)
        },
        setShadow: function(){
            var ellipse = new Phaser.Geom.Ellipse(0, 55, 90, 15)
            var shadow = new Phaser.GameObjects.Graphics(this.scene)
            shadow.name = 'shadow'
            shadow.fillStyle(0x000000).setAlpha(0.35)
            shadow.fillEllipseShape(ellipse, 64)
            this.scene.add.existing(shadow)
            this.add(shadow)
            return shadow
        },
        getPlayer: function(){
            var parent = this.id == 'p1' ? this.scene.player1 : this.scene.player2
            return parent
        },
        getConfig: function(config){
            var parent = this.id == 'p1' ? this.scene.player1 : this.scene.player2
            return parent[config]
        }
})

export default Container;