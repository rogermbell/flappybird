// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };

// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)
var game = new Phaser.Game(790, 400, Phaser.AUTO, 'game', stateActions);

var score = -2;
var labelScore;
var player;
var pipes;
/*
 * Loads all resources for the game and gives them names.
 */
function preload() {
    game.load.image("playerImg","assets/jamesBond.gif");
    game.load.image("pipe","assets/pipe.png");
    game.load.audio("score","assets/point.ogg");
    game.load.audio("shot","assets/silencer_gun.mp3");


}

/*
 * Initialises the game. This function is only called once.
 */
function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    // set the background colour of the scene
    game.stage.setBackgroundColor("#58D3F7");
    //put in the welcome text
    game.add.text(50,190,"Hello! Welcome to the GAME! Have Fun",{font: "30px Courier New",fill: "#424242"});
    //add the player image to each corner
    game.add.sprite(10, 10, "playerImg");
    game.add.sprite(10, 360, "playerImg");
    game.add.sprite(750, 360, "playerImg");
    game.add.sprite(750, 10, "playerImg");
    player = game.add.sprite(80, 100, "playerImg");
    game.physics.arcade.enable(player);
    player.body.velocity.x = 0;
    player.body.velocity.y = 0;
    player.body.gravity.y = 180;

    //jamesbond.x = 100 + jamesbond.width;

    //jamesbond.scale.x = 3.2;
    //jamesbond.scale.y = 4.2;

    //alert(jamesbond.width);
    //alert(jamesbond.height)

    game.input.onDown.add(clickHandler);
    game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(playerJump);
    labelScore = game.add.text(387,20,"");
    game.input.keyboard.addKey(Phaser.Keyboard.RIGHT).onDown.add(moveRight);
    game.input.keyboard.addKey(Phaser.Keyboard.LEFT).onDown.add(moveLeft);
    game.input.keyboard.addKey(Phaser.Keyboard.UP).onDown.add(moveUp);
    game.input.keyboard.addKey(Phaser.Keyboard.DOWN).onDown.add(moveDown);

    pipes  = game.add.group();
    generatePipe();

    pipeInterval = 3;
    game.time.events.loop(pipeInterval * Phaser.Timer.SECOND, generatePipe);

    player.checkWorldBounds = true;
    player.events.onOutOfBounds.add(gameOver);


    /*
    game.add.sprite(20,0,"pipe")
    game.add.sprite(20,50,"pipe")
    game.add.sprite(20,100,"pipe")
    game.add.sprite(20,150,"pipe")
    game.add.sprite(20,200,"pipe")
    game.add.sprite(20,250,"pipe")
    game.add.sprite(20,300,"pipe")
    game.add.sprite(20,350,"pipe")
    */

    /*for (var count = 0; count < 5; count = count + 1){
        game.add.sprite(20, 50 * count, "pipe");
        game.add.sprite(150, 50 * count, "pipe")
    }*/

    /*
    for (var count = 0; count < 8; count++) {
        if(count !=4) {
            game.add.sprite(0, 50 * count, "pipe");
        }
    }
    */

}

function addPipeBlock(x, y){
    //add a new pipe part to the 'pipes' group
    var pipe = pipes.create(x, y, "pipe");
    game.physics.arcade.enable(pipe);
    pipe.body.velocity.x = -150
}

function generatePipe(){
    //calculate a random position for the gap
    var gap = game.rnd.integerInRange(1, 5);
    //generate the pipes, except where the gape should be
    for (var count = 0; count < 8; count++){
        if(count != gap && count != gap+1){
            addPipeBlock(800, count*50);
        }
    }
    changeScore()
}


/*
 * This function updates the scene. It is called for every new frame.
 */
function update() {
    game.physics.arcade
        .overlap(player, pipes, gameOver);
}

function gameOver() {
    location.reload();
}

function clickHandler (event) {
    //game.add.sprite(event.x - 15,event.y - 15,"playerImg");
    //alert(score);
    player.x = event.x - 15;
    player.y= event.y - 15;
    game.sound.play("shot");
}

function getPoint() {
    score = score + 1;

}

function changeScore() {
    score = score + 1;
    if(score>0){
        labelScore.setText(score.toString());
    }
    game.sound.play("shot");
}

function moveRight() {
    player.x = player.x + 15
}
function moveLeft() {
    player.x = player.x - 15
}
function moveUp() {
    player.y = player.y - 15
}
function moveDown() {
    player.y = player.y + 15
}
function playerJump(){
    player.body.velocity.y = -100
}
