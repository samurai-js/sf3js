import Stage from "src/models/stage";

//Result after match
var resultscene = new Phaser.Class({
	Extends: Phaser.Scene,
	initialize:
		function resultScene() {
			Phaser.Scene.call(this, { key: 'resultscene', active: false });
	},
	preload: function () {
		var mainscene = this.scene.get('mainscene');
		this.stage = new Stage(this, 0, 0, null, 0)
		this.cam = this.cameras.main
	},
	create: function (result) {
		this.stage.start()
		//this.cam.setZoom(1).pan(400, 400, 0)
		var style = {
			'background-color': 'white',
			'width': '400px',
			'height': 'auto',
			'font': '12px Arial',
			'font-weight': 'bold',
			'padding' : '5px'
		};
		var element = this.add.dom(500, 450, 'div', style, 'The road to Hado never ends');
	},
	update: function () {
		
	}
});

export default resultscene;