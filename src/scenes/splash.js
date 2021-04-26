import Stage from "src/models/stage";

var splash = new Phaser.Class({
	Extends: Phaser.Scene,
	initialize:
		function splashScene() {
			Phaser.Scene.call(this, { key: 'splash', active: true });
		},
	preload: function () {
		this.stage = new Stage(this, 0, 0, null, 0)
	},
	create: function () {
		this.stage.start()
		console.log(this.cameras.cameras)
	},
	update: function () { 
		
	}
});

export default splash;