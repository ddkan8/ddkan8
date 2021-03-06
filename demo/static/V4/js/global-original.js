!function(){"use strict";function t(e,o){function i(t,e){return function(){return t.apply(e,arguments)}}var r;if(o=o||{},this.trackingClick=!1,this.trackingClickStart=0,this.targetElement=null,this.touchStartX=0,this.touchStartY=0,this.lastTouchIdentifier=0,this.touchBoundary=o.touchBoundary||10,this.layer=e,this.tapDelay=o.tapDelay||200,this.tapTimeout=o.tapTimeout||700,!t.notNeeded(e)){for(var a=["onMouse","onClick","onTouchStart","onTouchMove","onTouchEnd","onTouchCancel"],c=this,s=0,u=a.length;u>s;s++)c[a[s]]=i(c[a[s]],c);n&&(e.addEventListener("mouseover",this.onMouse,!0),e.addEventListener("mousedown",this.onMouse,!0),e.addEventListener("mouseup",this.onMouse,!0)),e.addEventListener("click",this.onClick,!0),e.addEventListener("touchstart",this.onTouchStart,!1),e.addEventListener("touchmove",this.onTouchMove,!1),e.addEventListener("touchend",this.onTouchEnd,!1),e.addEventListener("touchcancel",this.onTouchCancel,!1),Event.prototype.stopImmediatePropagation||(e.removeEventListener=function(t,n,o){var i=Node.prototype.removeEventListener;"click"===t?i.call(e,t,n.hijacked||n,o):i.call(e,t,n,o)},e.addEventListener=function(t,n,o){var i=Node.prototype.addEventListener;"click"===t?i.call(e,t,n.hijacked||(n.hijacked=function(t){t.propagationStopped||n(t)}),o):i.call(e,t,n,o)}),"function"==typeof e.onclick&&(r=e.onclick,e.addEventListener("click",function(t){r(t)},!1),e.onclick=null)}}var e=navigator.userAgent.indexOf("Windows Phone")>=0,n=navigator.userAgent.indexOf("Android")>0&&!e,o=/iP(ad|hone|od)/.test(navigator.userAgent)&&!e,i=o&&/OS 4_\d(_\d)?/.test(navigator.userAgent),r=o&&/OS [6-7]_\d/.test(navigator.userAgent),a=navigator.userAgent.indexOf("BB10")>0;t.prototype.needsClick=function(t){switch(t.nodeName.toLowerCase()){case"button":case"select":case"textarea":if(t.disabled)return!0;break;case"input":if(o&&"file"===t.type||t.disabled)return!0;break;case"label":case"iframe":case"video":return!0}return/\bneedsclick\b/.test(t.className)},t.prototype.needsFocus=function(t){switch(t.nodeName.toLowerCase()){case"textarea":return!0;case"select":return!n;case"input":switch(t.type){case"button":case"checkbox":case"file":case"image":case"radio":case"submit":return!1}return!t.disabled&&!t.readOnly;default:return/\bneedsfocus\b/.test(t.className)}},t.prototype.sendClick=function(t,e){var n,o;document.activeElement&&document.activeElement!==t&&document.activeElement.blur(),o=e.changedTouches[0],n=document.createEvent("MouseEvents"),n.initMouseEvent(this.determineEventType(t),!0,!0,window,1,o.screenX,o.screenY,o.clientX,o.clientY,!1,!1,!1,!1,0,null),n.forwardedTouchEvent=!0,t.dispatchEvent(n)},t.prototype.determineEventType=function(t){return n&&"select"===t.tagName.toLowerCase()?"mousedown":"click"},t.prototype.focus=function(t){var e;o&&t.setSelectionRange&&0!==t.type.indexOf("date")&&"time"!==t.type&&"month"!==t.type?(e=t.value.length,t.setSelectionRange(e,e)):t.focus()},t.prototype.updateScrollParent=function(t){var e,n;if(e=t.fastClickScrollParent,!e||!e.contains(t)){n=t;do{if(n.scrollHeight>n.offsetHeight){e=n,t.fastClickScrollParent=n;break}n=n.parentElement}while(n)}e&&(e.fastClickLastScrollTop=e.scrollTop)},t.prototype.getTargetElementFromEventTarget=function(t){return t.nodeType===Node.TEXT_NODE?t.parentNode:t},t.prototype.onTouchStart=function(t){var e,n,r;if(t.targetTouches.length>1)return!0;if(e=this.getTargetElementFromEventTarget(t.target),n=t.targetTouches[0],o){if(r=window.getSelection(),r.rangeCount&&!r.isCollapsed)return!0;if(!i){if(n.identifier&&n.identifier===this.lastTouchIdentifier)return t.preventDefault(),!1;this.lastTouchIdentifier=n.identifier,this.updateScrollParent(e)}}return this.trackingClick=!0,this.trackingClickStart=t.timeStamp,this.targetElement=e,this.touchStartX=n.pageX,this.touchStartY=n.pageY,t.timeStamp-this.lastClickTime<this.tapDelay&&t.preventDefault(),!0},t.prototype.touchHasMoved=function(t){var e=t.changedTouches[0],n=this.touchBoundary;return Math.abs(e.pageX-this.touchStartX)>n||Math.abs(e.pageY-this.touchStartY)>n?!0:!1},t.prototype.onTouchMove=function(t){return this.trackingClick?((this.targetElement!==this.getTargetElementFromEventTarget(t.target)||this.touchHasMoved(t))&&(this.trackingClick=!1,this.targetElement=null),!0):!0},t.prototype.findControl=function(t){return void 0!==t.control?t.control:t.htmlFor?document.getElementById(t.htmlFor):t.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea")},t.prototype.onTouchEnd=function(t){var e,a,c,s,u,l=this.targetElement;if(!this.trackingClick)return!0;if(t.timeStamp-this.lastClickTime<this.tapDelay)return this.cancelNextClick=!0,!0;if(t.timeStamp-this.trackingClickStart>this.tapTimeout)return!0;if(this.cancelNextClick=!1,this.lastClickTime=t.timeStamp,a=this.trackingClickStart,this.trackingClick=!1,this.trackingClickStart=0,r&&(u=t.changedTouches[0],l=document.elementFromPoint(u.pageX-window.pageXOffset,u.pageY-window.pageYOffset)||l,l.fastClickScrollParent=this.targetElement.fastClickScrollParent),c=l.tagName.toLowerCase(),"label"===c){if(e=this.findControl(l)){if(this.focus(l),n)return!1;l=e}}else if(this.needsFocus(l))return t.timeStamp-a>100||o&&window.top!==window&&"input"===c?(this.targetElement=null,!1):(this.focus(l),this.sendClick(l,t),o&&"select"===c||(this.targetElement=null,t.preventDefault()),!1);return o&&!i&&(s=l.fastClickScrollParent,s&&s.fastClickLastScrollTop!==s.scrollTop)?!0:(this.needsClick(l)||(t.preventDefault(),this.sendClick(l,t)),!1)},t.prototype.onTouchCancel=function(){this.trackingClick=!1,this.targetElement=null},t.prototype.onMouse=function(t){return this.targetElement?t.forwardedTouchEvent?!0:t.cancelable&&(!this.needsClick(this.targetElement)||this.cancelNextClick)?(t.stopImmediatePropagation?t.stopImmediatePropagation():t.propagationStopped=!0,t.stopPropagation(),t.preventDefault(),!1):!0:!0},t.prototype.onClick=function(t){var e;return this.trackingClick?(this.targetElement=null,this.trackingClick=!1,!0):"submit"===t.target.type&&0===t.detail?!0:(e=this.onMouse(t),e||(this.targetElement=null),e)},t.prototype.destroy=function(){var t=this.layer;n&&(t.removeEventListener("mouseover",this.onMouse,!0),t.removeEventListener("mousedown",this.onMouse,!0),t.removeEventListener("mouseup",this.onMouse,!0)),t.removeEventListener("click",this.onClick,!0),t.removeEventListener("touchstart",this.onTouchStart,!1),t.removeEventListener("touchmove",this.onTouchMove,!1),t.removeEventListener("touchend",this.onTouchEnd,!1),t.removeEventListener("touchcancel",this.onTouchCancel,!1)},t.notNeeded=function(t){var e,o,i,r;if("undefined"==typeof window.ontouchstart)return!0;if(o=+(/Chrome\/([0-9]+)/.exec(navigator.userAgent)||[,0])[1]){if(!n)return!0;if(e=document.querySelector("meta[name=viewport]")){if(-1!==e.content.indexOf("user-scalable=no"))return!0;if(o>31&&document.documentElement.scrollWidth<=window.outerWidth)return!0}}if(a&&(i=navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/),i[1]>=10&&i[2]>=3&&(e=document.querySelector("meta[name=viewport]")))){if(-1!==e.content.indexOf("user-scalable=no"))return!0;if(document.documentElement.scrollWidth<=window.outerWidth)return!0}return"none"===t.style.msTouchAction||"manipulation"===t.style.touchAction?!0:(r=+(/Firefox\/([0-9]+)/.exec(navigator.userAgent)||[,0])[1],r>=27&&(e=document.querySelector("meta[name=viewport]"),e&&(-1!==e.content.indexOf("user-scalable=no")||document.documentElement.scrollWidth<=window.outerWidth))?!0:"none"===t.style.touchAction||"manipulation"===t.style.touchAction?!0:!1)},t.attach=function(e,n){return new t(e,n)},"function"==typeof define&&"object"==typeof define.amd&&define.amd?define(function(){return t}):"undefined"!=typeof module&&module.exports?(module.exports=t.attach,module.exports.FastClick=t):window.FastClick=t}();
if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function() {
    FastClick.attach(document.body);
  }, false);
}

//function OpenUrl(url) {
//window.location.href = url;
//}

$(function(){
/*  var moveed = false;
  $(document.body).on("touchstart", ".link", function (e) {
    var _this = this;
    moveed = false;
    setTimeout(function () {
      if (moveed == false) {
        removeLink.apply($(this), arguments);
        addLink.apply(_this, arguments);
        e.preventDefault();
      }
    }, 180);
    e.stopPropagation();
  });

  $(document.body).on("touchmove", ".link", function (e) {
    var _this = this;
    moveed = true;
    removeLink.apply(_this, arguments);
  });

  $(document.body).on("touchend", ".link", function (e) {
    var _this = this;
    removeLink.apply(_this, arguments);
    if (!moveed) {
      moveed = true;
      addLink.apply(_this, arguments);
      setTimeout(function () {
        removeLink.apply(_this, arguments);
      }, 200);
    }
    e.stopPropagation();
  });

  $(document.body).on("click", ".link", function (e) {
    e.stopPropagation();
    // link.apply($(this), arguments);
  });

  var addLink = function () {
    $(this).addClass("hover");
  };

  var removeLink = function () {
    $(this).removeClass("hover");
  };
  function LinkUp(){
    $(".link").removeClass("hover");
  }*/
//var link = function () {
//
//  var dom = $(this), href = dom.attr("href");
//
//  if (href != undefined && href != "" && href.indexOf("#") == -1) {
//    OpenUrl((href.substring(0, 1) == "/" || href.indexOf("http://") > -1 ? "" : "/") + href);
//  }
//
//};

//// 类型选择
//$(".nav-tabs li").click(function () {
//  $(".nav-tabs li").removeClass("active");
//  $(this).addClass("active");
//  var index = $(".nav-tabs li").index(this);
//  $(".tab-bd > div").hide();
//  $(".tab-bd > div").eq(index).show();
//});
//
//// 用户帮助
//$(".helpTab li").click(function () {
//  $(this).find("header").toggleClass("c2");
//  $(this).find(".helpdetail").slideToggle();
//  $("html,body").animate({ scrollTop: $(this).offset().top - $(this).height() }, 500);
//});

  // 书城首页TAB点击跳转
//$(document.body).on("click", ".nav-tabs-index li", function (e) {
//  e.stopPropagation();
//  // link.apply($(this), arguments);
//});
  var timer, $el;
  var events = 'ontouchstart' in window ? ['touchstart', 'touchmove touchend touchcancel'] : ['mousedown', 'mousemove mouseup'];
  
  // support for IE touch events
  if (window.navigator.pointerEnabled) {
    events = ['pointerdown', 'pointermove pointerup pointercancel lostpointercapture'];
  } else if (window.navigator.msPointerEnabled) {
    events = ['MSPointerDown', 'MSPointerMove MSPointerUp MSPointerCancel MSLostPointerCapture'];
  }
  
  var start = function(ev) {
    if (timer) { return; }
  
    $el = jQuery(this);
    timer = window.setTimeout(function() {
      $el.addClass('hover');
    }, 50);
    ev.stopPropagation();
  };
  
  var stop = function(ev) {
    if (!timer) { return; }
  
    window.clearTimeout(timer);
    timer = null;
  
    $el = jQuery(this);
    setTimeout(function() {
      $el.removeClass('hover');
    }, 10);
    ev.stopPropagation();
  };
  
//$('body').on(events[0], '.link', start);
//$('body').on(events[1], '.link', stop);
  $(document.body).delegate(".link", events[0], start);
  $(document.body).delegate(".link", events[1], stop);
  // 书城首页-书单类型选择
  var clb;
  $("#Moneys div").click(function () {
    clb = $(this).text();
    $("#Moneys div").removeClass("active");
    $(this).addClass("active");
    $('#divScreen,#alertbg').hide();
    $("#rankItem").text(clb);
  });
  // div筛选操作
  $("#btnAll").click(function () {
    $("#Moneys div").removeClass("active"); 
    clb = "";
    $("#rankItem").text("全部书单");
    $('#divScreen,#alertbg').hide();
  });
  $("#rankItem").click(function () {
    $('#divScreen,#alertbg').show();
  });
  $("#alertbg").click(function () {
    $('#divScreen,#alertbg').hide();
  });
  
  // 搜索页
  $("#keyword").focus(function () {
    $(this).parent().addClass('focus');
    //$('#searchCategory').show();
  });
  $("#keyword").blur(function () {
    $(this).parent().removeClass('focus');
    //$('#searchCategory').hide();
  });
  $("#comment-input").focus(function () {
    $(this).parent().siblings('.input-bg').addClass('focus');
  });
  $("#comment-input").blur(function () {
    $(this).parent().siblings('.input-bg').removeClass('focus');
  });
  
  // 评论点赞
  $(document.body).on("click", ".praise", function (e) {
    e.stopPropagation();
    $(this).addClass('praise_on')
  });
  
  // 书单列表页点击头部收藏
//$(".shudan-api .fav").click(function () {
//  $(this).children('em').toggleClass('collected'); 
//});
  
  // 快速充值-支付方式和金额
//$("#PayWay li").click(function () {
//  $(this).siblings().removeClass('act');
//  $(this).addClass('act');
//});
//
//$("#payMoney li:not('.moreMoney')").click(function () {
//  $(this).siblings().removeClass('active');
//  $(this).addClass('active');
//});
//
//$("#payMoney li.moreMoney").click(function () {
//  $("#payMoney li.hide").removeClass('hide');
//  $(this).hide();
//});
  
});