
var horizontalmovement = "down"; // up
var verticalmovement = "right"; // left, right
var state = "none";  // verticalscan, horizontalscan, none
var interval = null;

$(document).ready(function() {
  $("#thebutton").click(function() {
  	/*alert("I was clicked sdasld!");*/
    $("body").append(htmlKeyboard);
  })

  $("body").append("<input type='button' class='scrolldown' value='down'>");
  $(".scrolldown").click(function() {
    $('html, body').animate({
        scrollTop: $(document).scrollTop()+150
    }, 1000);
  })

  $("body").append("<input type='button' class='scrollup' value='up'>");
  $(".scrollup").click(function() {
    $('html, body').animate({
        scrollTop: $(document).scrollTop()-150
    }, 1000);
  })

  $("body").append("<input type='button' class='scrollright' value='right'>");
  $(".scrollright").click(function() {
    $('html, body').animate({
        scrollLeft: $(document).scrollLeft()+150
    }, 1000);
  })

  $("body").append("<input type='button' class='scrollleft' value='left'>");
  $(".scrollleft").click(function() {
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
    	  	var y = offset.top;

    	  	if(horizontalmovement=="down") {
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
    	  }, 100);
  	  } else if(state=="verticalscan") {

        state = "horizontalscan";
        $("#vertical-scanbar").css("left", 0+"px");
        $("#vertical-scanbar").show();

        // Setting up the vertical scan
        interval = setInterval(function() {
          var offset = $("#vertical-scanbar").offset();
          var x = offset.left;

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
        }, 100);
      } 
      else if(state=="horizontalscan") {

        state = "none";
        var offset = $("#vertical-scanbar").offset();
        var x = offset.left + $("#vertical-scanbar").width()/2.0;

        var offset = $("#horizontal-scanbar").offset();
        var y = offset.top + $("#horizontal-scanbar").height()/2.0;


        $("body").append("<div class='click'></div>");

        $(".click").css("left", x+"px");
        $(".click").css("top", y+"px");

        $(".click").animate({
          width: "+=25",
          height: "+=25",
          left: "-=12.5",
          top: "-=12.5",
          "border-radius": "+=12"
        }, 800, function() {
          $(".click").hide();
          var elementtoclick = document.elementFromPoint(x, y);
          simulateClick(elementtoclick);
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

var htmlKeyboard = "<div class='keyboard'>\
<div class='logo'>hp</div>\
<div class='lights'>\
<span>1</span>\
<span>A</span>\
<span>V</span>\
</div>\
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
</div>"
    <!--END FUNCTION KEYS -->
    
  /*<div class="key num dual">
    ~<br>`
  </div>
    
  <div class="key num dual">
    !<br>1
  </div>
  <div class="key num dual">
    @<br>2
  </div>
  <div class="key num dual">
    #<br>3
  </div>
  <div class="key num dual">
    $<br>4
  </div>
  <div class="key num dual">
    %<br>5
  </div>
  <div class="key num dual">
    ^<br>6
  </div>
  <div class="key num dual">
    &<br>7
  </div>
  <div class="key num dual">
    *<br>8
  </div>
  <div class="key num dual">
    (<br>9
  </div>
  <div class="key num dual">
    )<br>0
  </div>
  <div class="key num dual">
    _<br>-
  </div>
  <div class="key num dual">
    +<br>=
  </div>
  <div class="key backspace">
      Backspace
  </div>
   <!--END NUMBER KEYS -->
    
  <div class="key tab">
    Tab
  </div>
  
  <div class="key letter">
    Q
  </div>
    <div class="key letter">
    W
  </div>
    <div class="key letter">
    E
  </div>
    <div class="key letter">
    R
  </div>
    <div class="key letter">
    T
  </div>
    <div class="key letter">
    Y
  </div>
    <div class="key letter">
    U
  </div>
    <div class="key letter">
    I
  </div>
    <div class="key letter">
    O
  </div>
    <div class="key letter">
    P
  </div>
    <div class="key dual">
    {<Br>[
  </div>
    <div class="key dual">
    }<br>]
  </div>
    <div class="key letter dual slash">
    |<br>\
  </div>
  <div class="key caps">
    Caps<br>Lock
    </div>
  <div class="key letter">
    A
  </div>
    <div class="key letter">
    S
  </div>
    <div class="key letter">
    D
  </div>
    <div class="key letter">
    F
  </div>
    <div class="key letter">
    G
  </div>
    <div class="key letter">
    H
  </div>
    <div class="key letter">
    J
  </div>
    <div class="key letter">
    K
  </div>
    <div class="key letter">
    L
  </div>
    <div class="key dual">
    :<br>;
  </div>
    <div class="key dual">
    "<br>'
  </div>
    <div class="key enter">
    Enter
  </div>
    
  <div class="key shift left">
    Shift
  </div>
  <div class="key letter">
    Z
  </div>  
    <div class="key letter">
    X
  </div>
    <div class="key letter">
    C
  </div>
    <div class="key letter">
    V
  </div><div class="key letter">
    B
  </div><div class="key letter">
    N
  </div><div class="key letter">
    M
  </div>
    <div class="key dual">
    < <br>,
  </div>
    <div class="key dual">
    ><br>.
  </div>
    <div class="key dual">
    ?<br>/
  </div>
    <div class="key shift right">
    Shift
  </div>
  <div class="key ctrl">
    Ctrl
  </div>
    <div class="key">
    &hearts;
  </div>
    <div class="key">
    Alt
  </div>
    <div class="key space">
    
  
 
    </div>
    <div class="key">
    Alt
  </div>
    <div class="key">
    &hearts;
  </div>
    <div class="key">
    Prnt
  </div>
    <div class="key ctrl">
    Ctrl
  </div>
  </div><!-- end section-a-->
  
  <div class="section-b">
    <div class="key function small">
      Prnt Scrn
    </div>
    <div class="key function small">
      Scroll Lock
    </div>
    <div class="key function small">
      Pause Break
    </div>
    
    <dic class="sec-func">
    <div class="key">
      Insert
    </div>
    <div class="key">
      Home
    </div>
    <div class="key dual">
      Page Up
    </div>
    <div class="key">
      Del
    </div>
    <div class="key">
      End
    </div>
      <div class="key dual">
      Page Down
    </div>
      
      <div class="arrows">
    <div class="key hidden">
      
    </div>
    <div class="key">
      ^
    </div>
    <div class="key hidden">
      
    </div>
    <div class="key">
      <
    </div>
    <div class="key">
      v
    </div>
      <div class="key">
      >
    </div>
      </div><!-- end arrows -->
    </div><!-- end sec-func -->
    
    
  </div><!-- end section-b-->
  
</div>*/