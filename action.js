$(function() {

  ctx = $('#canvas')[0].getContext("2d");

  function drawLine( x_a, y_a, x_b, y_b) {
    ctx.beginPath();
    ctx.moveTo(x_a, y_a);
    ctx.lineTo(x_b, y_b);
    ctx.stroke();
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

function rotate( x, y, alpha ) {
    newx = Math.cos(alpha)*x - Math.sin(alpha)*y;
    newy = Math.sin(alpha)*x + Math.cos(alpha)*y;
    return [newx,newy];
  };

 function drawCar(x_c, y_c, sizea, sizeb, alpha) {
   e = sizea/2;
   f = sizeb/2;
   a = rotate( e, f, alpha);
   b = rotate(-e, f, alpha);
   c = rotate(-e,-f, alpha);
   d = rotate( e,-f, alpha);
   ctx.beginPath();
   ctx.moveTo(a[0]+x_c, a[1]+y_c);
   ctx.lineTo(b[0]+x_c, b[1]+y_c);
   ctx.lineTo(c[0]+x_c, c[1]+y_c);
   ctx.lineTo(d[0]+x_c, d[1]+y_c);
   ctx.lineTo(a[0]+x_c, a[1]+y_c);
   ctx.closePath();
   ctx.fill();
 };

drawCar( 150, 150, 150, 150, 0);

});
