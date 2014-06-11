enchant();

//--------------------画像情報-----------------------------
const BTN_FRONT_IMG = "img/cardFront.png";  // ボタン表画像
const BTN_BACK_IMG = "img/cardBack.png";    // ボタン裏画像
const BACKGROUND_IMG  = "img/mainBack.png"; // 背景画像

//--------------------定数-----------------------------
const CORE_WIDTH = 640;   // 画面横サイズ
const CORE_HEIGHT = 480;  // 画面縦サイズ
const BTN_WIDTH   = 100;  // ボタン画像横サイズ
const BTN_HEIGHT  = 100;  // ボタン画像縦サイズ
const BTN_COL    = 4;     // 横に配置する数
const BTN_ROW    = 3;     // 縦に配置する数

//--------------------ステージ情報-----------------------------
var btnList;                                                   //画面のボタンのリスト
var btnvalue = new Array(1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6)   //画面のボタンID
var firstClickFlg = true;                                      //音一致判定用フラグ1
var firstClickBtn;                                             //音一致判定用フラグ2
var firstBtnId = 0;                                            //音一致判定用フラグ3
btnvalue = arrayShuffle(btnvalue);

window.onload = function(){
  core = new Core(CORE_WIDTH, CORE_HEIGHT);
  core.fps = 15;
  core.preload(BTN_FRONT_IMG, BTN_BACK_IMG, BACKGROUND_IMG);

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

      //配列作成
      btnList = new Array();
      for(var y = 0; y < BTN_ROW; y++){
          for(var x = 0; x < BTN_COL; x++){
              createButton(this, x, y);
          }
      }
      

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
  //音一致判定
   console.log("ボタンが押されました。 id=" + btnId);
      if (firstClickFlg == true) {
          firstClickBtn = btn;
          firstBtnId = btnId;
          btn.image = core.assets[BTN_FRONT_IMG];
          
      }else{
         
          btn.image = core.assets[BTN_FRONT_IMG];
      }
  });
  btn.addEventListener(Event.TOUCH_END, function(e) {
      if (firstClickFlg == true) {
          firstClickFlg = false;
      }else if (firstBtnId == btnId){
          alert("判定");
          firstClickFlg = true;
      }else{
          btn.image = core.assets[BTN_FRONT_IMG]; 
          alert("判定");
          firstClickFlg = true;
          firstClickBtn.image = core.assets[BTN_BACK_IMG];
          btn.image = core.assets[BTN_BACK_IMG];
      }
  });
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