var NAMECOUNTER = 0;

function organism(id, str, intl, speed) {
    //Creates new organism
    this.id = id;
    this.strength = parseInt(str, 10);
    this.intelligence = parseInt(intl, 10);
    this.speed = parseInt(speed, 10);
    this.name = NAMECOUNTER;
    this.vitality = 200;
    this.dir = {
        x: 0,
        y: 0
    };
    NAMECOUNTER++;
}


function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function createOrganism_A(id, str, intl, speed) {
    //Make new organism with hard coded stats
    var org = new organism(id, str, intl, speed);
    return org;
}

// destroy sprite arrays and all food
function destroyShit() {
    for(var i = 0; i < characters.length; i++) {
        characters.remove(characters.children[i]);
    }
   for(var j = 0; j < yummy.length; j++) {
       yummy.remove(yummy.children[j]);
    }
};

// GLOBAL VARS

var WIDTH = 800;
var HEIGHT = 600;
var STARTORG = 4;
var start = false;
var yummy;
var SPSCALE = 0.3;
var roundEnd = false;
var gameEnd = false;
var winningStr;
var winningInt;
var winningSpeed;
var roundCounter = 0;

// gets values for OrgA
function getStrValueA() {
    var strValueA = document.getElementById("inputStrengthA").value;
    return strValueA;
}

function getIntValueA() {
    var intValueA = document.getElementById("inputIntelligenceA").value;
    return intValueA;
}

function getSpeedValueA() {
    var speedValueA = document.getElementById("inputSpeedA").value;
    return speedValueA;
}

// gets values for OrgB
function getStrValueB() {
    var strValueB = document.getElementById("inputStrengthB").value;
    return strValueB;
}

function getIntValueB() {
    var intValueB = document.getElementById("inputIntelligenceB").value;
    return intValueB;
}

function getSpeedValueB() {
    var speedValueB = document.getElementById("inputSpeedB").value;
    return speedValueB;
}

// gets values for OrgC
function getStrValueC() {
    var strValueC = document.getElementById("inputStrengthC").value;
    return strValueC;
}

function getIntValueC() {
    var intValueC = document.getElementById("inputIntelligenceC").value;
    return intValueC;
}

function getSpeedValueC() {
    var speedValueC = document.getElementById("inputSpeedC").value;
    return speedValueC;
}


// gets values for OrgD
function getStrValueD() {
    var strValueD = document.getElementById("inputStrengthD").value;
    return strValueD;
}

function getIntValueD() {
    var intValueD = document.getElementById("inputIntelligenceD").value;
    return intValueD;
}

function getSpeedValueD() {
    var speedValueD = document.getElementById("inputSpeedD").value;
    return speedValueD;
}

// MEAT STUFF
function eatsMeat(organism, meat) {
    meat.kill();
    organism.org.strength += 5;
    organism.org.vitality += 30;
}

window.onload = function() {

    var game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
        preload: preload,
        create: create,
        update: update
    });

    function preload() {

        game.load.image('sky', 'assets/sky.png');
        game.load.image('orgA', 'assets/OrganismA.png');
        game.load.image('orgB', 'assets/OrganismB.png');
        game.load.image('orgC', 'assets/OrganismC.png');
        game.load.image('orgD', 'assets/OrganismD.png');
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
                            // for OrgA
                            player = characters.create(game.world.width * Math.random() * 0.95, game.world.height * Math.random(), 'orgA');
                            player.scale.setTo(SPSCALE, SPSCALE);
                            player.org = new createOrganism_A(1, getStrValueA(), getIntValueA(), getSpeedValueA());
                            player.org.timeout = 0;
                        }

                        // for OrgB
                        for (var i = 0; i < STARTORG; i++) {
                            player = characters.create(game.world.width * Math.random() * 0.95, game.world.height * Math.random(), 'orgB');
                            player.scale.setTo(SPSCALE, SPSCALE);
                            player.org = new createOrganism_A(2, getStrValueB(), getIntValueB(), getSpeedValueB());
                            player.org.timeout = 0;
                        }
                        // for OrgC
                        for (var i = 0; i < STARTORG; i++) {
                            player = characters.create(game.world.width * Math.random() * 0.95, game.world.height * Math.random(), 'orgC');
                            player.scale.setTo(SPSCALE, SPSCALE);
                            player.org = new createOrganism_A(3, getStrValueC(), getIntValueC(), getSpeedValueC());
                            player.org.timeout = 0;
                        }

                        // for OrgD
                        for (var i = 0; i < STARTORG; i++) {
                            player = characters.create(game.world.width * Math.random() * 0.95, game.world.height * Math.random(), 'orgD');
                            player.scale.setTo(SPSCALE, SPSCALE);
                            player.org = new createOrganism_A(4, getStrValueD(), getIntValueD(), getSpeedValueD());
                            player.org.timeout = 0;
                        }

                        yummy = game.add.group();
                        yummy.enableBody = true;
                        for (var i = 0; i < 15; i++) {
                            var meat = yummy.create(game.world.width * Math.random() * 0.95,
                                game.world.height * Math.random(),
                                'meat');
                            meat.scale.setTo(0.8, 0.8);
                        }
                        start = true;
                    }
		    shuffle(characters.children);
                }
            }
        }
    }

    function collisionHandler(e1, e2) {
        if (e1.org.id != e2.org.id) {
            if (e1.org.strength > e2.org.strength) {
		e1.org.vitality += (e2.org.vitality/3);
		e2.kill();
            } else {
		e2.org.vitality += (e2.org.vitality/3);
                e1.kill();
            }
        }
    }

    function update() {

        game.physics.arcade.collide(characters, characters, collisionHandler, null, this);
        game.physics.arcade.collide(characters, yummy, eatsMeat, null, this);
	if(gameEnd){
	  for(var i = 1; i < characters.length; i++) {
            if(characters.children[i].alive) {
                winningStr = characters.children[i].org.strength;
                winningInt = characters.children[i].org.intelligence;
                winningSpeed = characters.children[i].org.speed;
                }
            }
	  alert("Game End. Str: " + winningStr + " Int: " + winningInt + " Speed: " + winningSpeed);
	}
	else if(roundEnd){
        roundEnd = false;
        for(var i = 1; i < characters.length; i++) {
            if(characters.children[i].alive) {
                winningStr = characters.children[i].org.strength;
                winningInt = characters.children[i].org.intelligence;
                winningSpeed = characters.children[i].org.speed;
                }
            }
	alert("Round End. Str: " + winningStr + " Int: " + winningInt + " Speed: " + winningSpeed);
        destroyShit();
         for (var i = 0; i < 15; i++) {
        var meat = yummy.create(game.world.width * Math.random() * 0.95,
                                game.world.height * Math.random(), 'meat');
        meat.scale.setTo(.9, 0.9);
    }
    // for OrgA
    //increase int for gaining a generation
    winningInt = winningInt + 10;
    var newStrA = winningStr;
    var newIntA = winningInt;
    var newSpeedA = winningSpeed;
        for(var k = 0; k < 10; k++) {
            var choice = Math.round(Math.random() * 3);
            if(choice === 0) {
                newStrA++;
            }
            else if(choice === 1) {
                newIntA++;
            }
            else {
                newSpeedA++;
            }
        }
         for (var i = 0; i < STARTORG; i++) {
                            player = characters.create(game.world.width * Math.random() * 0.95, game.world.height * Math.random(), 'orgA');
                            player.scale.setTo(SPSCALE, SPSCALE);
                            player.org = new createOrganism_A(1, newStrA, newIntA, newSpeedA);
                            player.org.timeout = 0;
                        }
        // for OrgB
    var newStrB = winningStr;
    var newIntB = winningInt;
    var newSpeedB = winningSpeed;
        for(var k = 0; k < 10; k++) {
            var choice = Math.round(Math.random() * 3);
            if(choice === 0) {
                newStrB++;
            }
            else if(choice === 1) {
                newIntB++;
            }
            else {
                newSpeedB++;
            }
        }
         for (var i = 0; i < STARTORG; i++) {
                            // for OrgA
                            player = characters.create(game.world.width * Math.random() * 0.95, game.world.height * Math.random(), 'orgB');
                            player.scale.setTo(SPSCALE, SPSCALE);
                            player.org = new createOrganism_A(2, newStrB, newIntB, newSpeedB);
                            player.org.timeout = 0;
                        }
        
        // for OrgC
    var newStrC = winningStr;
    var newIntC = winningInt;
    var newSpeedC = winningSpeed;
        for(var k = 0; k < 10; k++) {
            var choice = Math.round(Math.random() * 3);
            if(choice === 0) {
                newStrC++;
            }
            else if(choice === 1) {
                newIntC++;
            }
            else {
                newSpeedC++;
            }
        }
         for (var i = 0; i < STARTORG; i++) {

                            player = characters.create(game.world.width * Math.random() * 0.95, game.world.height * Math.random(), 'orgC');
                            player.scale.setTo(SPSCALE, SPSCALE);
                            player.org = new createOrganism_A(3, newStrC, newIntC, newSpeedC);
                            player.org.timeout = 0;
                        }
        
        
        // for OrgD
        
    var newStrD = winningStr;
    var newIntD = winningInt;
    var newSpeedD = winningSpeed;
        for(var k = 0; k < 10; k++) {
            var choice = Math.round(Math.random() * 3);
            if(choice === 0) {
                newStrD++;
            }
            else if(choice === 1) {
                newIntD++;
            }
            else {
                newSpeedD++;
            }
        }
         for (var i = 0; i < STARTORG; i++) {
                            // for OrgA
                            player = characters.create(game.world.width * Math.random() * 0.95, game.world.height * Math.random(), 'orgD');
                            player.scale.setTo(SPSCALE, SPSCALE);
                            player.org = new createOrganism_A(4, newStrD, newIntD, newSpeedD);
                            player.org.timeout = 0;
                        }
        
        roundEnd = false;
                
        
        
}
        else if (start) {
            characters.forEach(function(char) {
		//console.log(char.org.name);
                //loop through all characters
	      char.scale.setTo(SPSCALE * (Math.sqrt(char.org.vitality)/Math.sqrt(200)), SPSCALE * (Math.sqrt(char.org.vitality)/Math.sqrt(200)));
	      if(char.org.vitality <= 0){
		char.kill();
	      }
	      else {
                if(char.org.timeout >= 30) {
		    char.org.vitality -= 5;
		    char.org.dir = chooseDir(char);
		    //console.log(char.org.dir);
                    char.org.timeout = 0;
                    char.body.velocity.x = char.org.speed * char.org.dir.x;
                    char.body.velocity.y = char.org.speed * char.org.dir.y;
                } else {
                    char.org.timeout += 1;
                }

                if (char.body.x >= (WIDTH - char.width)) {
		    if(char.body.x > WIDTH){
		      char.kill();
		    }
		    else {
		      char.body.velocity.x = char.org.speed * -char.org.dir.x;
		    }
		} else if (char.body.x <= 0) {
		    if(char.body.x < (0 - char.width)){
		      char.kill();
		    }
		    else {
		      char.body.velocity.x = char.org.speed * -char.org.dir.x;
		    }
                }
                if (char.body.y >= (HEIGHT - char.height)) {
                    if(char.body.y > HEIGHT){
		      char.kill();
		    }
		    else {
		      char.body.velocity.y = char.org.speed * -char.org.dir.y;
		    }
		} else if (char.body.y <= 0) {
                    if(char.body.y < (0 - char.height)){
		      char.kill();
		    }
		    else {
		      char.body.velocity.y = char.org.speed * -char.org.dir.y;
		    }
		}
	      }
            });
        var charlen = characters.length;
	var leftAlive = 0;
	var tribes = [0,0,0,0];
	for(var i = 0; i < charlen; i++){
	  if(characters.children[i].alive){
	    tribes[characters.children[i].org.id - 1]++;
	  }
	}
	var tribesAlive = 0;
	for(var q = 0; q < STARTORG; q++){
	    if(tribes[q] > 0){
	      tribesAlive++;
	    }
	}
	if(tribesAlive === 1){
	  roundEnd = true;
	  roundCounter++;
	}
	else if(tribesAlive === 0){
	  gameEnd = true;
	}
	if(roundCounter >= 10){
	  gameEnd = true;
	}

	}	
    }

    function chooseDir(currentCell) {
        var intel = currentCell.org.intelligence;
        var str = currentCell.org.strength;
        var x = currentCell.body.x;
        var y = currentCell.body.y;
        var range = 10 * intel; // infinite range for now intel * 10; // 10 is arbitrary
        var smartness = intel * Math.random();

        var dir = {
            x: 0,
            y: 0
        };

        var found = false;
	var foodfound = false;

        if (smartness > 5) {
	    if(str <= intel){
	    var foodlen = yummy.length;
	    for(var q = 0; q < foodlen; q++){
	      if(yummy.children[q].alive){
		var fx = yummy.children[q].x;
		var fy = yummy.children[q].y;
		if(Math.abs(x - fx) < range && Math.abs(y - fy) < range){
		  var xdiff = fx - x;
		  var ydiff = fy - y;
		  var len = Math.sqrt((xdiff * xdiff) + (ydiff * ydiff));
		  dir.x = xdiff / len;
		  dir.y = ydiff / len;
		  foodfound = true;
		  found = true;
		  break;
		}
	      }
	    }
	    }
	    else{
	    if(!foodfound){
            // console.log("hi");
            var len = characters.length;
            for (var i = 0; i < len; i++) {
		if(characters.children[i].alive){
                var ex = characters.children[i].x;
                var ey = characters.children[i].y;
                if (currentCell.org.name != characters.children[i].org.name && currentCell.org.id != characters.children[i].org.id) {
                    if (Math.abs(x - ex) < range && Math.abs(y - ey) < range) {
                        //console.log("range");
                        var estr = characters.children[i].org.strength;
                        if (estr < str && smartness > 10) {
                            var xdiff = ex - x;
                            var ydiff = ey - y;
                            var len = Math.sqrt((xdiff * xdiff) + (ydiff * ydiff));
                            dir.x = (xdiff) / len;
                            dir.y = (ydiff) / len;
                        } else {
                            var xdiff = ex - x;
                            var ydiff = ey - y;
                            var len = Math.sqrt((xdiff * xdiff) + (ydiff * ydiff));
                            dir.x = -(xdiff) / len;
                            dir.y = -(ydiff) / len;
                        }
			//console.log("found!");
                        found = true;
			//console.log(characters.length);
                        break;
                    }
                }
		}
            }
	    }
	    }
        }
        if (found === false) {
	    //console.log("not found");
            dir.x = Math.random() - 0.5;
            dir.y = Math.random() - 0.5;
            var len = Math.sqrt((dir.x * dir.x) + (dir.y * dir.y));
            dir.x = dir.x / len;
            dir.y = dir.y / len;
        }
        return dir;
    }
}
