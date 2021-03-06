
var horizontalmovement = "down"; // up
var verticalmovement = "right"; // left, right
var state = "none";  // verticalscan, horizontalscan, none
var interval = null;
var keyboard = "off" //on
var recentInputArea = null;
var caps = "off" //on
var cont = 0;
var topPage = 0;
var leftPage = 0;
var previousClass = null;

$(document).ready(function() {
  $("#thebutton").click(function() {
    if (keyboard == "off") {
      keyboard = "on"
      $("body").append(htmlKeyboard);
    }
    else {
      keyboard = "off"
      htmlKeyboard.remove();
    }
  })

  $("body").append("<input type='button' class='scrolldown' value='down'>");
  $(".scrolldown").click(function() {
    topPage += 150;
    $('html, body').animate({
        scrollTop: $(document).scrollTop()+150
    }, 1000);
  })

  $("body").append("<input type='button' class='scrollup' value='up'>");
  $(".scrollup").click(function() {
    topPage -= 150;
    $('html, body').animate({
        scrollTop: $(document).scrollTop()-150
    }, 1000);
  })

  $("body").append("<input type='button' class='scrollright' value='right'>");
  $(".scrollright").click(function() {
    leftPage += 150;
    $('html, body').animate({
        scrollLeft: $(document).scrollLeft()+150
    }, 1000);
  })

  $("body").append("<input type='button' class='scrollleft' value='left'>");
  $(".scrollleft").click(function() {
    leftPage -= 150;
    $('html, body').animate({
        scrollLeft: $(document).scrollLeft()-150
    }, 1000);
  })

  $(document).keydown(function(e) {
  	if(e.key=="b") {
      clearInterval(interval);

      if(state=="none") {

        state = "verticalscan";
        $("#horizontal-scanbar").css("top", 0+"px");
        $("#horizontal-scanbar").show();

        // Setting up the vertical scan
    	  interval = setInterval(function() {
    	  	var offset = $("#horizontal-scanbar").offset();
    	  	var y = offset.top - topPage;

    	  	if(horizontalmovement=="down") {
            console.log("somou 2")
    	  	  y = y+2;
    	    } else if(horizontalmovement=="up") {
    	      y = y-2; 
    	    }

    	  	if(y >= $(window).height()) {
    	  	  horizontalmovement = "up";
    	  	} else if(y <= 0) {
    	  	  horizontalmovement = "down";
    	  	}

    	  	console.log("new y is " + y + " " + $(window).height());

    	  	$("#horizontal-scanbar").css("top", y+"px");
    	  }, 20);
  	  } else if(state=="verticalscan") {
        state = "horizontalscan";
        $("#vertical-scanbar").css("left", 0+"px");
        $("#vertical-scanbar").show();

        // Setting up the vertical scan
        interval = setInterval(function() {
          var offset = $("#vertical-scanbar").offset();
          var x = offset.left - leftPage;

          if(verticalmovement=="right") {
            x = x+2;
          } else if(verticalmovement=="left") {
            x = x-2;
          }

          if(x >= $(window).width()) {
            verticalmovement = "left";
          } else if(x <= 0) {
            verticalmovement = "right";
          }

          console.log("new x is " + x + " " + $(window).width());

          $("#vertical-scanbar").css("left", x+"px");
        }, 20);
      } 
      else if(state=="horizontalscan") {
        state = "none";
        var offset = $("#vertical-scanbar").offset();
        var x = offset.left - leftPage + $("#vertical-scanbar").width()/2.0;

        var offset = $("#horizontal-scanbar").offset();
        var y = offset.top - topPage + $("#horizontal-scanbar").height()/2.0;


        $("body").append("<div class='click'></div>");

        $(".click").css("left", x+"px");
        $(".click").css("top", y+"px");

        cont = 0;

        $(".click").animate({
          width: "+=25",
          height: "+=25",
          left: "-=12.5",
          top: "-=12.5",
          "border-radius": "+=12"
        }, 800, function() {
          if (cont == 0) {
          $(".click").hide();
          var elementtoclick = document.elementFromPoint(x, y);
          simulateClick(elementtoclick);
          console.log(elementtoclick)

          if($(elementtoclick).is("input[type=\"text\"],textarea")) {
            recentInputArea = elementtoclick;
          }

          if($(elementtoclick).attr('class') == "key letter") {
            var letter = $.trim($(elementtoclick).text());
            letter = String(letter);
            if (caps == "off") { 
              letter = letter.toString().toLowerCase();
            }
            $(recentInputArea).val($(recentInputArea).val() + letter);
            previousClass = "key letter";
          }

          if($(elementtoclick).attr('class') == "key caps") {
            if (caps == "off") {
              caps = "on";
            }
            else {
              caps = "off";
            }
            previousClass = "key caps";
          }

          if($(elementtoclick).attr('class') == "key backspace") {
            var text = $(recentInputArea).val();
            if (text.length > 1) {
              text = text.slice(0, text.length - 1);
            }
            else {
              text = "";
            }
            $(recentInputArea).val(text);
            previousClass = "key backspace";
          }

          if($(elementtoclick).attr('class') == "key num dual") {
            var num_dial = $.trim($(elementtoclick).text());
            if(previousClass != "key shift left") {
              var num = num_dial.slice(1,2)
              $(recentInputArea).val($(recentInputArea).val() + num);
            }
            else {
              var dial = num_dial.slice(0,1);
              $(recentInputArea).val($(recentInputArea).val() + dial);
            }
            previousClass = "key num dual";
          }

          if ($(elementtoclick).attr('class') == "key shift left") {
            previousClass = "key shift left";
          }
        }
        cont +=1;

        });

        $("#horizontal-scanbar").hide();
        $("#vertical-scanbar").hide();
      }
  	}
  })
})

function simulateClick(element) {
  if (!element) return;
  var dispatchEvent = function (elt, name) {
    var clickEvent = document.createEvent('MouseEvents');
    clickEvent.initEvent(name, true, true);
    elt.dispatchEvent(clickEvent);
  };
  dispatchEvent(element, 'mouseover');
  dispatchEvent(element, 'mousedown');
  dispatchEvent(element, 'click');
  dispatchEvent(element, 'mouseup');
};

<!-- keyboard code from https://codepen.io/attilahajzer/pen/kydqJ -->
var htmlKeyboard = $("<div class='keyboard'>\
<div class='section-a'>\
<div class='key function space1'>Esc</div>\
<div class='key function'>F1</div>\
<div class='key function'>F2</div>\
<div class='key function'>F3</div>\
<div class='key function space2'>F4</div>\
<div class='key function'>F5</div>\
<div class='key function'>F6</div>\
<div class='key function'>F7</div>\
<div class='key function space2'>F8</div>\
<div class='key function'>F9</div>\
<div class='key function'>\
F10 \
</div> \
<div class='key function'>\
F11\
</div>\
<div class='key function'>\
F12\
</div>\
<div class='key num dual'>\
    ~<br>`\
  </div>\
  <div class='key num dual'>\
    !<br>1\
  </div>\
  <div class='key num dual'>\
    @<br>2\
  </div>\
  <div class='key num dual'>\
    #<br>3\
  </div>\
  <div class='key num dual'>\
    $<br>4\
  </div>\
  <div class='key num dual'>\
    %<br>5\
  </div>\
  <div class='key num dual'>\
    ^<br>6\
  </div>\
  <div class='key num dual'>\
    &<br>7\
  </div>\
  <div class='key num dual'>\
    *<br>8\
  </div>\
  <div class='key num dual'>\
    (<br>9\
  </div>\
  <div class='key num dual'>\
    )<br>0\
  </div>\
  <div class='key num dual'>\
    _<br>-\
  </div>\
  <div class='key num dual'>\
    +<br>=\
  </div>\
  <div class='key backspace'>\
      Backspace\
  </div>\
  <div class='key tab'>\
    Tab\
  </div>\
  <div class='key letter'>\
    Q\
  </div>\
    <div class='key letter'>\
    W\
  </div>\
    <div class='key letter'>\
    E\
  </div>\
    <div class='key letter'>\
    R\
  </div>\
    <div class='key letter'>\
    T\
  </div>\
    <div class='key letter'>\
    Y\
  </div>\
    <div class='key letter'>\
    U\
  </div>\
    <div class='key letter'>\
    I\
  </div>\
    <div class='key letter'>\
    O\
  </div>\
    <div class='key letter'>\
    P\
  </div>\
    <div class='key dual'>\
    {<Br>[\
  </div>\
    <div class='key dual'>\
    }<br>]\
  </div>\
    <div class='key letter dual slash'>\
    |<br>\
  </div>\
  <div class='key caps'>\
    Caps<br>Lock\
    </div>\
  <div class='key letter'>\
    A\
  </div>\
    <div class='key letter'>\
    S\
  </div>\
    <div class='key letter'>\
    D\
  </div>\
    <div class='key letter'>\
    F\
  </div>\
    <div class='key letter'>\
    G\
  </div>\
    <div class='key letter'>\
    H\
  </div>\
    <div class='key letter'>\
    J\
  </div>\
    <div class='key letter'>\
    K\
  </div>\
    <div class='key letter'>\
    L\
  </div>\
    <div class='key dual'>\
    :<br>;\
  </div>\
    <div class='key dual'>\
    '<br>'\
  </div>\
    <div class='key enter'>\
    Enter\
  </div>\
  <div class='key shift left'>\
    Shift\
  </div>\
  <div class='key letter'>\
    Z\
  </div>\
    <div class='key letter'>\
    X\
  </div>\
    <div class='key letter'>\
    C\
  </div>\
    <div class='key letter'>\
    V\
  </div><div class='key letter'>\
    B\
  </div><div class='key letter'>\
    N\
  </div><div class='key letter'>\
    M\
  </div>\
    <div class='key dual'>\
    < <br>,\
  </div>\
    <div class='key dual'>\
    ><br>.\
  </div>\
    <div class='key dual'>\
    ?<br>/\
  </div>\
    <div class='key shift right'>\
    Shift\
  </div>\
  <div class='key ctrl'>\
    Ctrl\
  </div>\
    <div class='key'>\
    &hearts;\
  </div>\
    <div class='key'>\
    Alt\
  </div>\
    <div class='key space'>\
    </div>\
    <div class='key'>\
    Alt\
  </div>\
    <div class='key'>\
    &hearts;\
  </div>\
    <div class='key'>\
    Prnt\
  </div>\
    <div class='key ctrl'>\
    Ctrl\
  </div>\
  </div>\
</div>");