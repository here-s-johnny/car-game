$(function() {

  var ctx = $('#canvas')[0].getContext("2d");
  

  x_a = 50;
  y_a = 50;
  rot = 0;
  v = 0;
  acc = 0;
  acc_const = 0.025;
  decc_const = 1.01;
  drawCar(ctx, x_a, y_a, 20, 10, rot);
  var pressed = [0,0,0,0];

  $(window).keydown(function(event){
    if(event.keyCode == 37) {
      event.preventDefault();
      pressed[0] = 1;   // left
    }
    if(event.keyCode == 39) {
      event.preventDefault();
      pressed[3] = 1;   // right
    }
    if(event.keyCode == 38) {
      event.preventDefault();
      pressed[2] = 1;   // up
    }
    if(event.keyCode == 40) {
      event.preventDefault();
      pressed[1] = 1;   // down
    }
  });

  $(window).keyup(function(event){
    if(event.keyCode == 37) {
      event.preventDefault();
      pressed[0] = 0;   // left
    }
    if(event.keyCode == 39) {
      event.preventDefault();
      pressed[3] = 0;   // right
    }
    if(event.keyCode == 38) {
      event.preventDefault();
      pressed[2] = 0;   // up
    }
    if(event.keyCode == 40) {
      event.preventDefault();
      pressed[1] = 0;   // down
    }
  });

  function resolve() { 
    if ( pressed[2] == 1 && pressed[1] == 0 ) {
      acc = acc_const;
      v = v + acc;
    } else if  ( (pressed[2] == 1 && pressed[1] == 1) || (pressed[2] == 0 && pressed[1] == 0) ) {
      acc = 0; // nic się nie dzieje - samochód sam zwalnia
      v = v/decc_const;
    } else if  ( pressed[2] == 0 && pressed[1] == 1 ) {
      acc = -2*acc_const;
      v = v + acc;
    }
    if ( pressed[0] == 1 && pressed[3] == 0 ) {
      rot = rot - 2*Math.PI/170;
    } else if ( pressed[0] == 0 && pressed[3] == 1 ) {
      rot = rot + 2*Math.PI/170;
    } 

    y_a = y_a + v*Math.sin(rot);
    x_a = x_a + v*Math.cos(rot);
    clearCanvas(ctx);
    drawCar(ctx, x_a, y_a, 20, 10, rot);
    $('#canvas')[0].height/2
    frame(ctx, $('#canvas')[0].width/2, $('#canvas')[0].height/2,
        $('#canvas')[0].width, $('#canvas')[0].height);
  };

  var timer = setInterval(  function(){ resolve()} , 10) ;
});
