$(function() {

  var ctx = $('#canvas')[0].getContext("2d");

  function Car(ctx, beg_x, beg_y) {
    this.ctx = ctx;
    this.posx = beg_x;
    this.posy = beg_y;
    this.rot = 0; 
    this.v = 0;
    this.acc = 0;
    this.acc_const = 0.021;
    this.decc_const = 1.01;
    this.back_speed = 1;
    this.handling = 120;
    this.braking_force = 4;
    this.draw = function () { return drawCar(this.ctx, this.posx, this.posy, 20, 10, this.rot); };
    this.stat = "halt";
    this.accelerate = function() {
      this.acc = this.acc_const;
      this.v = this.v + this.acc;
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
    this.resolveMovement = function () {
      this.posy = this.posy + this.v*Math.sin(this.rot);
      this.posx = this.posx + this.v*Math.cos(this.rot);
      this.draw();
    }
  }

  var samochod = new Car(ctx,50,50);
  samochod.draw();

  var pressed = [0,0,0,0];
  carStatus = "halt";

  function resolve() { 
    getKeyboardInput(window, pressed);

    if ( pressed[2] == 1 && pressed[1] == 0 ) {
      samochod.accelerate();
    } else if ( samochod.stat == "going"  && ( pressed[2] == 0 && pressed[1] == 1 ) ) {
      samochod.brake();
    } else if  ( samochod.stat == "justStopped"  &&  ( pressed[2] == 0 && pressed[1] == 0 ) ) {
      samochod.park();
    } else if ( ( samochod.stat == "halt" || samochod.stat == "goingBack"  )  && ( pressed[2] == 0 && pressed[1] == 1 ) ) {
      samochod.accelerateBackwards();
    } else {   
      samochod.deccelerate();
    } 

    if ( pressed[0] == 1 && pressed[3] == 0 ) {
      samochod.rotate(-1);
    } else if ( pressed[0] == 0 && pressed[3] == 1 ) {
      samochod.rotate(1);
    } 

    clearCanvas(ctx);
    samochod.resolveMovement();
    $('#canvas')[0].height/2
      frame(ctx, $('#canvas')[0].width/2, $('#canvas')[0].height/2,  //draw a frame
          $('#canvas')[0].width, $('#canvas')[0].height);
  };

  var timer = setInterval(function(){ resolve()} , 10) ;
});
