/**
 * Created by ddkan8 on 2015-11-05.
 */
window.onload = function(){
  (function(){

    function getId(id){
      return document.getElementById(id);
    }
    var oList = getId('list');
    var oInputtext = getId('inputtext');
    var oSubmit = getId('submit');
    var oFace = getId('face');
    var flag = true;
    var str = '';

    oFace.onclick = function(){
      if(flag){
        this.src = 'img-1/face2.png';
        flag = false;
      }else{
        this.src = 'img-1/face1.png';
        flag = true;
      }
    };
    oSubmit.onclick = function(){
      if(oInputtext.value == ''){
        alert('客官，说点什么吧！');
      }else{
        if(flag){
          str += '<p><img src="'+ oFace.src +'" alt=""/><span>'+ oInputtext.value +'</span></p>';
        }else{
          str += '<p class="even"><span>'+ oInputtext.value +'</span><img src="'+ oFace.src +'" alt=""/></p>';
        }
        oList.innerHTML = str;
        oInputtext.value = '';
      }
    };

  })();
};