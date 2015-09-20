var NAMECOUNTER = 0;

function organism(id, str, intl, speed) {
    //Creates new organism
    this.id = id;
    this.strength = str;
    this.intelligence = intl;
    this.speed = speed;
    this.name = NAMECOUNTER;
    this.dir = {x: 0, y:0};
    NAMECOUNTER++;
}

function createOrganism_A(id, str, intl, speed) {
    //Make new organism with hard coded stats
    var org = new organism(id, str, intl, speed);
    return org;
}

var WIDTH = 800;
var HEIGHT = 600;
var STARTORG = 5;
var start = false;
var yummy;

function getStrValue() {
    var strValue = document.getElementById("inputStrength").value;
    return strValue;
}

function getIntValue() {
    var intValue = document.getElementById("inputIntelligence").value;
    return intValue;
}

function getSpeedValue() {
    var speedValue = document.getElementById("inputSpeed").value;
    return speedValue;
}

function eatsMeat(organism, meat) {
    meat.kill();
    organism.strength += 5;
}

window.onload = function() {

    var game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
        preload: preload,
        create: create,
        update: update
    });

    function preload() {

        game.load.image('sky', 'assets/sky.png');
        game.load.image('orgA', 'assets/organismA.png');
        game.load.image('orgB', 'assets/OrganismB.png');
        game.load.image('orgC', 'assets/organismC.png');
        game.load.image('orgD', 'assets/organismD.png');
        game.load.image('meat', 'assets/chocolate.png');
        

    }

    function create() {

        //Physics
        game.physics.startSystem(Phaser.Physics.ARCADE);

        //Background
        game.add.sprite(0, 0, 'sky');
        characters = game.add.group();
        characters.enableBody = true;
        //  Our controls.
        cursor = game.input.keyboard.createCursorKeys();

        if (!start) {
            game.input.keyboard.onDownCallback = function(e) {
                if (e.keyCode === 13) {
                    if (!start) {
                        for (var i = 0; i < STARTORG; i++) {
                            player = characters.create(game.world.width * Math.random(), game.world.height * Math.random(), 'orgA');
                            player.scale.setTo(0.45, 0.45);
                            player.org = new createOrganism_A(1, getStrValue(), getIntValue(), getSpeedValue());
                            player.org.timeout = 0;
                        }
                        for (var i = 0; i < STARTORG; i++) {
                            player = characters.create(game.world.width * Math.random(), game.world.height * Math.random(), 'orgB');
                            player.scale.setTo(0.45, 0.45);
                            player.org = new createOrganism_A(2, getStrValue(), getIntValue(), getSpeedValue());
                            player.org.timeout = 0;
                        }
                        yummy = game.add.group();
                        yummy.enableBody = true;
                        for (var i = 0; i < 30; i++) {
                            var meat = yummy.create(game.world.width * Math.random() * 0.95,
                                game.world.height * Math.random(),
                                'meat');
                            meat.scale.setTo(.9, 0.9);
                        }
                        start = true;
                    }

                }
            }
        }

    }

    function collisionHandler(e1, e2) {

          if(e1.org.id != e2.org.id){
            if(e1.org.strength > e2.org.strength){
                e2.kill();
            }
            else {
                e1.kill();
            }
          }
        

        // refer to World.js line 393
        // https://github.com/photonstorm/phaser/blob/v2.4.3/src/physics/arcade/World.js
        // ?? do something with collideCallback, processCallback, callbackContext
        /*if (e1.id === e2.id) {
            var strength = (e1.strength + e2.strength) / 2;
            var intelligence = (e1.intelligence + e2.intelligence) / 2;
            var speed = e1.speed;

            player = characters.create(game.world.width * Math.random(), game.world.height * Math.random(), 'dude');
            player.org = new Organism(e1.id, strength, intelligence, speed);

            // if (e1.intelligence < e2.intelligence) {
            //     intelligence = e1.intelligence * 1.1;
            // }
            // else {
            //     intelligence = e2.intelligence * 1.1;
            // }

            // switch(e1.id) {
            //     case 1:
            //         organism = new Organism(5, intelligence, 5);
            //         break;
            //     case 2:
            //         organism = new Organism(1, intelligence, 8);
            //         break;
            //     case 3:
            //         organsim = new Organism(6, intelligence, 4);
            //         break;
            // }

            // both parents remaining life span decreases
            e1.strength -= 2;
            e2.strength -= 2;
        }*/
    }

    function eatsMeat(organism, meat) {
        meat.kill();
        organism.strength += 5;
    }

    function update() {

        game.physics.arcade.collide(characters, characters, collisionHandler, null, this);
        game.physics.arcade.collide(characters, yummy, eatsMeat, null, this);

        if (start) {
            characters.forEach(function(char) {
                //loop through all characters
                var xdirection;
                var ydirection;
                xdirection = Math.round(Math.random());
                ydirection = Math.round(Math.random());

                if (char.org.timeout == 30) {
                    char.org.timeout = 0;
                    char.org.dir = chooseDir(char);
                    char.body.velocity.x = char.org.speed * char.org.dir.x;
                    char.body.velocity.y = char.org.speed * char.org.dir.y;
                } else {
                    char.org.timeout += 1;
                }

                if (char.body.x >= (WIDTH - char.width)) {
                    char.body.velocity.x = char.org.speed * -char.org.dir.x;
                } else if (char.body.x <= 0) {
                    char.body.velocity.x = char.org.speed * -char.org.dir.x;
                }
                if (char.body.y >= (HEIGHT - char.height)) {
                    char.body.velocity.y = char.org.speed * -char.org.dir.y;
                } else if (char.body.y <= 0) {
                    char.body.velocity.y = char.org.speed * -char.org.dir.y;
                }
            });
        }
    }

    function chooseDir(currentCell) {
        var intel = currentCell.org.intelligence;
        var str = currentCell.org.strength;
        var x = currentCell.body.x;
        var y = currentCell.body.y;
        var range = intel * 8; // 8 is arbitrary
        var smartness = intel * Math.random();

        var dir = {
            x: 0,
            y: 0
        };
	var found = false;
        if (smartness > 0.2) {
           // console.log("hi");
            var len = characters.length;
            for (var i = 0; i < len; i++) {
                var ex = characters.children[i].x;
                var ey = characters.children[i].y;
                if (currentCell.org.name != characters.children[i].org.name && currentCell.org.id != characters.children[i].org.id) {
                    if (Math.abs(x - ex) < range && Math.abs(y - ey) < range) {
		    //console.log("range");
                        var estr = characters.children[i].org.strength;
                        if (estr > str) {
			    var xdiff = ex - x;
			    var ydiff = ey - y;
                            var len = Math.sqrt((xdiff * xdiff) + (ydiff * ydiff));
                            dir.x = -(xdiff) / len;
                            dir.y = -(ydiff) / len;
                        } else {
			    var xdiff = ex - x;
			    var ydiff = ey - y;
                            var len = Math.sqrt((xdiff * xdiff) + (ydiff * ydiff));
                            dir.x = (xdiff) / len;
                            dir.y = (ydiff) / len;
                        }
                        found = true;
                        break;
                    }
                }
            }
        }
        if (found == false) {
            dir.x = Math.random() - 0.5;
            dir.y = Math.random() - 0.5;
            var len = Math.sqrt((dir.x * dir.x) + (dir.y * dir.y));
            dir.x = dir.x / len;
            dir.y = dir.y / len;
        }
        return dir;
    }
}
