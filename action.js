var context = $('#canvas')[0].getContext("2d");
var x = 75;
var y = 75;
var dx = 2;
var dy = 4;

function circle(x, y, radius) {
  context.beginPath();
  context.arc(x, y, radius, 0, Math.PI*2, true); 
  context.closePath();
  context.fill();
};
function draw()
{
  context.clearRect(0, 0, $('#canvas')[0].width, $('#canvas')[0].height);
  circle(x, y, 10);
  if (x + dx > $('#canvas')[0].width || x + dx < 0)
    {
      dx = -dx;
    }
  if (y + dy > $('#canvas')[0].height || y + dy < 0 )
  {
    dy = -dy;
  }
  x += dx;
  y += dy;
};

setInterval(draw,10)
