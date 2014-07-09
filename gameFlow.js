
  var pressed = [0,0,0,0];

  var car = new Car(ctx,50,50);

  var Timer;
  var TotalSeconds;


  function createTimer(TimerID, Time) {
    Timer = document.getElementById(TimerID);
    TotalSeconds = Time;

    updateTimer()
    window.setTimeout("tick()", 1000);
  }

  function tick() {
    if (TotalSeconds <= 0) {
       if (confirm("Time's up! You lose :( \nWanna try again?")) {document.location.reload(true);}
      return;
  }
    TotalSeconds -= 1;
    updateTimer()
    window.setTimeout("tick()", 1000);
  }

  function updateTimer() {
    Timer.innerHTML = TotalSeconds;
  }

  function resolve() {
    clearCanvas(ctx);
    level.drawObstacles();
    tips(ctx);
    level.drawFinishLine();
    car.resolveMovement(level);
    $('#canvas')[0].height/2
      frame(ctx, $('#canvas')[0].width/2, $('#canvas')[0].height/2,  //draw a frame
        $('#canvas')[0].width, $('#canvas')[0].height);

  }

  function gameFlow() { 
    getKeyboardInput(window, pressed);

    if ( pressed[2] == 1 && pressed[1] == 0) {
      car.accelerate();
    } else if ( car.stat == "going"  && ( pressed[2] == 0 && pressed[1] == 1 ) ) {
       car.brake();
    } else if  ( car.stat == "justStopped"  &&  ( pressed[2] == 0 && pressed[1] == 0 ) ) {
      car.park();
    } else if ( ( car.stat == "halt" || car.stat == "goingBack"  )  && ( pressed[2] == 0 && pressed[1] == 1 ) ) {
      car.accelerateBackwards();
    } else {   
       car.deccelerate();
    } 

    if ( pressed[0] == 1 && pressed[3] == 0 ) {
      car.rotate(-1);
    } else if ( pressed[0] == 0 && pressed[3] == 1 ) {
      car.rotate(1);
    } 
  
    resolve();
  }
   
  var timer = setInterval(function(){ gameFlow()} , 10);
