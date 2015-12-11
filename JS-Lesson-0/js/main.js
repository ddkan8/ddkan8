window.onload = function(){
  (function(){

    function getId(id){
      return document.getElementById(id);
    }

    var oSet = getId('set');
    var oMask = getId('mask');
    var oBox = getId('box')

    var oBgRed = getId('bgRed');
    var oBgYellow = getId('bgYellow');
    var oBgBlue = getId('bgBlue');
    var oW200 = getId('w200');
    var oW300 = getId('w300');
    var oW400 = getId('w400');
    var oH200 = getId('h200');
    var oH300 = getId('h300');
    var oH400 = getId('h400');
    var oReset = getId('reset');
    var oSubmit = getId('submit');

    oSet.onclick = function(){
      oMask.style.display = 'block';
    };

    function setBgColor(c){
      oBox.style.backgroundColor = c;
    }

    function setWidth(w){
      oBox.style.width = w + 'px';
    }

    function setHeight(h){
      oBox.style.height = h + 'px';
    }

    oBgRed.onclick = function(){
      setBgColor('#f00');
    };
    oBgYellow.onclick = function(){
      setBgColor('#ff0');
    };
    oBgBlue.onclick = function(){
      setBgColor('#00f');
    };

    oW200.onclick = function(){
      setWidth(200);
    };
    oW300.onclick = function(){
      setWidth(300);
    };
    oW400.onclick = function(){
      setWidth(400);
    };

    oH200.onclick = function(){
      setHeight(200);
    };
    oH300.onclick = function(){
      setHeight(300);
    };
    oH400.onclick = function(){
      setHeight(400);
    };

    oReset.onclick = function(){
      setBgColor('#fff');
      setWidth(100);
      setHeight(100);
    };
    oSubmit.onclick = function(){
      oMask.style.display = 'none';
    };

  })();
};