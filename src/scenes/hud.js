import Match from "src/functions/match";
//Hud, match
var hudscene = new Phaser.Class({
	Extends: Phaser.Scene,
	initialize:
		function hudScene() {
			Phaser.Scene.call(this, { key: 'hudscene', active: false });
	},
	preload: function () {
		var ms = this.scene.get('mainscene');
		this.player1 = ms.player1
		this.player2 = ms.player2
	},
	create: function (result) {
		this.match = new Match(this, result)
	},
	update: function () {
		this.match.ended? this.match.end() : this.match.start()
	}
});

export default hudscene;