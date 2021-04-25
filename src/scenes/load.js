var loadscene = new Phaser.Class({
	Extends: Phaser.Scene,
	initialize:
		function loadscene() {
        Phaser.Scene.call(this, { key: 'loadscene', active: false });
    },
    configs: [],
	preload: function () {
        var charpath = "/assets/char/"
        this.load.multiatlas('ryu', charpath + 'ryu/ryu.json', charpath + 'ryu');
        this.load.multiatlas('ken', charpath + 'ken/ken.json', charpath + 'ken');
        this.load.json('ryu-config', 'config/char/ryu.json');
        this.load.json('ken-config', 'config/char/ken.json');
        this.load.script('fx-config', 'config/effects/effect.js');
        this.load.image('base', '../assets/stages/ground.png');
        this.load.image('white_spark', '/assets/particles/white.png');

        var fxpath = "/assets/effects/"
        var fx = ['dizzies', 'fire_ice_shock', 'fireballs','ground','hitsparks','misc','shadow','superart']
        for (var i = 0; i < fx.length; i++) {
            this.load.multiatlas(fx[i], fxpath + fx[i] + '/' + fx[i] + '.json', fxpath + fx[i] )
        }
    },
    create: function(){
        var p1 = this.cache.json.get('ryu-config');
        var p2 = this.cache.json.get('ken-config');
        var random = Phaser.Math.Between(1, 2)
        if (random == 1){
            this.configs.push(p1); p1.id = 'p1'
            this.configs.push(p2); p2.id = 'p2'
        }else{
            this.configs.push(p1); p1.id = 'p2'
            this.configs.push(p2); p2.id = 'p1'
        }
        this.configs.push(effects)
        var data = {result: {round: 1, p1wins: 0, p2wins: 0}}
        this.scene.start('mainscene');
        this.scene.start('hudscene', data);
    }
});

export default loadscene;