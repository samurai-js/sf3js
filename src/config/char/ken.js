var mov = [
    { name: 'stance', frame: { start: 14657, end: 14666, frameRate: 12, repeat: -1 } },
    { name: 'walkf', frame: { start: 14669, end: 14676, frameRate: 12, repeat: -1 }, speed: 150 },
    { name: 'walkb', frame: { start: 14677, end: 14688, frameRate: 12, repeat: -1 }, speed: 100 },
    { name: 'jump', frame: { start: 2656, end: 2667, frameRate: 10, repeat: 0 }, speedY: 350 },
    { name: 'jumpf', frame: { start: 2923, end: 2930, frameRate: 8, repeat: -1 }, speedX: 150, speedY: 380 },
    { name: 'jumpb', frame: { start: 2923, end: 2930, frameRate: 10, repeat: -1 }, speedX: 150, speedY: 380 },
    { name: 'dashf', frame: { start: 2704, end: 2709, frameRate: 12, repeat: 0 }, speed: 220, fx: { name: 'ground-dust', x: -80, y: 5 } },
    { name: 'dashb', frame: { start: 2709, end: 2715, frameRate: 12, repeat: 0 }, speed: 160, fx: { name: 'ground-dust', x: -80, y: 5 } },
    { name: 'crouch', frame: { start: 2640, end: 2643, frameRate: 6, repeat: -1 }, speed: 0, hurtbox: { x: 0, y: 20, width: 40, height: 60 } },
    { name: 'blockh', frame: { start: 14746, end: 14750, frameRate: 14, repeat: 0 }, speed: 0, noFrames: 5 },
    { name: 'hith', frame: { start: 14835, end: 14839, frameRate: 12, repeat: 0 }, speed: 0 },
]
var atk = [
    { name: 'smp', frame: { start: 2949, end: 2955, frameRate: 15, repeat: 0 }, speed: 0, hitbox: { start: 2, active: 7, x: 50, y: -20, width: 60, height: 20, damage: 80, stun: 10, onBlk: 4, onHit: 6, push: 5, atklvl: 'h' } },
    { name: 'smk', frame: { start: 3016, end: 3022, frameRate: 12, repeat: 0 }, speed: 0, hitbox: { start: 3, active: 5, x: 60, y: 0, width: 80, height: 20, damage: 80, stun: 10, onBlk: 2, onHit: 4, push: 5, atklvl: 'h' } },
]
var projectiles = [
    { name: 'lfbf', speed: 220, x: 55, y: -15, damage: 10, texture: 'fireballs-white', damage: 80, stun: 10, onBlk: 4, onHit: 6, push: 5, atklvl: 'h' },
    { name: 'mfbf', speed: 260, x: 55, y: -15, damage: 10, texture: 'fireballs-white', damage: 80, stun: 10, onBlk: 4, onHit: 6, push: 5, atklvl: 'h' },
    { name: 'hfbf', speed: 300, x: 55, y: -15, damage: 10, texture: 'fireballs-white', damage: 80, stun: 10, onBlk: 4, onHit: 6, push: 5, atklvl: 'h' }
]
var spmoves = [
    { name: 'lfbf', speed: 0, fx: { name: 'ground-dust', x: -80, y: 5 }, frame: { start: 3264, end: 3275, frameRate: 18, repeat: 0 }, output: projectiles.filter(function(a){ return a.name == 'lfbf'}) },
    { name: 'mfbf', speed: 0, fx: { name: 'ground-dust', x: -80, y: 5 }, frame: { start: 3264, end: 3275, frameRate: 14, repeat: 0 }, output: projectiles.filter(function(a){ return a.name == 'mfbf'}) },
    { name: 'hfbf', speed: 0, fx: { name: 'ground-dust', x: -80, y: 5 }, frame: { start: 3264, end: 3275, frameRate: 12, repeat: 0 }, output: projectiles.filter(function(a){ return a.name == 'hfbf'}) }
]
var cricarts = [
    { name: 'ca1', frame: { start: 3427, end: 3434, frameRate: 12, repeat: -1 }, speed: 0, hitbox: { fx: { name: 'hitsparks-fireball', x: 20, y: -30 }, start: 3, active: 5, hits: [6], x: 50, y: -25, width: 80, height: 30, damage: 70, stun: 20, onBlk: 4, onHit: 10, push: 5, atklvl: 'h' } },
]
var ken = {
    id: 'p2', name: 'ken', fullname: 'Ken Masters',
    width: 50, height: 100, health: 1000, stun: 500, power: 500, weight: 80, mov, atk, spmoves, cricarts,
    hurtbox: { x: 0, y: 10, width: 40, height: 100,
    comment: 'I did it!!!' }
}