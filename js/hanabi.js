enchant();

//ゲーム画面
GameEndingScene = enchant.Class.create(enchant.Scene, {
  initialize: function () {
      Scene.call(this);
      
      var scene = this;
      // 背景色の変更
      scene.backgroundColor = "black";
      
      /* タイトルの生成 */
      var title = new Label('おめでとう');
      title.x = 100;
      title.y = 200;
      title.color = 'white';
      title.font = 'bold 24px メイリオ';
      this.addChild(title);
      
      /* サブタイトルラベル設定 */
      var subTitle = new Label('～画面をタップすると花火があがるよ！！～'); 
      subTitle.x = 225;
      subTitle.y = 205;
      subTitle.color = 'white';
      subTitle.font = '16px メイリオ';
      subTitle.width = 320;
      this.addChild(subTitle)
      
      /* リトライラベル設定 */
      var lblRetry = new Label('もう一度？'); 
      lblRetry.color = 'white';
      lblRetry.font = 'bold 24px メイリオ';
      /* ラベルを中央に配置 */
      lblRetry.moveTo((core.width - lblRetry._boundWidth) / 2, 280);
      lblRetry.addEventListener('touchstart', function() {
        /* 確認メッセージ表示 */
        var confirmScene = new ConfirmScene('もう一度あそぶ？', 'はい', 'いいえ');
        /* 「はい」ボタン押下時の処理 */
        confirmScene.onaccept = function() {
            scene.backgroundColor = "white";
            /* ゲーム画面を再起動する */
            var startScene = new GameStartScene();
            core.forwardScene(startScene);
        };
        confirmScene.oncancel = function() {
            /* 花火画面を再起動する */
            var endingScene = new GameEndingScene();
            core.forwardScene(endingScene);
        };
        core.pushScene(confirmScene);
      });
      this.addChild(lblRetry)

      var touchCount = 0;
      var hanabiCount = 0;
      var group = new Group();
      var hanabiC = [["#F80", "#FC0", "#FF0"],
                     ["#0F8", "#0FC", "#0FF"],
                     ["#F08", "#F0C", "#F0F"]];
      var hanabiID = [];
      
      //Surface作成
      for(var i = 0; i < 3; i++) {
          hanabiID[i] = [];
          for(var j = 0; j < 3; j++) {
              var surface = new Surface(10, 10);
              surface.context.beginPath();
              var grap = surface.context.createRadialGradient(2, 2, 1, 3, 3, 3);
              grap.addColorStop(0, "#FFF");
              grap.addColorStop(1, hanabiC[i][j]);
              surface.context.fillStyle = grap;
              surface.context.arc(3, 3, 3, 0, Math.PI*2);
              surface.context.fill();
              hanabiID[i][j] = surface;
          }
      }
      
      //花火のクラス作成
      var Hanabi = Class.create(Sprite, {
          initialize: function(x, y, vx, vy, id1, id2) {
              Sprite.call(this, 10, 10);
              this.x = x;    //初期表示位置X
              this.y = y;    //初期表示位置Y

              //塗りつぶし円
              this.image = hanabiID[id1][id2];

              //動き
              this.tl.moveBy(vx, vy, 25).and().scaleBy(0.5, 25)
                  .fadeOut(5)
                  .then(function() {
                      scene.removeChild(this);
                      hanabiCount--;
                  });
              
              
              //sceneに追加
              scene.addChild(this);
          }
      });

      //爆破
      function Bom(x, y, id1) {
          //花火っぽく整形
          for(var i = 0; i < 30; i++) {
              new Hanabi(x, y, (sin(i*12) * 50), (cos(i*12) * 50), id1, 0);
              if(i>=10) { 
                  new Hanabi(x, y, (sin(i*18) * 40), (cos(i*18) * 40), id1, 1);
              }
              if(i>=15) { 
                  new Hanabi(x, y, (sin(i*24) * 30), (cos(i*24) * 30), id1, 1);
              }
              if(i>=20) { 
                  new Hanabi(x, y, (sin(i*36) * 20), (cos(i*36) * 20), id1, 2);
              }
          }
      };

      //画面クリックで花火っぽいものを生成
      scene.on('touchstart', function(e) {
          //５個(Sprite７５個で花火１個分)以上表示しない
          if(hanabiCount!==0 && hanabiCount % 375 === 0) return;
          hanabiCount += 75;
          //音
          var sound = core.assets['audio/hanabi.mp3'].clone();
          sound.play();
          //色渡し
          switch(touchCount) {
              case 0:
                  Bom(e.x, e.y, touchCount);
                  touchCount++;
                  break;
              case 1:
                  Bom(e.x, e.y, touchCount);
                  touchCount++;
                  break;
              case 2:
                  Bom(e.x, e.y, touchCount);
                  touchCount = 0;
                  break;
          };
      });
  }
});

//ランダムの整数生成
function rand(n) {
    return Math.floor(Math.random() * (n+1));
};
//Sin()生成
function sin(n) {
    return Math.sin(n * (Math.PI / 180));
};
//Cos()生成
function cos(n) {
    return Math.cos(n * (Math.PI / 180));
};