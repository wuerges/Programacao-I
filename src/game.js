var game = function (game) {

window.onload = function() {
	var game = new Phaser.Game(800, 600, Phaser.AUTO);
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
     var play = function(game){}
     play.prototype = {

		 preload:function(){
			 game.load.image("background", "assets/sky.png");
		   game.load.image("player", "assets/here.png");
		   game.load.image("pole", "assets/mastro.png");
		   game.load.image("powerbar", "assets/powerbar.png");
		   game.load.image("gametitle", "assets/gametitle.png");
		   game.load.image("playbutton", "assets/playbutton.png");
		},
		create:function(){
			this.state.start('MainMenu');
			playerJumping = false;
			playerFallingDown = false;
			score = 0;
			placedPoles = 0;
			game.add.sprite(0,0, "background");
			poleGroup = game.add.group();
			topScore = localStorage.getItem("topFlappyScore")==null?0:localStorage.getItem("topFlappyScore");
			scoreText = game.add.text(10,10,"-",{
				font:"bold 16px Arial"
			});
			updateScore();
			game.stage.backgroundColor = "#87CEEB";
			game.physics.startSystem(Phaser.Physics.ARCADE);
			player = game.add.sprite(80,0,"player");
			player.anchor.set(0.5);
			player.lastPole = 1;
			game.physics.arcade.enable(player);
			player.body.gravity.y = playerGravity;
			game.input.onDown.add(prepareToJump, this);
			addPole(80);
		},
		update:function(){
			game.physics.arcade.collide(player, poleGroup, checkLanding);
			if(player.y>game.height){
				die();
			}
		}
	}
     game.state.add("Play",play);
     game.state.start("Play");
	function updateScore(){
		scoreText.text = "Pontos: "+score+"\nMelhor Pontuacao: "+topScore;
	}
	function prepareToJump(){
		if(player.body.velocity.y==0){
	          powerBar = game.add.sprite(player.x,player.y-50,"powerbar");
	          powerBar.width = 0;
	          powerTween = game.add.tween(powerBar).to({
			   width:100
			}, 1000, "Linear",true);
	          game.input.onDown.remove(prepareToJump, this);
	          game.input.onUp.add(jump, this);
          }
	}
     function jump(){
          playerJumpPower= -powerBar.width*3-100
          powerBar.destroy();
          game.tweens.removeAll();
          player.body.velocity.y = playerJumpPower*2;
          playerJumping = true;
          powerTween.stop();
          game.input.onUp.remove(jump, this);
     }
     function addNewPoles(){
     	var maxPoleX = 0;
		poleGroup.forEach(function(item) {
			maxPoleX = Math.max(item.x,maxPoleX)
		});
		var nextPolePosition = maxPoleX + game.rnd.between(minPoleGap,maxPoleGap);
		addPole(nextPolePosition);
	}
	function addPole(poleX){
		if(poleX<game.width*2){
			placedPoles++;
			var pole = new Pole(game,poleX,game.rnd.between(250,380));
			game.add.existing(pole);
	          pole.anchor.set(0.5,0);
			poleGroup.add(pole);
			var nextPolePosition = poleX + game.rnd.between(minPoleGap,maxPoleGap);
			addPole(nextPolePosition);
		}
	}
	function die(){
		localStorage.setItem("topFlappyScore",Math.max(score,topScore));
		game.state.start("Play");
	}
	function checkLanding(n,p){
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
}
}
