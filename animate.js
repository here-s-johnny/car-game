$(function() {

  var ctx = $('#canvas')[0].getContext("2d");
  
  x_a = 50;
  y_a = 50;
  rot = 0;
  v = 0;
  acc = 0;
  acc_const = 0.021;
  decc_const = 1.01;
  back_speed = 1;
  handling = 120;
  braking_force = 4;
  drawCar(ctx, x_a, y_a, 20, 10, rot);
  var pressed = [0,0,0,0];
  carStatus = "halt";

  function resolve() { 
    getKeyboardInput(window, pressed);

    if ( pressed[2] == 1 && pressed[1] == 0 ) {
        acc = acc_const;  // accelerate
        v = v + acc;
      if (carStatus != "going" && v>0) { carStatus = "going" };
    } else if ( carStatus == "going"  && ( pressed[2] == 0 && pressed[1] == 1 ) ) {
        if (v>0) {          // brake
          a = -braking_force*acc_const;
          v = v + a;
        } else { v = 0; acc = 0; }
      if (v == 0) { carStatus = "justStopped" }
    } else if  ( carStatus == "justStopped"  &&  ( pressed[2] == 0 && pressed[1] == 0 ) ) {
      carStatus = "halt";
    } else if ( ( carStatus == "halt" || carStatus == "goingBack"  )  && ( pressed[2] == 0 && pressed[1] == 1 ) ) {
        if ( v > -back_speed ) {
          acc = -0.5*acc_const;  // accelerate backwards
          v = v + acc;
        }
      if (carStatus != "goingBack") { carStatus != "goingBack"; }
    } else {   
      acc = 0;           // deccelerate
      v = v/decc_const;
    } 

    if ( pressed[0] == 1 && pressed[3] == 0 ) {
      rot = rot - 2*Math.PI/handling;
    } else if ( pressed[0] == 0 && pressed[3] == 1 ) {
      rot = rot + 2*Math.PI/handling;
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
