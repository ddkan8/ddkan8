function doMove(obj, attr, dir, target, endFn){

  dir = parseInt(getStyle(obj, attr)) < target ? dir : -dir;
  clearInterval(obj.timer);

  obj.timer = setInterval(function(){

    var speed = parseInt(getStyle(obj, attr)) + dir;
    if(speed > target && dir > 0 || speed < target && dir < 0){
      speed = target;
    }
    obj.style[attr] = speed + 'px';
    if(speed == target){
      clearInterval(obj.timer);
      endFn && endFn();
    }

  }, 30);

}

function shake(obj, attr, endFn){
  if(obj.shaked){return};
  obj.shaked = true;

  var arr = [],
    iNum = 0
    pos = parseInt(getStyle(obj, attr));

  for(var i=20; i>0; i-=2){
    arr.push(i, -i);
  }
  arr.push(0);

  clearInterval(obj.shake);
  obj.onmousemove = function(){
    clearInterval(obj.shake);
    obj.shake = setInterval(function(){
      obj.style[attr] = pos + arr[iNum] + 'px';
      iNum++;
      if(iNum == arr.length){
        clearInterval(obj.shake);
        endFn && endFn();
        obj.shaked = false;
        iNum = 0;
      }
    }, 50);

  };

}

function getStyle(obj, attr){

  return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj)[attr];

}