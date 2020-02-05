var Healthbar = new Phaser.Class({
	initialize:
	function Healthbar(scene, config) {
        this.cont = new Phaser.GameObjects.Graphics(scene);
        this.bg = new Phaser.GameObjects.Graphics(scene);
        this.trail = new Phaser.GameObjects.Graphics(scene);
        this.id = config.id
		this.width = config.width;
		this.height = config.height;
		this.x = config.x
        this.y = config.y;	
        this.value = 0
        this.oldWidth = null
        this.color = null
        this.gradient = null
        this.flipped = config.flipped
		this.flipX = this.flipped ? -1 : 1
		this.contentx  = this.flipped ? this.width + this.x : this.x
		this.scene = scene
		this.scene.add.existing(this.bg);
        this.scene.add.existing(this.trail);
        this.scene.add.existing(this.cont);
        this.showDamage = config.showDamage == false ?  false : true
        this.timeout_cfg = {delay: 2000, repeat: 99, callback: this.clearTrail, callbackScope: this }
        this.timeout = this.scene.time.addEvent(this.timeout_cfg)
        this.stun_cfg = {delay: 30, loop: true, paused: true, callback: this.autoDecrease, callbackScope: this }
        this.stuntimer = config.autoDecrease == true ? this.scene.time.addEvent(this.stun_cfg) : null
        this.setColor()
        this.drawBackground()
        this.setPercent()
    },
    drawBackground: function(){
        this.bg.fillStyle(0x3f3f3f); //gray
        this.bg.lineStyle(4, 0xffffff, 1);
        this.bg.strokeRect(this.x, this.y, this.width, this.height);
        this.bg.fillRect(this.x, this.y, this.width, this.height);
    },
	draw: function(width) {
        this.cont.clear();
		this.cont.fillStyle(this.color); //content
		this.cont.fillRect(this.contentx, this.y, width * this.flipX, this.height);
		this.cont.fillStyle(this.gradient); //gradient
		this.cont.fillRect(this.contentx, this.y, width * this.flipX, this.height/2);
    },
    setColor(color = 0xD9B931, gradient = 0xedd161){ //gold
        this.color = color
        this.gradient = gradient
    },
    setPercent: function(percent = 100){        
        if(percent < 0) percent = 0;
        if(percent > 100) percent = 100;
        this.value = (percent * this.width) / 100;
        this.draw(this.value)
        if(this.showDamage) this.showTrail()
    },
    autoDecrease: function(){
        if(this.value > 0){
            var player = this.id == 'p1' ? this.scene.player1 :  this.scene.player2
            this.draw(this.value); 
            this.value = this.value <= 0 ? 0 : this.value -  1
            player.stun = player.config.stun * this.value/100
        } 
    },
    getPercent: function(){
        var percent = this.value < 0 ? 0 : this.value
        return percent
    },
	showTrail: function(){
		this.trail.fillStyle(0xfc8387); //red 
        this.trail.fillRect(this.contentx, this.y, this.oldWidth * this.flipX, this.height);
        this.timeout.reset(this.timeout_cfg)
    },
    clearTrail: function(){
        this.trail.clear()
    }
})

export default Healthbar;