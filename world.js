var ctx = $('#canvas')[0].getContext("2d");

function RectangularObstacle(ctx, x, y, width, height) {
	this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.xMin = this.x - this.width/2;
    this.xMax = this.x + this.width/2;
    this.yMin = this.y - this.height/2;
    this.yMax = this.y + this.height/2;
    this.draw = function (){ return drawRectangle(this.ctx, this.x, this.y, this.width, this.height); }
}

function CircularObstacle(ctx, x, y, radius) {
	this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.draw = function () { return drawCircle(this.ctx, this.x, this.y, this.radius); }
}

function tips (ctx) {
    ctx.font="20px Georgia";
    ctx.fillStyle = "lime";
    ctx.fillText("This is you ^",20,130);
    ctx.fillText("Don't hit those!", 310, 100);
    ctx.fillText("Get to the finish line > ",470, 530);
    ctx.fillText("Hurry before the time's up! \\/",165, 540);
  }

function World(ctx, obstacles) {
	this.ctx = ctx;
    this.upperBound = 0;
	this.lowerBound = canvas.height;
    this.leftBound = 0;
    this.rightBound = canvas.width;
    this.finBegX = 650;
    this.finBegY = 520;
    this.finFinX = 800;
    this.finFinY = 520;
    this.obstacles = obstacles;
    this.drawObstacles = function () {
      for (var ob in obstacles) { obstacles[ob].draw(); } 
    }
    this.drawFinishLine = function () { return drawLine(this.ctx, this.finBegX, this.finBegY, this.finFinX, this.finFinY); } 
}


var obstacle1 = new RectangularObstacle(ctx, 70, 200, 150, 180);
var obstacle2 = new RectangularObstacle(ctx, 250, 480, 600, 150);
var obstacle3 = new RectangularObstacle(ctx, 370, 100, 150, 300);
var obstacle4 = new CircularObstacle(ctx, 315, 265, 90);
var obstacle5 = new RectangularObstacle(ctx, 485, 380, 50, 130);
var obstacle6 = new CircularObstacle(ctx, 540, 300, 35);
var obstacle7 = new RectangularObstacle(ctx, 630, 220, 175, 140);
var obstacle8 = new RectangularObstacle(ctx, 582, 130, 80, 160);
var obstacle9 = new RectangularObstacle(ctx, 750, 50, 100, 100);
var obstacle10 = new CircularObstacle(ctx, 680, 390, 45);
var obstacle11 = new CircularObstacle(ctx, 760, 390, 35);
var obstacle12 = new RectangularObstacle(ctx, 600, 520, 120, 70);
var obstacle13 = new RectangularObstacle(ctx, 785, 520, 80, 70);

var level = new World(ctx, [obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6, obstacle7, obstacle8, obstacle9, obstacle10, obstacle11, obstacle12, obstacle13]);



