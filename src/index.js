import Phaser from "phaser";
import splash from "src/scenes/splash"
import loadscene from "src/scenes/load";
import mainscene from "src/scenes/main";
import hudscene from "src/scenes/hud";
import resultscene from "src/scenes/result";

var game = new Phaser.Game({
	type: Phaser.AUTO, 
	scale: {
        mode: Phaser.Scale.FIT,
        parent: 'sfvjs',
        autoCenter: Phaser.Scale.WIDTH_CONTROLS_HEIGHT,
        width: 800,
        height: 600
    },
	input: { gamepad: true },
    physics: { default: 'arcade', arcade: { gravity: { y: 700 }, debug: true } },
    dom: { createContainer: true },
	scene: [loadscene, mainscene, hudscene, resultscene]
});
var gamepad;