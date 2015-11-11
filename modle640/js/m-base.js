;(function(win) {
  function setOtherSize() {
    var cWidth = docEl.clientWidth, str = "}";

    !navigator.userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i) && cWidth > 1024 &&
    (cWidth = 640, str = ";max-width:" + cWidth + "px;margin-right:auto!important;margin-left:auto!important;}");
    win.rem = cWidth / 32;
    /ZTE U930_TD/.test(navigator.userAgent) && (win.rem = 1.13 * win.rem);
    fontEl.innerHTML = "html{font-size:" + win.rem/16*100*2 + "%!important;}body{font-size:" + 12 * (cWidth / 320) + "px" + str;
  }

  var dpr, scale, timer;

  docEl = document.documentElement;
  metaEl = document.querySelector('meta[name="viewport"]');
  fontEl = document.createElement("style");
  dpr = win.devicePixelRatio || 1;

  if (scale = 1 / dpr, !metaEl) {
    return void console.warn('\u8bf7\u8bbe\u7f6e\u9ed8\u8ba4viewport\u4e3a\uff1a<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no" />');
  }

  if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
    var cWidth = docEl.clientWidth;

    375 === cWidth && metaEl.setAttribute("content", "user-scalable=no");
    metaEl.setAttribute("content", "width=" + dpr * cWidth + ",initial-scale=" + scale + ",maximum-scale=" + scale + ", minimum-scale=" + scale + ",user-scalable=no");
  } else {
    var browserVer = navigator.userAgent.match(/Android[\S\s]+AppleWebkit\/?(\d{3})/i);
    !browserVer || browserVer && browserVer[1] > 534 ? metaEl.setAttribute("content", "width=device-width,user-scalable=no,initial-scale=" + scale + ",maximum-scale=" + scale + ", minimum-scale=" + scale) : dpr = 1;

  }

  docEl.firstElementChild.appendChild(fontEl);
  docEl.setAttribute("data-dpr", dpr);
  win.dpr = dpr;

  win.addEventListener("resize", function() {
    clearTimeout(timer);
    timer = setTimeout(setOtherSize, 300);
  }, false);

  win.addEventListener("pageshow", function(e) {
    if (e.persisted) {
      clearTimeout(timer);
      timer = setTimeout(setOtherSize, 300);
    }
  }, false);

  setOtherSize();

})(window);

