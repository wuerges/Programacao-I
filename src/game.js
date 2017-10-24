var gamePlay = function (game) {}

//var game = new Phaser.Game(800, 600, Phaser.AUTO);
var player;
var playerGravity = 800;
var playerJumpPower;
var score=0;
var scoreText;
var topScore;
var powerBar;
var powerTween;
var placedPoles;
var poleGroup;
var minPoleGap = 100;
var maxPoleGap = 300;
var playerJumping;
var playerFallingDown;
gamePlay.prototype = {

    preload:function(){
        this.load.image("background", "assets/sky.png");
        this.load.image("player", "assets/here.png");
        this.load.image("pole", "assets/mastro.png");
        this.load.image("powerbar", "assets/powerbar.png");
        this.load.image("gametitle", "assets/gametitle.png");
        //this.load.image("playbutton", "assets/playbutton.png");
    },
    create:function(){
        //this.state.start('MainMenu');
        playerJumping = false;
        playerFallingDown = false;
        score = 0;
        placedPoles = 0;
        this.add.sprite(0,0, "background");
        poleGroup = this.add.group();
        topScore = localStorage.getItem("topFlappyScore")==null?0:localStorage.getItem("topFlappyScore");
        scoreText = this.add.text(10,10,"-",{
            font:"bold 16px Arial"
        });
        this.updateScore();
        this.stage.backgroundColor = "#87CEEB";
        this.physics.startSystem(Phaser.Physics.ARCADE);
        player = this.add.sprite(80,0,"player");
        player.anchor.set(0.5);
        player.lastPole = 1;
        this.physics.arcade.enable(player);
        player.body.gravity.y = playerGravity;
        this.input.onDown.add(this.prepareToJump, this);
        this.addPole(80);
    },
    update:function(){
        this.physics.arcade.collide(player, poleGroup, this.checkLanding);
        if(player.y>this.height){
            die();
        }
    },
    updateScore:function(){
        scoreText.text = "Pontos: "+score+"\nMelhor Pontuacao: "+topScore;
    },
    prepareToJump:function(){
        if(player.body.velocity.y==0){
            powerBar = game.add.sprite(player.x,player.y-50,"powerbar");
            powerBar.width = 0;
            powerTween = game.add.tween(powerBar).to({
                width:100
            }, 1000, "Linear",true);
            game.input.onDown.remove(prepareToJump, this);
            game.input.onUp.add(jump, this);
        }
    },
    jump:function(){
        playerJumpPower= -powerBar.width*3-100
        powerBar.destroy();
        game.tweens.removeAll();
        player.body.velocity.y = playerJumpPower*2;
        playerJumping = true;
        powerTween.stop();
        game.input.onUp.remove(jump, this);
    },
    addNewPoles:function(){
        var maxPoleX = 0;
        poleGroup.forEach(function(item) {
            maxPoleX = Math.max(item.x,maxPoleX)
        });
        var nextPolePosition = maxPoleX + game.rnd.between(minPoleGap,maxPoleGap);
        this.addPole(nextPolePosition);
    },
    addPole:function(poleX){
//        if(poleX<this.width*2){
        if(true) {
            placedPoles++;
            var pole = new Pole(this,poleX,this.rnd.between(250,380));
//            var pole = new Pole(gamePlay,poleX,50);
            this.add.existing(pole);
            pole.anchor.set(0.5,0);
            poleGroup.add(pole);
            var nextPolePosition = poleX + this.rnd.between(minPoleGap,maxPoleGap);
            this.addPole(nextPolePosition);
        }
    },
    die:function(){
        localStorage.setItem("topFlappyScore",Math.max(score,topScore));
        gamePlay.state.start("Play");
    },
    checkLanding:function(n,p){
        if(p.y>=n.y+n.height/2){
            var border = n.x-p.x
            if(Math.abs(border)>20){
                n.body.velocity.x=border*2;
                n.body.velocity.y=-200;
            }
            var poleDiff = p.poleNumber-n.lastPole;
            if(poleDiff>0){
                score+= Math.pow(2,poleDiff);
                updateScore();
                n.lastPole= p.poleNumber;
            }
            if(playerJumping){
                playerJumping = false;
                game.input.onDown.add(prepareToJump, this);
            }
        }
        else{
            playerFallingDown = true;
            poleGroup.forEach(function(item) {
                item.body.velocity.x = 0;
            });
        }
    }
}

Pole = function (game, x, y) {
    Phaser.Sprite.call(this, game, x, y, "pole");
    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.immovable = true;
    this.poleNumber = placedPoles;
};
Pole.prototype = Object.create(Phaser.Sprite.prototype);
Pole.prototype.constructor = Pole;
Pole.prototype.update = function() {
    if(playerJumping && !playerFallingDown){
        this.body.velocity.x = playerJumpPower;
    }
    else{
        this.body.velocity.x = 0
    }
    if(this.x<-this.width){
        this.destroy();
        addNewPoles();
    }
}
