import Healthbar from 'src/models/healthbar'

var Match = new Phaser.Class({
	initialize:
		function Match(scene, data) {
			this.scene = scene
			this.result = data.result
			this.raceTo = 2
			this.round = this.result.round
			this.ended = false
			this.endCause = null
			this.player1 = this.scene.player1
			this.player2 = this.scene.player2
			this.player1.wins = this.result.p1wins
			this.player2.wins = this.result.p2wins
			this.p1stun_cfg = { delay: 3000, repeat: 99, args: ['p1'], callback: this.decreaseStun, callbackScope: this}
			this.p2stun_cfg = { delay: 3000, repeat: 99, args: ['p2'], callback: this.decreaseStun, callbackScope: this}
			this.p1stuntimer = this.scene.time.addEvent(this.p1stun_cfg)
			this.p2stuntimer = this.scene.time.addEvent(this.p2stun_cfg)
			this.setHud()
			this.setListeners()
	},
	setHud: function(){
		this.p1health = new Healthbar(this.scene,{id: 'p1', x: 50, y: 80, width: 300, height: 15, flipped: true})
		this.p2health = new Healthbar(this.scene,{id: 'p2', x: 450, y: 80, width: 300, height: 15})
		this.p1stun = new Healthbar(this.scene,{id: 'p1', x: 200, y: 110, width: 150, height: 8, showDamage : false, autoDecrease: true, flipped: true})
		this.p2stun = new Healthbar(this.scene,{id: 'p2', x: 450, y: 110, width: 150, height: 8, showDamage : false, autoDecrease: true })
		this.p1ex = new Healthbar(this.scene,{id: 'p1', x: 50, y: 555, width: 100, height: 10, showDamage : false, flipped: true})
		this.p2ex = new Healthbar(this.scene,{id: 'p2', x: 450, y: 555, width: 100, height: 10, showDamage : false })
		this.p1ex1 = new Healthbar(this.scene,{id: 'p1', x: 150, y: 555, width: 100, height: 10, showDamage : false, flipped: true})
		this.p2ex1 = new Healthbar(this.scene,{id: 'p2', x: 550, y: 555, width: 100, height: 10, showDamage : false })
		this.p1ex2 = new Healthbar(this.scene,{id: 'p1', x: 250, y: 555, width: 100, height: 10, showDamage : false, flipped: true})
		this.p2ex2 = new Healthbar(this.scene,{id: 'p2', x: 650, y: 555, width: 100, height: 10, showDamage : false })

		this.p1stun.setPercent(0)
		this.p2stun.setPercent(0)
		this.p1ex.setPercent(0)
		this.p2ex.setPercent(0)
		this.p1ex1.setPercent(0)
		this.p2ex1.setPercent(0)
		this.p1ex2.setPercent(0)
		this.p2ex2.setPercent(0)
		
		this.p1name = this.createText({ x: 70, y: 120, text: this.player1.config.name.toUpperCase(), scrollFactor: 0, fontSize: 20, font: 'Arial', shadow: '', color: '#fff', stroke: '#000', strokeWidth: 4, origin: 0.5, visible: true, align: 'left' })
		this.p2name = this.createText({ x: 730, y: 120, text: this.player2.config.name.toUpperCase(), scrollFactor: 0, fontSize: 20, font: 'Arial', shadow: '', color: '#fff', stroke: '#000', strokeWidth: 4, origin: 0.5, visible: true, align: 'right' })
		this.p1w1mark = this.createText({ x: 345, y: 65, text: '.', scrollFactor: 0, fontSize: 18, font: 'Arial', shadow: '', color: '#ff0000', stroke: '#ccc', strokeWidth: 7, origin: 0.8, visible: true })
		this.p2w1mark = this.createText({ x: 465, y: 65, text: '.', scrollFactor: 0, fontSize: 18, font: 'Arial', shadow: '', color: '#ff0000', stroke: '#ccc', strokeWidth: 7, origin: 0.8, visible: true })
		this.p1w2mark = this.createText({ x: 315, y: 65, text: '.', scrollFactor: 0, fontSize: 18, font: 'Arial', shadow: '', color: '#ff0000', stroke: '#ccc', strokeWidth: 7, origin: 0.8, visible: true })
		this.p2w2mark = this.createText({ x: 495, y: 65, text: '.', scrollFactor: 0, fontSize: 18, font: 'Arial', shadow: '', color: '#ff0000', stroke: '#ccc', strokeWidth: 7, origin: 0.8, visible: true })
		this.setMarks()

		this.time = this.createText({ x: 400, y: 100, text: 99, scrollFactor: 0, fontSize: 65, font: 'Arial', shadow: '', color: '#EDD161', stroke: '#3D1300', strokeWidth: 8, origin: 0.5, visible: true })
		this.info = this.createText({ x: 400, y: 250, text: '', scrollFactor: 0, fontSize: 95, font: 'Arial', shadow: '', color: '#EDD161', stroke: '#3D1300', strokeWidth: 8, origin: 0.5, align: 'center', visible: true })
		this.timer = this.scene.time.addEvent({ delay: 1000, repeat: this.time.text, paused: true });
		this.pretimer = this.scene.time.addEvent({ delay: 100, repeat: 6, paused: true });
		this.posttimer = this.scene.time.addEvent({ delay: 1000, repeat: 10, paused: true });
		this.random = 1
		this.randtimer = this.scene.time.addEvent({delay: 1000, repeat: 99, callback: function () {this.random = Phaser.Math.Between(1, 3)}, callbackScope: this});
	},
	setListeners: function(){
		this.player1.hitbox.on('p1-hitboxHit', this.setOnHit, this)
		this.player1.hitbox.on('p1-hitboxBlock', this.setOnBlock, this)
		this.player1.fireball.on('p1-hitboxHit', this.setOnHit, this)
		this.player1.fireball.on('p1-hitboxBlock', this.setOnBlock, this)
		
		this.player2.hitbox.on('p2-hitboxHit', this.setOnHit, this)
		this.player2.hitbox.on('p2-hitboxBlock', this.setOnBlock, this)
		this.player2.fireball.on('p2-hitboxHit', this.setOnHit, this)
		this.player2.fireball.on('p2-hitboxBlock', this.setOnBlock, this)
	},
	setMarks: function(){
		if(this.player1.wins == 1) this.p1w1mark.setText('V').setVisible(true)
		if(this.player1.wins == 2) this.p1w2mark.setText('V').setVisible(true)
		if(this.player2.wins == 1) this.p2w1mark.setText('V').setVisible(true)
		if(this.player2.wins == 2) this.p2w2mark.setText('V').setVisible(true)
	},
	setOnHit: function(id, config){
		var opponent = id == 'p1' ? this.player2 : this.player1
		var hitAnim  = this.scene.anims.get(opponent.id + '-hit' + config.atklvl)
		var frames = hitAnim.frames.length
		var lastframe = hitAnim.getLastFrame()

		for(var i= 0; i < config.onHit; i++){
			hitAnim.addFrame([{key: lastframe.textureKey, frame: lastframe.textureFrame}])
			opponent.container.x += config.push/config.onHit
		}
		hitAnim.once('resetFrame', function(){
			for(var i= 0; i < config.onHit; i++){
				hitAnim.removeFrameAt(frames)
			}
		}, this);
		opponent.thit(config)
		this.updateHealth(opponent, config)
		this.updateStun(opponent, config)
		this[opponent.id + 'stun'].stuntimer.paused = true
		this[opponent.id + 'stuntimer'].reset(this[opponent.id + 'stun_cfg'])
	},
	setOnBlock: function(id, config){
		var opponent = id == 'p1' ? this.player2 : this.player1	
		var player = id == 'p1' ? this.player1 : this.player2	
		var blockAnim  = this.scene.anims.get(opponent.id + '-block' + config.atklvl)
		var block_cfg  = opponent.getConfig('mov','block' + config.atklvl)
		var noFrames = block_cfg.noFrames
		var lastframe = blockAnim.getLastFrame()
		for(var i= 0; i < config.onBlk; i++){
			blockAnim.addFrame([{key: lastframe.textureKey, frame: lastframe.textureFrame}])
			var overlap = (player.container.x + config.x + config.width - opponent.container.x) - player.container.width
			if (player.xInd == 1){
				opponent.container.x += config.push/config.onBlk 
			}else{
				opponent.container.x -= config.push/config.onBlk 
			}
		}
		blockAnim.once('resetFrame', function(){
			for(var i= 0; i < config.onBlk; i++){
				blockAnim.removeFrameAt(noFrames)
			}
		}, this);
		this.updateEx(opponent, config)
		//this.updateStun(opponent, config)		
		opponent.tblock(config)
	},
	decreaseStun: function(id){
		this[id + 'stun'].stuntimer.paused = false
	},
	createText: function (config) {
			return this.scene.add.text(config.x, config.y)
			.setText(config.text).setScrollFactor(config.scrollFactor)
			.setFontSize(config.fontSize).setFontFamily(config.font)
			.setShadow(config.shadow).setColor(config.color)
			.setStroke(config.stroke, config.strokeWidth).setOrigin(config.origin)
			.setAlign(config.align).setVisible(config.visible)
	},
	start: function(){
		this.pretimer.paused = false;
		this.player1.control.lock(true)

		if (this.pretimer.repeatCount == 5) {
			this.info.setText('ROUND ' + this.round)
		}else if (this.pretimer.repeatCount == 1) {
			this.info.setText("FIGHT!")
		}else if (this.pretimer.repeatCount == 0) {
			// if (this.random == 1) this.player2.tstance() 
        	// if (this.random == 2) this.player2.twalk('f')
			// if (this.random == 3) this.player2.twalk('b') 
			//this.player2.twalk('b') 
			//console.log(this.player2.stun)
			//this.scene.scene.start('resultscene', {result: this.result}); // last scene
			this.info.setVisible(false)
			this.player1.control.lock(false)
			this.timer.paused = false;
			this.time.text = this.timer.repeatCount
			this.time.text < 10 ? this.time.setColor('#E53941').setText('0' + this.time.text) : null
		}	
		if(this.timer.repeatCount == 0){
			this.endCause = 'TIME OVER'
			this.setResult()
			this.end()
		}
	},
	end:function(){
		this.ended = true
		this.timer.paused = true;
		this.player1.control.lock(true)
		this.posttimer.paused = false;

		var winner = this.result.draw ? "DRAW GAME" : this.result.winner.config.name + " WINS!"
		if(this.posttimer.repeatCount == 10){
			this.info.setText(this.endCause).setVisible(true) // pause last animation
			if(!this.result.draw) this.result.winner.tstance()
		}else if (this.posttimer.repeatCount == 6) {
			this.info.setText(winner.toUpperCase()).setVisible(true) // determine winner
			this.setMarks()
		}else if (this.posttimer.repeatCount == 3) { //additional info
			if(!this.result.draw){
				this.result.winner.health == 1000 ? this.info.setText("PERFECT!").setVisible(true) : null
			}
		}else if (this.posttimer.repeatCount == 0) { 
			this.info.setVisible(false)
			if(this.result.p1wins == this.raceTo || this.result.p2wins == this.raceTo ){
				this.scene.scene.start('resultscene', {result: this.result}); // last scene
			}else{
				this.result.round = this.round + 1
				this.scene.scene.start('mainscene'); 
				this.scene.scene.start('hudscene', {result: this.result}); //restart with the results
			}
		}
	},
	setResult: function(){
		this.result.draw = false
		if(this.player1.health > this.player2.health){
			this.result.winner = this.player1
			this.result.p1wins += 1
			this.player1.wins += 1
		}else if(this.player2.health > this.player1.health){
			this.result.winner = this.player2
			this.result.p2wins += 1
			this.player2.wins += 1
		}else if (this.player2.health == this.player1.health){
			this.result.draw = true
			this.result.p1wins += 1
			this.result.p2wins += 1
			this.player1.wins += 1
			this.player2.wins += 1
		}
	},
	updateHealth: function(id, value){
		if(value < 100){
			this[id + 'health'].setColor(0x23E94F, 0x6EFF5B) //green
			this[id + 'health'].setPercent(value)
		}
		if(value <= 20){
			this[id + 'health'].setColor(0xff0000, 0xfc5353) //red (critical)
			this[id + 'health'].setPercent(value)
		}
		if(value <= 0) {
			this.endCause = 'K.O!!!'
			this.setResult()
			this.end()
		}		
	},
	updateStun: function(player, config){
		player.setStun(config.stun)
		var stun = player.getStun()
		if(stun > 0){
			this[player.id + 'stun'].setColor(0xffab51, 0xfcbe7b) //orange
			this[player.id + 'stun'].setPercent(stun)
		}
	},
	updateEx: function(player, config){
		player.setPower(config.stun)
		var ex = player.getPower()
		if(ex > 0){
			this[player.id + 'ex'].setColor(0x9dbff9, 0x5391fc) //blue
			this[player.id + 'ex'].setPercent(ex)
		}
	}
});

export default Match;