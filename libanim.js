function clearCanvas(ctx) {
  ctx.save();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.restore();
};

function rectangle(ctx, center_x, center_y, sizea, sizeb  ) {
  ctx.beginPath();
  ctx.moveTo(center_x - sizea/2, center_y + sizeb/2);
  ctx.lineTo(center_x + sizea/2, center_y + sizeb/2);
  ctx.lineTo(center_x + sizea/2, center_y - sizeb/2);
  ctx.lineTo(center_x - sizea/2, center_y - sizeb/2);
  ctx.lineTo(center_x - sizea/2, center_y + sizeb/2);
  ctx.closePath();
  ctx.fill();
};

function frame(ctx, center_x, center_y, sizea, sizeb  ) {
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

function drawCar(ctx, x_c, y_c, sizea, sizeb, alpha) {
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

function getKeyboardInput(wind, pressed) {

  $(wind).keydown(function(event){
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

  $(wind).keyup(function(event){
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

  return pressed;
};
