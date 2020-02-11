import Player from "../models/player"
import Stage from "../models/stage";
import Collissions from "../functions/collision"
import Camera from "../functions/camera"

var mainscene = new Phaser.Class({
	Extends: Phaser.Scene,
	initialize:
		function mainScene() {
			Phaser.Scene.call(this, { key: 'mainscene', active: false });
		},
	preload: function () {
		var loadscene = this.scene.get('loadscene');
		this.configs = loadscene.configs
		this.ground = this.physics.add.staticGroup().create(400, 590, 'base').setScale(1).refreshBody();
		this.player1 = new Player('p1', this, this.configs[0]) 
		this.player2 = new Player('p2', this, this.configs[1])
		this.stage = new Stage(this, 0, 0, null, 0)
		this.collission = new Collissions(this)	
		this.cam = new Camera(this)
	},
	create: function () {
		this.stage.start()
		this.cam.start()
	},
	update: function () { 
		this.player1.control.controlPlayer()
		this.player2.control.invertControls()
		this.cam.scrollCamera()		
	}
});

export default mainscene;