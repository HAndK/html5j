enchant();

window.onload = function() {
	var core = new Core(320, 320);
	core.fps = 30;

	core.onload = function() {
		var i = 0;
		var scene = core.rootScene;
		scene.backgroundColor = "black";
		var sprite = new Sprite(core.width, core.height);
		var surface = new Surface(core.width, core.height);

		var Hibana = Class.create(Sprite, {
			initialize: function(x, y, vx, vy) {
				Sprite.call(this, core.width, core.height);
				surface.clear();
				this.x = x;
				this.y = y;
				
				surface.context.beginPath();
				surface.context.fillStyle = "#f5f";
				surface.context.arc(this.x, this.y, 3, 0, Math.PI*2);
				surface.context.fill();
				this.image = surface;
				
				this.tl.moveBy(vx, vy, 30)
					.fadeOut(10);
				
				scene.addChild(this);
			}
		});
		
		var Hanabi = Class.create({
			initialize: function(x, y){
				new Hibana(x, y, rand(50), rand(50));
				new Hibana(x, y, -rand(50), rand(50));
				new Hibana(x, y, rand(50), -rand(50));
				new Hibana(x, y, -rand(50), -rand(50));
			}
		});

		core.rootScene.on('touchstart', function(e) {
			var hanabi = [];
			for(var i = 0; i < 10; i++){
				hanabi[i] = new Hanabi(e.x, e.y);
			}
		});
	};
	core.start();
};

//ランダムの整数生成
function rand(n) {
	return Math.floor(Math.random() * (n+1));
}