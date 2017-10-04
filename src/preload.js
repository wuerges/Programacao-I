var preload = function (game) {}

preload.prototype = {
    preload: function () {
        var loadingBar = this.add.sprite(160, 240, "loading");
        loadingBar.anchor.setTo(0.5, 0.5);
        this.load.setPreloadSprite(loadingBar);
        this.game.load.spritesheet("numbers", "assets/numbers.png", 100, 100);
        this.game.load.image("gametitle", "assets/gametitle.png");
        this.game.load.image("play", "assets/play.png");

        this.game.load.image("infobt", "assets/info.png");
        this.game.load.image("leadbt", "assets/lead.png");
        this.game.load.image("mutebt", "assets/mute.png");
        this.game.load.image("logo", "assets/logo.png");

        this.game.load.image("menu", "assets/popy.png");
        this.game.load.image("back", "assets/backbutton.png");
    },
    create: function () {
        this.game.state.start("GameTitle");
    }
}
