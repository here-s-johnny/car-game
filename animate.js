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
 drawCar(x_a, y_a, 20, 10, rot);

 $(window).keydown(function(event){

   if(event.keyCode == 65 || event.keyCode == 37) {
     event.preventDefault();
     rot = rot - 2*Math.PI/36;
     clearCanvas();
     drawCar(x_a, y_a, 20, 10, rot);
   }
   if(event.keyCode == 68 || event.keyCode == 39) {
     event.preventDefault();
     rot = rot + 2*Math.PI/36;
     clearCanvas();
     drawCar(x_a, y_a, 20, 10, rot);
   }
   if(event.keyCode == 38) {
     event.preventDefault();
     acc = 0.01;
   }
   if(event.keyCode == 40) {
     event.preventDefault();
     acc = -0.01;
   }
 });


 $(window).keyup(function(event){
   if(event.keyCode == 38) {
     event.preventDefault();
     acc = 0;
   }

   if(event.keyCode == 40) {
     event.preventDefault();
     acc = 0; 
   }
  });

   function resolve() { 
     if (acc == 0) {
       v = v/1.05;
     }
     else {
       v = v + acc;
     } 
     y_a = y_a + v*Math.sin(rot);
     x_a = x_a + v*Math.cos(rot);
     clearCanvas();
     drawCar(x_a, y_a, 20, 10, rot);
     frame(500, 500, 1000, 1000);
 };
   

   var timer = setInterval(  function(){ resolve()} , 10) ;
   

});


