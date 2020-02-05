import Bod from "./bod"
import Effects from "./effects"
import Hitbox from './Hitbox'
import Hurtbox from './Hurtbox'

var Container = new Phaser.Class({
    Extends: Phaser.GameObjects.Container,
    initialize:
        function Container(scene, x, y, config) {
            Phaser.GameObjects.Container.call(this, scene, x, y, null)
            this.id = config.id
            this.name = this.id + "-container"
            this.scene = scene
            this.depth = 1
            var shadow = this.shadow()
            var bod = new Bod(this.scene, config)
            var hitbox = new Hitbox(this.scene, this.id)
            var hurtbox = new Hurtbox(this.scene, this.id)
            var effects = new Effects(this.scene, scene.configs[2])
            this.add(shadow) 
            this.add(bod) 
            this.add(hitbox) 
            this.add(hurtbox) 
            this.add(effects) 
            this.setSize(config.width, 1);      
            scene.add.existing(this);  
            scene.physics.add.existing(this);   
            this.body.debugShowBody = true
            this.body.debugBodyColor = 0xffffff
            this.body.setOffset(0, 50)
            this.body.setCollideWorldBounds(true);
            this.body.setMass(config.weight)
        },
        shadow: function(){
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