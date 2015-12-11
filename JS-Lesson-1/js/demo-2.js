window.onload = function(){
  (function(){

    function getId(id){
      return document.getElementById(id);
    }

    var oBtn1 = getId('btn1');
    var oBtn2 = getId('btn2');
    var oText1 = getId('text1');
    var oPagenum = getId('pagenum');
    var oText2 = getId('text2');
    var oPic = getId('pic');
    var oPrev = getId('prev');
    var oNext = getId('next');
    var arrImg = ['img-2/1.jpg', 'img-2/2.jpg', 'img-2/3.jpg', 'img-2/4.jpg'];
    var arrText = ['文字说明1', '文字说明2', '文字说明3', '文字说明4'];
    var iNum = 0;
    var flag = 1;

    oBtn1.onclick = function(){
      oText1.innerHTML = '图片可以最后一张跳转到最后一张进行切换';
      flag = 1;
    };
    oBtn2.onclick = function(){
      oText1.innerHTML = '图片只能到最后一张或只能到第一张切换';
      flag = 0;
    };

    function fnTab(){
      oPagenum.innerHTML = 1 + iNum + ' / ' + arrText.length;
      oText2.innerHTML = arrText[iNum];
      oPic.src = arrImg[iNum];
    }
    fnTab();

    oPrev.onclick = function(){
      iNum--;
      if(iNum < 0 && flag){
        iNum = arrText.length-1;
      }else if(iNum < 0 && !flag){
        iNum = 0;
        alert('这已经是第一张了，不能再往前了！');
      }

      fnTab();
      return false;
    };

    oNext.onclick = function(){
      iNum++;
      if(iNum > arrText.length-1 && flag){
        iNum = 0;
      }else if(iNum > arrText.length-1 && !flag){
        iNum = arrText.length-1;
        alert('已经到最后一张啦！');
      }

      fnTab();
      return false;
    };

  })();
};