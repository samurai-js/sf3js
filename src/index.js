import Phaser from "phaser";
import loadscene from "./scenes/load";
import mainscene from "./scenes/main";
import hudscene from "./scenes/hud";
import resultscene from "./scenes/result";

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
    physics: { default: 'arcade', arcade: { gravity: { y: 650 }, debug: true } },
    dom: { createContainer: true },
	scene: [loadscene, mainscene, hudscene, resultscene]
});
var gamepad;