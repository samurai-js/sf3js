var Input = new Phaser.Class({
	initialize:
		function Input(scene, player) {
			this.player = player
			this.scene = scene;
			this.setupKeys()
	},
	lock: function (state) {
		state == true ? this.scene.input.keyboard.enabled = false : this.scene.input.keyboard.enabled = true
	},
	setupKeys: function () {
		var sc = Phaser.Input.Keyboard.KeyCodes.SEMICOLON
		this.u = this.scene.input.keyboard.addKey('W');
		this.d = this.scene.input.keyboard.addKey('S');
		this.l = this.scene.input.keyboard.addKey('A');
		this.r = this.scene.input.keyboard.addKey('D');
		this.lp = this.scene.input.keyboard.addKey('I');
		this.mp = this.scene.input.keyboard.addKey('O');
		this.hp = this.scene.input.keyboard.addKey('P');
		this.lk = this.scene.input.keyboard.addKey('J');
		this.mk = this.scene.input.keyboard.addKey('K');
		this.hk = this.scene.input.keyboard.addKey('L');
		//dash
		this.dashf = this.scene.input.keyboard.createCombo('DD', { resetOnMatch: true });
		this.dashb = this.scene.input.keyboard.createCombo('AA', { resetOnMatch: true });
		this.dshof = this.scene.input.keyboard.createCombo('DDSD', { resetOnMatch: true });
		this.dshob = this.scene.input.keyboard.createCombo('AASA', { resetOnMatch: true });
		//dragon punch
		this.ldpf = this.scene.input.keyboard.createCombo('DSDI', { resetOnMatch: true });
		this.mdpf = this.scene.input.keyboard.createCombo('DSDO', { resetOnMatch: true });
		this.hdpf = this.scene.input.keyboard.createCombo('DSDP', { resetOnMatch: true });
		this.ldpb = this.scene.input.keyboard.createCombo('ASAI', { resetOnMatch: true });
		this.mdpb = this.scene.input.keyboard.createCombo('ASAO', { resetOnMatch: true });
		this.hdpb = this.scene.input.keyboard.createCombo('ASAP', { resetOnMatch: true });
		//fireball
		this.lfbf = this.scene.input.keyboard.createCombo('SDI', { resetOnMatch: true });
		this.mfbf = this.scene.input.keyboard.createCombo('SDO', { resetOnMatch: true });
		this.hfbf = this.scene.input.keyboard.createCombo('SDP', { resetOnMatch: true });
		this.lfbb = this.scene.input.keyboard.createCombo('SAI', { resetOnMatch: true });
		this.mfbb = this.scene.input.keyboard.createCombo('SAO', { resetOnMatch: true });
		this.hfbb = this.scene.input.keyboard.createCombo('SAP', { resetOnMatch: true });
		//tatsus
		this.ltatf = this.scene.input.keyboard.createCombo('SAJ', { resetOnMatch: true });
		this.mtatf = this.scene.input.keyboard.createCombo('SAK', { resetOnMatch: true });
		this.htatf = this.scene.input.keyboard.createCombo('SAL', { resetOnMatch: true });
		this.ltatb = this.scene.input.keyboard.createCombo('SDJ', { resetOnMatch: true });
		this.mtatb = this.scene.input.keyboard.createCombo('SDK', { resetOnMatch: true });
		this.htatb = this.scene.input.keyboard.createCombo('SDL', { resetOnMatch: true });
		//critical arts
		this.caf = this.scene.input.keyboard.createCombo('EE', { resetOnMatch: true });
		this.cab = this.scene.input.keyboard.createCombo('EE', { resetOnMatch: true });
	},
	controlPlayer: function () {
		this.invertControls()
		this.controlDirection()
		this.controlAttack()
		this.controlInputs()
	},
	invertControls: function(){
		var object = this.player.container
		var target = this.player.id == 'p1' ? this.scene.player2.container : this.scene.player1.container
		var xdif = object.x - target.x;
		var isLeft = ((xdif) > 0) ? false : true
		isLeft ? this.player.xInd = 1 : this.player.xInd = -1
	},
	controlDirection: function(){
		var state = this.player.state
		var moves = ['attk','spattk']
		if(this.r.isDown && this.u.isDown){ 
			this.player.tjump(this.player.f)
		}else if(this.r.isDown){
			this.player.twalk(this.player.f) 
		}else if (this.l.isDown && this.d.isDown){
			this.player.tcrouch('low') 	
		}else if (this.d.isDown){
			this.player.tcrouch(false)
		}else if(this.l.isDown && this.u.isDown){
			this.player.tjump(this.player.b)
		}else if(this.l.isDown){
			this.player.twalk(this.player.b)
		}else if(this.u.isDown){
			this.player.tjump('')
		}else if (this.player.container.body.onFloor()){
			if(!moves.includes(state)){ //fix for attack and special moves to run below
				this.player.tstance()
			}
		}
	},
	controlAttack: function(){
		if(this.lp.isDown){
			this.player.container.body.onFloor()? this.player.tattk('slp') : this.player.tjattk('jlp')
		}else if(this.lk.isDown){ 
			this.player.tattk('slk')
		}else if(this.mp.isDown){
			this.player.container.body.onFloor()? this.player.tattk('smp') : this.player.tjattk('jmp')
		}else if(this.mk.isDown){ 
			this.player.tattk('smk')
		}else if(this.hp.isDown){
			this.player.container.body.onFloor()? this.player.tattk('shp') : this.player.tjattk('jhp')
		}else if(this.hk.isDown){ 
			this.player.tattk('shk')
		}
	},
	controlInputs: function(){
		this.scene.input.keyboard.on('keycombomatch', function (event) {
			this['dash' + this.player.f].matched ? this.player.tdash('f') : null
			this['dash' + this.player.b].matched ? this.player.tdash('b') : null
			this['lfb' + this.player.f].matched ? this.player.tspattk('fbf', 'l') : null
			this['mfb' + this.player.f].matched ? this.player.tspattk('fbf', 'm') : null
			this['hfb' + this.player.f].matched ? this.player.tspattk('fbf', 'h') : null
			this['ltat' + this.player.f].matched ? this.player.tspattk('tatf', 'l') : null
			this['mtat' + this.player.f].matched ? this.player.tspattk('tatf', 'm') : null
			this['htat' + this.player.f].matched ? this.player.tspattk('tatf', 'h') : null
			this['ldp' + this.player.f].matched ? this.player.tspattk('dpf', 'l') : null
			this['mdp' + this.player.f].matched ? this.player.tspattk('dpf', 'm') : null
			this['hdp' + this.player.f].matched ? this.player.tspattk('dpf', 'h') : null
			this['ca' + this.player.f].matched ? this.player.tcrattk('ca1') : null
		}, this)
	}
})

export default Input