$(function() {

  var ctx = $('#canvas')[0].getContext("2d");

  function clearCanvas() {
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
  };

  function rectangle( center_x, center_y, sizea, sizeb  ) {
    ctx.beginPath();
    ctx.moveTo(center_x - sizea/2, center_y + sizeb/2);
    ctx.lineTo(center_x + sizea/2, center_y + sizeb/2);
    ctx.lineTo(center_x + sizea/2, center_y - sizeb/2);
    ctx.lineTo(center_x - sizea/2, center_y - sizeb/2);
    ctx.lineTo(center_x - sizea/2, center_y + sizeb/2);
    ctx.closePath();
    ctx.fill();
  };

  function frame( center_x, center_y, sizea, sizeb  ) {
    ctx.beginPath();
    ctx.moveTo(center_x - sizea/2, center_y + sizeb/2);
    ctx.lineTo(center_x + sizea/2, center_y + sizeb/2);
    ctx.lineTo(center_x + sizea/2, center_y - sizeb/2);
    ctx.lineTo(center_x - sizea/2, center_y - sizeb/2);
    ctx.lineTo(center_x - sizea/2, center_y + sizeb/2);
    ctx.closePath();
    ctx.stroke();
  };

  function rotate( x, y, alpha ) {
    newx = Math.cos(alpha)*x - Math.sin(alpha)*y;
    newy = Math.sin(alpha)*x + Math.cos(alpha)*y;
    return [newx,newy];
  };

  function drawCar(x_c, y_c, sizea, sizeb, alpha) {
    e = sizea/2;
    f = sizeb/2;
    g = sizea/4;
    a = rotate( e, f, alpha);
    b = rotate(-e, f, alpha);
    c = rotate(-e,-f, alpha);
    d = rotate( e,-f, alpha);
    h = rotate( g, f, alpha);
    i = rotate( g,-f, alpha);
    ctx.beginPath();
    ctx.moveTo(a[0]+x_c, a[1]+y_c);
    ctx.lineTo(b[0]+x_c, b[1]+y_c);
    ctx.lineTo(c[0]+x_c, c[1]+y_c);
    ctx.lineTo(d[0]+x_c, d[1]+y_c);
    ctx.lineTo(a[0]+x_c, a[1]+y_c);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(h[0]+x_c, h[1]+y_c);
    ctx.lineTo(i[0]+x_c, i[1]+y_c);
    ctx.stroke();
  };

  x_a = 50;
  y_a = 50;
  rot = 0;
  v = 0;
  acc = 0;
  acc_const = 0.025;
  decc_const = 1.01;
  drawCar(x_a, y_a, 20, 10, rot);
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
    clearCanvas();
    drawCar(x_a, y_a, 20, 10, rot);
    frame(500, 500, 1000, 1000);
  };

  var timer = setInterval(  function(){ resolve()} , 10) ;
});
