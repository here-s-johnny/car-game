
  function Car(ctx, beg_x, beg_y) {
    this.ctx = ctx;
    this.posx = beg_x;
    this.posy = beg_y;
    this.rot = 0; 
    this.v = 0;
    this.vMax = 3;
    this.acc = 0;
    this.acc_const = 0.021;
    this.decc_const = 1.01;
    this.back_speed = 1;
    this.handling = 200;
    this.braking_force = 4;
    this.draw = function () { return drawCar(this.ctx, this.posx, this.posy, 20, 10, this.rot); };
    this.stat = "halt";
    this.accelerate = function() {
      this.acc = this.acc_const;
      if (this.v < this.vMax) {this.v = this.v + this.acc};
      if (this.stat != "going" && this.v>0) { this.stat = "going" };
    }
    this.brake = function () {
      if (this.v>0) {          // brake
        this.a = -this.braking_force*this.acc_const;
        this.v = this.v + this.a;
      } else {
        this.v = 0;
        this.acc = 0; } 
      if (this.v == 0) { this.stat = "justStopped" }
    }
    this.park = function() {
      this.stat = "halt";
    }
    this.stop = function () {
      this.v = 0;
      this.acc = 0;
      this.stat = "justStopped";
    }
    this.accelerateBackwards = function () {
      if ( this.v > -this.back_speed ) {
        this.acc = -0.5*this.acc_const;  
        this.v = this.v + this.acc; }
    }
    this.deccelerate = function () {
      this.acc = 0;           // deccelerate
      this.v = this.v/this.decc_const;
    }
    this.rotate = function (dir) {
      this.rot = this.rot + dir*2*Math.PI/this.handling;
    }
    this.accessGranted = function (level, x, y) {
      var soFarSoGood = true;
      for (var ob in level.obstacles) {
        if (level.obstacles[ob] instanceof RectangularObstacle) {
          if (x + 6 >= level.obstacles[ob].xMin && x - 6 <= level.obstacles[ob].xMax && y + 6 >= level.obstacles[ob].yMin && y - 6 <= level.obstacles[ob].yMax && soFarSoGood) {soFarSoGood = false;}
        } else if (((Math.sqrt(Math.pow((x-level.obstacles[ob].x),2)+(Math.pow((y-level.obstacles[ob].y),2)))) < level.obstacles[ob].radius + 6) && soFarSoGood) { soFarSoGood = false;}
      }
      return soFarSoGood;
    }
    this.moveIsPossible = function (level, x, y) {
      if (x - 7 > level.leftBound && x + 7 < level.rightBound && y - 7 > level.upperBound && y + 7 < level.lowerBound && this.accessGranted(level,x,y)) {
        return true;
      } else return false;
    }
    this.resolveMovement = function (level) {
      if (this.moveIsPossible(level, this.posx + this.v*Math.cos(this.rot), this.posy + this.v*Math.sin(this.rot))) {
        this.posy = this.posy + this.v*Math.sin(this.rot);
        this.posx = this.posx + this.v*Math.cos(this.rot);
      } else { this.stop(); }
      this.draw();
      if (this.crossedFinishLine(level, this.posx, this.posy)) { if(confirm('Congratulations! You win! \n Play again?')){
document.location.reload(true);
} };
    }
    this.crossedFinishLine = function (level, x, y) {
      if (level.finBegX < x && level.finFinX > x && level.finBegY < y) { return true;}
    }
  }

