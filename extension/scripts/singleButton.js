
var horizontalmovement = "down"; // up
var verticalmovement = "right"; // left, right
var state = "none";  // verticalscan, horizontalscan, none
var interval = null;

$(document).ready(function() {
  $("#thebutton").click(function() {
  	alert("I was clicked sdasld!");
  })

  $("body").append("<input type='button' class='scrolldown' value='down'>");
  $(".scrolldown").click(function() {
    $('html, body').animate({
        scrollTop: $(document).scrollTop()+150
    }, 1000);
  })


  $(document).keydown(function(e) {
  	if(e.key=="b") {
      clearInterval(interval);

      if(state=="none") {

        state = "verticalscan";
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