var gameTitle = function (game) {}

gameTitle.prototype = {
    create: function () {
        this.x = this.game.width / 2;
        this.y = this.game.height / 2;

        var style = {
            font: "35px Arial",
            fill: "#000000",
            align: "center"
        };

        gameTitle = this.game.add.text(this.x, 0, "TESTE", style);
        gameTitle.anchor.set(0.5);
        this.game.add.tween(gameTitle).to({
            y: this.y * 0.5
        }, 700, Phaser.Easing.Elastic.Out).start();


        // logo of the game **we are using phaser framework logo**
        gameLogo = this.game.add.sprite(this.x, 0, "logo");
        gameLogo.anchor.setTo(0.5, 0.5);
        gameLogo.scale.setTo(0.3, 0.3);
        this.game.add.tween(gameLogo).to({
            y: this.y
        }, 700, Phaser.Easing.Elastic.Out).start();

        //play button sprite
        playButton = this.game.add.button(this.x, this.y * 2, "play", this.playTheGame, this);
        playButton.anchor.setTo(0.5, 0.5);
        this.game.add.tween(playButton).to({
            y: this.y * 1.5
        }, 500, Phaser.Easing.Elastic.Out).start();

        // info button
        infoButton = this.game.add.button(this.x * 0, this.y * 0.1, "infobt", this.showInfo, this);
        infoButton.anchor.setTo(0.5, 0.5);
        this.game.add.tween(infoButton).to({
            x: this.x * 0.2
        }, 500, Phaser.Easing.Elastic.Out).start();

        //leaderbooard
        leadButton = this.game.add.button(this.x * 0, this.y * 0.1, "leadbt", this.playTheGame, this);
        leadButton.anchor.setTo(0.5, 0.5);
        this.game.add.tween(leadButton).to({
            x: this.x
        }, 500, Phaser.Easing.Elastic.Out).start();

        //mute button
        muteButton = this.game.add.button(this.x * 2, this.y * 0.1, "mutebt", this.showSound, this);
        muteButton.anchor.setTo(0.5, 0.5);
        this.game.add.tween(muteButton).to({
            x: this.x * 1.8
        }, 500, Phaser.Easing.Elastic.Out).start("Game");


        // pop up menu for the infor button
        popmenu = this.game.add.sprite(this.x, this.y * 0, "menu"); //pop-uo
        popmenu.anchor.setTo(0.5, 0.5);
        popmenu.y = -popmenu.height; // positioned outside the game
        popmenu.y = this.y * 2 + popmenu.height / 2;

        //back button
        backButton = this.game.add.button(0, popmenu.height / 4, "back", this.hidepop, this);
        backButton.anchor.setTo(0.5, 0.5);
        popmenu.addChild(backButton) // add the title text as a child of  the pop-up menu

        // Text to display on the pop up menu
        var style = {
            font: " 18px Arial",
            fill: "#ffffff",
            align: 'center',
            wordWrap: true,
            wordWrapWidth: 150
        };
        var infotext = this.game.add.text(0, 0, "Jogo criado por Felipe e Isabela, para Prog I. Desenvolvido com muito amor, em Chapeco - SC.", style);
        infotext.anchor.set(0.5);
        popmenu.addChild(infotext) // add the info text as a child of  the pop-up menu

        // text title of the pop-up menu
        var style = {
            font: " bold 22px Arial",
            fill: "#ffffff",
            align: 'center',
            wordWrap: true,
            wordWrapWidth: 150
        };
        var infotext = this.game.add.text(0, -popmenu.height / 4, "INFO", style);
        infotext.anchor.set(0.5);
        popmenu.addChild(infotext) // add the title text as a child of  the pop-up menu

        // Here is the end of the pop-up menu code

    },
    playTheGame: function () {

    },
    showInfo: function () {
        // diable the sound and the leaderboard buttons
        leadButton.inputEnabled = false;
        muteButton.inputEnabled = false;

        this.game.stage.backgroundColor = "#FFF";
        this.game.add.tween(popmenu).to({
            y: this.y * 2 - popmenu.height / 2
        }, 1200, Phaser.Easing.Elastic.Out).start();

        // Game logo
        this.game.add.tween(gameLogo).to({
            y: gameTitle.y - gameLogo.height / 4
        }, 500, Phaser.Easing.Elastic.Out).start();
        this.game.add.tween(gameLogo.scale).to({
            x: 0.15,
            y: 0.15,
        }, 500, Phaser.Easing.Elastic.Out).start();

        // start button
        this.game.add.tween(playButton).to({
            y: this.y * 2.1
        }, 100, Phaser.Easing.Linear.In).start();

        // game title

        this.game.add.tween(gameTitle).to({
            y: this.y * 0.45
        }, 1000, Phaser.Easing.Elastic.Out).start();
    },
    hidepop: function () {

        this.game.stage.backgroundColor = "#ff1a1a";
        this.game.add.tween(popmenu).to({
            y: this.y * 2 + popmenu.height / 2
        }, 300, Phaser.Easing.Linear.In, ).start();

        this.game.add.tween(gameTitle).to({
            y: this.y * 0.5
        }, 1000, Phaser.Easing.Elastic.Out).start();

        // Game logo
        this.game.add.tween(gameLogo).to({
            y: this.y
        }, 500, Phaser.Easing.Elastic.Out).start();

        this.game.add.tween(gameLogo.scale).to({
            x: 0.3,
            y: 0.3,
        }, 500, Phaser.Easing.Elastic.Out).start();

        // play button
        this.game.add.tween(playButton).to({
            y: this.y * 1.5
        }, 1000, Phaser.Easing.Elastic.Out).start();

        // enable the sound and the leaderboard buttons back
        leadButton.inputEnabled = true;
        muteButton.inputEnabled = true;
    },
}
