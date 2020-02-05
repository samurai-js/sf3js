var Collissions = new Phaser.Class({
	initialize:
		function Collissions(scene) {
            this.scene = scene;
            this.player1 = this.scene.player1
            this.player2 = this.scene.player2
            this.scene.physics.add.collider(this.player1.container, this.scene.ground)
            this.scene.physics.add.collider(this.player2.container, this.scene.ground)
		    this.scene.physics.add.collider(this.player1.hurtbox, this.player2.hurtbox)
		    this.scene.physics.add.collider(this.player1.container, this.player2.container)
            this.scene.physics.add.collider(this.player1.fireball, this.player2.hurtbox, this.fireballHit, null, this)		    
            this.scene.physics.add.collider(this.player2.fireball, this.player1.hurtbox, this.fireballHit, null, this)
            this.scene.physics.add.collider(this.player1.hitbox, this.player2.hurtbox, this.attackHit, null, this)
		    this.scene.physics.add.collider(this.player2.hitbox, this.player1.hurtbox, this.attackHit, null, this)
        },
        attackHit: function(hitbox, hurtbox){
            var player = hurtbox.getPlayer()
            this.checkBlock(hitbox, player)
        },
        fireballHit: function(fireball, hurtbox){
            var player = hurtbox.getPlayer()
            this.checkBlock(fireball, player)
        },
        checkBlock: function(hitbox, player){
            switch (player.blocking) {
                case 'h': hitbox.setHit('blocked'); break
                case 'l' : hitbox.setHit('blocked'); break
                case false : hitbox.setHit(true); break
            }
        }
})

export default Collissions