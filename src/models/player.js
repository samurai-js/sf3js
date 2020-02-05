import Container from './container'
import Input from '../functions/input'
import Fireball from './fireball'

var Player = new Phaser.Class({
    initialize:
        function Player(id, scene, config) {
            this.id = id
            this.scene = scene
            this.hud = this.scene.scene.get('hudscene');
            config.id = this.id
            this.config = config;

            var x = this.id == 'p1' ? 300 : 500;
            this.xInd = this.id == 'p1' ? 1 : -1
            this.f = 'f'
            this.b = 'b'
            this.dir = 'n'
            this.blocking = true
            this.health = config.health
            this.stun = 0
            this.power = 0
            this.wins = 0

            this.container = new Container(scene, x, 500, this.config)
            this.bod = this.container.getByName('bod')
            this.effects = this.container.getByName('effects')
            this.hitbox = this.container.getByName('hitbox')
            this.hurtbox = this.container.getByName('hurtbox')
            this.shadow = this.container.getByName('shadow')
            this.fireball = new Fireball(this.scene, this.id)
            this.control = new Input(scene, this)
            
            this.bod.on('animationcomplete', this.animComplete, this);
            this.bod.on('animationupdate', this.animUpdate, this);
            this.hitbox.on(this.id + '-hitboxHit', this.showEffects, this)
            this.hitbox.on(this.id + '-hitboxBlock', this.showEffects, this)
            this._fsm()
        },
    showEffects: function(id, config){
        this.effects.setConfig(config.fx, this.xInd)
        this.effects.showFX(config.fx.name)
    },
    getConfig: function (type, name) {
        var config = this.config[type].filter(a => { return a.name === name });
        return config[0]
    },
    getMove: function(anim){
        return anim.split('-')[1];
    },
    animComplete: function (animation) {
        this.bod.emit(animation.key + '-animComplete', this);
        var moves = [this.id + '-crouch', this.id + '-ca1']
        if (!moves.includes(animation.key) && this.container.body.onFloor()) {
            this.tstance()
            this.shadow.setY(0)
        }
    },
    animUpdate: function (animation) {
        this.bod.emit(animation.key + '-animUpdate', this);
        if (this.xInd == 1) {
            this.bod.setFlipX(true); this.f = 'f'; this.b = 'b'
        } else {
            this.bod.resetFlip(); this.f = 'b'; this.b = 'f'
        }
        var moves = [this.id + '-jumpf', this.id + '-jumpb']
        if (moves.includes(animation.key) && this.container.body.onFloor()) {
            this.tstance()
        }
        if(this.state == 'attk' || this.state == 'jattk'){
            var config = this.getConfig('atk', this.getMove(animation.key))
            this.hitbox.display(config, this.xInd, this.bod.anims.currentFrame.index)
        }
        if(this.state == 'spattk'){
            var config = this.getConfig('spmoves', this.getMove(animation.key))
            if(config.hitbox){
                this.hitbox.display(config, this.xInd, this.bod.anims.currentFrame.index)
            }
        }
    },
    setBlock: function (state) {
        if (this.state == 'crouch' && state == 'low') {
            this.blocking = 'l'
        } else if (this.state == 'walk' && state == 'b') {
            this.blocking = 'h'
        } else {
            this.blocking = false
        }
        this.blocking = 'h'
    },
    setHealth: function (damage) {
        this.health < 0 ? this.health = 0 : this.health = this.health - damage
    },
    getHealth: function () {
        return this.health / this.config.health * 100
    },
    setStun: function (value) {
        this.stun > this.config.stun ? this.stun = this.config.stun : this.stun += value
    },
    getStun: function () {
        var stun = this.stun > this.config.stun ? 100 : this.stun / this.config.stun * 100
        return stun
    },
    setPower: function (value) {
        value > this.config.power ? this.power = this.config.power : this.power += value
    },
    getPower: function () {
        return this.power / this.config.power * 100
    }
})

var StateManager = require('javascript-state-machine');
StateManager.factory(Player, {
    init: 'stance',
    transitions: [
        { name: 'tstance', from: '*', to: 'stance' },
        { name: 'twalk', from: ['stance', 'walk'], to: 'walk' },
        { name: 'tdash', from: ['stance', 'walk'], to: 'dash' },
        { name: 'tjump', from: ['stance', 'walk', 'dash'], to: 'jump' },
        { name: 'thit', from: ['stance', 'walk'], to: 'hit' },
        { name: 'tattk', from: ['stance', 'walk', 'dash','attk'], to: 'attk' },
        { name: 'tjattk', from: ['jump'], to: 'jattk' },
        { name: 'tspattk', from: ['stance', 'walk', 'dash'], to: 'spattk' },
        { name: 'tcrattk', from: ['stance', 'walk', 'dash', 'attk', 'spattk'], to: 'crattk' },
        { name: 'tcrouch', from: ['stance', 'walk'], to: 'crouch' },
        { name: 'tblock', from: ['stance', 'walk'], to: 'block' },
        { name: 'tstate', from: '*', to: function (state) { return state } }],
    methods: {
        onEnterState: function(lc, type){
            this.container.body.setDrag(200,0) 
            this.setBlock(type); 
            this.hurtbox.display(this.config.hurtbox)
        },
        onStance: function () {
            this.dir = 'n';
            this.hurtbox.display(this.config.hurtbox)
            this.bod.play(this.id + '-' + this.state, true)
            this.container.body.stop()
        },
        onTwalk: function (lc, dir) {
            this.dir = dir;
            this.bod.play(this.id + '-' + this.state + dir, true)
            var config = this.getConfig('mov', this.state + dir)
            if (dir == 'f') {
                var speed = this.xInd == 1 ? config.speed : - config.speed
                this.container.body.setVelocityX(speed);
            } else if (dir == 'b') {
                var speed = this.xInd == 1 ? -config.speed : config.speed
                this.container.body.setVelocityX(speed);
            }
        },
        onTdash: function (lc, dir) {
            this.bod.play(this.id + '-' + this.state + dir, true)
            var config = this.getConfig('mov', this.state + dir)
            this.effects.setConfig(config.fx, this.xInd)
            this.effects.showFX(config.fx.name)
            switch (dir) {
                case 'f': this.container.body.setVelocityX(config.speed * this.xInd); break
                case 'b': this.container.body.setVelocityX(-config.speed * this.xInd); break
            }
        },
        onTjump: function (lc, dir) {
            this.container.body.setDrag(0,0) 
            this.effects.clear()
            this.bod.play(this.id + '-' + this.state + dir, true)
            var config = this.getConfig('mov', this.state + dir)
            this.shadow.setY(999)
            switch (dir) {
                case 'f': this.container.body.setVelocity(config.speedX * this.xInd, -config.speedY); break
                case 'b': this.container.body.setVelocity(-config.speedX * this.xInd, -config.speedY); break
                default: this.container.body.setVelocityY(-config.speedY);
            }
        },
        onTcrouch: function (lc) {
            this.bod.play(this.id + '-' + this.state, true)
            var config = this.getConfig('mov', this.state)
            this.container.body.stop()
            this.hurtbox.display(config.hurtbox)
        },
        onTblock: function (lc, config) {
            this.bod.play(this.id + '-' + this.state + config.atklvl, true)
            this.container.body.stop()
        },
        onLeaveBlock: function(){
            this.bod.anims.currentAnim.emit('resetFrame',this) //rest on block data
        },
        onThit: function (lc, config) {
            this.bod.setDepth(-1)
            this.bod.play(this.id + '-' + this.state + config.atklvl, true)
            this.container.body.stop()
            this.container.depth = 1
        },
        onLeaveHit: function(){
            this.bod.anims.currentAnim.emit('resetFrame',this) //rest on hit data
        },
        onTattk: function (lc, type) {
            this.bod.play(this.id + '-' + type, true)
            var config = this.getConfig('atk', type)
            this.container.body.setVelocityX(config.speed);
            this.container.depth = 3
        },
        onTjattk: function (lc, type) {
            var speed = this.container.body.velocity.x
            this.container.body.setVelocityX(speed);
            this.bod.play(this.id + '-' + type, true)
            this.container.depth = 2
        },
        onTspattk: function (lc, type, lvl) {
            this.bod.play(this.id + '-' + lvl + type, true)
            var config = this.getConfig('spmoves', lvl + type)
            this.container.body.setVelocityX(config.speed * this.xInd);
            this.container.depth = 4
            this.effects.setConfig(config.fx, this.xInd)
            this.effects.showFX(config.fx.name)
            switch (type) {
                case 'fbf':
                    var fbcfg = config.output[0]
                    this.fireball.setConfig(fbcfg)
                    this.fireball.setCoord(this.container.x, this.container.y, this.xInd)
                    this.fireball.shoot(); break;
                case 'dpf':
                    this.container.body.setVelocityY(-config.height);
                    break;
            }
        },
        onTcrattk: function (lc, type) {
            this.bod.play(this.id + '-' + type, true)
            var config = this.getConfig('cricarts', type)
            this.container.body.setVelocityX(config.speed * this.xInd);
            this.container.depth = 2
            this.effects.setConfig(config.fx, this.xInd)
            this.effects.showFX(config.fx.name)
            switch (type) {
                case 'ca1':
                   console.log('denji hadouuuuuuken'); break;
            }
        },
        onInvalidTransition: function (lc) { },
        onPendingTransition: function (lc) { }
    }
});

export default Player;