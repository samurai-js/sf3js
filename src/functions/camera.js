var Camera = new Phaser.Class({
	initialize:
		function Camera(scene) {
            this.scene = scene;
            this.cam = this.scene.cameras.main
            this.player1 = this.scene.player1
            this.player2 = this.scene.player2
            this.center
        },
        start: function(){
            this.center = this.scene.add.sprite(400,513,null).setVisible(false)
            this.cam.setBounds(0, 0, 800, 600, true).setZoom(2);
            this.setDeadZone();
        },
        setDeadZone: function(){
            var dz_width = 150
            var dz_height = 150
            var dz_y = 270
            this.cam.deadzone = new Phaser.Geom.Rectangle(this.center.x - dz_width/2, dz_y, dz_width, dz_height);

            if (this.cam.deadzone && this.scene.physics.config.debug){
                this.center.setVisible(true)
                var graphics = this.scene.add.graphics().setScrollFactor(0);
                graphics.lineStyle(1, 0x00ff00, 2);
                graphics.strokeRect(this.cam.deadzone.x, this.cam.deadzone.y, this.cam.deadzone.width, this.cam.deadzone.height);
            }
        },
        scrollCamera: function(){
            this.center.setY(this.player1.container.y)
            this.center.setX((this.player1.container.x + this.player2.container.x)/2)
            this.cam.startFollow(this.center,true,0.1,0.1)
            this.onEdge()
        }, 
        isInside: function(obj){
            var isInside = this.cam.deadzone.contains(obj.container.x,obj.container.y) ? true : false
            return isInside
        },
        isBothInsideZone:function(){
            var isBothInside = this.isInside(this.player1) && this.isInside(this.player2) ? true : false
            return isBothInside
        },
        onEdge:function(){
            var onEdge = this.distanceBet(this.player1,this.player2) >= 350 ? true : false
            if(onEdge){
                if(this.player1.dir == 'f' || this.player2.dir == 'f'){
                    onEdge = false
                }
            } 
            if(onEdge){
                this.player1.container.body.setVelocityX(0)
                this.player2.container.body.setVelocityX(0)
            }
        },
        distanceBet: function(object, target) {
            var xDif = object.container.x - target.container.x;
            return xDif * -object.xInd;
        }
})

export default Camera