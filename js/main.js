enchant();

//--------------------画像情報-----------------------------
const BTN_FRONT_IMG = "img/cardFront.png";  // ボタン表画像
const BTN_BACK_IMG = "img/cardBack.png";    // ボタン裏画像
const BACKGROUND_IMG  = "img/mainBack.png"; // 背景画像
const BEAR_IMG = "img/bear.png";        // クマ画像

//--------------------定数-----------------------------
const CORE_WIDTH = 640;   // 画面横サイズ
const CORE_HEIGHT = 480;  // 画面縦サイズ
const BTN_WIDTH   = 100;  // ボタン画像横サイズ
const BTN_HEIGHT  = 100;  // ボタン画像縦サイズ
const BEAR_WIDTH = 32;
const BEAR_HEIGHT = 32;

const BTN_COL    = 4;     // 横に配置する数
const BTN_ROW    = 3;     // 縦に配置する数

//--------------------ステージ情報-----------------------------
var btnList;                                                   //画面のボタンのリスト
var btnvalue = new Array(1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6)   //画面のボタンID
btnvalue = arrayShuffle(btnvalue);
var btnSound = null;

window.onload = function(){
  core = new Core(CORE_WIDTH, CORE_HEIGHT);
  core.fps = 15;
  core.preload(BTN_FRONT_IMG, BTN_BACK_IMG, BACKGROUND_IMG, BEAR_IMG, "audio/sound1.mp3", "audio/sound2.mp3", "audio/sound3.mp3", "audio/sound4.mp3", "audio/sound5.mp3", "audio/sound6.mp3");

  core.onload = function(){
      var startScene = new GameStartScene();
      core.pushScene(startScene);
  }
    core.start();
};

//ゲーム画面
GameStartScene = enchant.Class.create(enchant.Scene, {
  initialize: function () {
      Scene.call(this);

      //背景の生成
      var backGround = new Sprite(CORE_WIDTH, CORE_HEIGHT);
      backGround.image = core.assets[BACKGROUND_IMG];
      this.addChild(backGround);
      
      //タイトルの生成
      var title = new Label('音合わせ');
      title.x = 10;
      title.y = 5;
      title.font = "bold 20px メイリオ";
      this.addChild(title);
      // サブタイトルラベル設定
      var subTitle = new Label('～音で合わせる神経衰弱～'); 
      subTitle.x = 100;
      subTitle.y = 10;
      subTitle.font = '16px メイリオ';
      this.addChild(subTitle)

      //ボタンを生成して並べる
      btnList = new Array();
      for(var y = 0; y < BTN_ROW; y++){
          for(var x = 0; x < BTN_COL; x++){
              createButton(this, x, y);
          }
      }

      //クマを生成
      var bear = new Sprite(BEAR_WIDTH, BEAR_HEIGHT);
      bear.image = core.assets['img/bear.png'];
      bear.x = 0;
      bear.y = CORE_HEIGHT - BEAR_HEIGHT;
      bear.frame = 1;
      var direct = "right";

      bear.addEventListener('enterframe', function() {
          /* Bearの移動先のX座標を取得 */
          this.x = getMoveBearX(this.x, direct);
          
          /* 条件に応じてFrameを変更 */
          if(core.frame % 4 == 0){
              if(direct == "right") {
                  this.frame = core.frame % 3;
              } else if(direct == "left"){
                  this.frame = core.frame % 3 + 15;
              }
          }
          
          /* Bearの進む方向を変更 */
          if (this.x > CORE_WIDTH - BEAR_WIDTH) {
              this.x = CORE_WIDTH - BEAR_WIDTH;
              this.frame = 16;
              direct = "left";
          } else if(this.x < 0){
              this.x = 0;
              this.frame = 1;
              direct = "right";
          }
      });
      this.addChild(bear);
  }
});


//ボタン作成
function createButton(stage, x ,y){
  var btn = new Sprite(BTN_WIDTH,BTN_HEIGHT);   // ボタン画像サイズ指定
  btn.image = core.assets[BTN_BACK_IMG];            // ボタン画像設定
  var btnId = btnvalue[y * 4 + x];
  btn.x     = (BTN_WIDTH * x) + (45 * (x + 1));
  btn.y     = (BTN_HEIGHT * y) + (48 * (y + 1));
  stage.addChild(btn);
  btnList[x + y * BTN_COL] = btn;
  btn.addEventListener(Event.TOUCH_START, function(e) {
    if( btnSound ) {
		btnSound.stop();
	}
	btnSound = core.assets["audio/sound" + btnId + ".mp3"].clone();	//音声ファイルを設定
	btnSound.play();
  });
}

/**
 *  Bearを移動させるX座標を返却します
 *  引数 x      : 現在のX座標
 *       direct : Bearの向き(right/left)
 *  戻り値 retX : 移動後のX座標
 */
function getMoveBearX(x, direct){
    var retX = 0;
    if(direct == "right"){
       retX = x + 5;
    } else if(direct == "left"){
       retX = x - 5;
    }
    return retX;
}

//配列シャッフル
function arrayShuffle(list) {
    var d, c
    var b = list.length;
    
    while(b) {
        c = Math.floor(Math.random() * b);
        d = list[--b];
        list[b] = list[c];
        list[c] = d;
    }
    return list;
}