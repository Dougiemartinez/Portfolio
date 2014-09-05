// the usual setup

var canvas = document.querySelector('canvas'),
    ctx = canvas.getContext('2d'),
    
    mouseX = 0,
    mouseY = 0,
    
    friction = .89,
    spring = .05, 

    ballR = 20,
    balls = [],
    numBalls,
    numCols,
    numRows,
    
    maxDistance,
    winW,
    winH;



function distanceBetween(x1, y1, x2, y2) {
  return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
}

function setupStage() {
  winW = window.innerWidth;
  winH = window.innerHeight;
  canvas.width = winW;
  canvas.height = winH;
  clearStage();
  
  maxDistance = distanceBetween(0, 0, winW, winH) / 4;
  
  initBalls(); // :) 
}

function clearStage() {
  ctx.clearRect(0, 0, winW, winH);
}

function initBalls() {
  balls = [];
  numCols = Math.ceil(winW / ballR);
  numRows = Math.ceil(winH / ballR);
  
  
  var total = numRows * numCols,
      x = 0,
      y = 0,
      ball,
      i, j;
 
  for (i = 0; i < total; i++) {
    ball = new Ball(x, y, ballR);
    ball.draw();

    balls.push(ball);
    
    x += ballR * 2;
    if (i % numCols === 0) {
      x = 0;
      y += ballR * 2;
    }
    
  }  
}



function Ball(x, y, radius) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.scale = 1;
  this.velS = 0;
  
  this.opacity = 1;
}



Ball.prototype.update = function(scale) {  
  var diffS = scale - this.scale,
      accS = diffS * spring;
  
  this.velS += accS;
  this.velS *= friction;
  
  this.scale += this.velS;
  
  // https://github.com/bit101/CodingMath/blob/master/mini4/main.js
  this.opacity = Math.min(Math.max(this.scale, 0), 1);
  
  
  
}

Ball.prototype.draw = function(x, y) {
  ctx.save();
  ctx.translate(this.x, this.y);
  ctx.scale(this.scale, this.scale);
  
  ctx.fillStyle = 'rgba(255, 255, 255, ' + this.opacity + ')';
  ctx.beginPath();
  ctx.arc(0, 0, this.radius, 0, 2 * Math.PI, false);
  
  
  ctx.fill();
  ctx.closePath();
  
  ctx.restore();
}


function mouseMoveHandler(e) {
  mouseX = e.pageX;
  mouseY = e.pageY;
}

function loop(){
  requestAnimationFrame(loop);
 
  var i = balls.length,
      b, d, s;
  
  clearStage();
  
  while (i--) {
    b = balls[i];
    d = distanceBetween(b.x, b.y, mouseX, mouseY);
    s = (d / maxDistance);
    
    b.update(s);
    b.draw( mouseX, mouseY);

  }
 
}

window.addEventListener('resize', setupStage);
document.addEventListener('mousemove', mouseMoveHandler);
setupStage();
loop();
<div class="header">
  
  <div class="nav">
    <ul>
      <li ><a class="active" href="#">Home</a></li>
      <li><a href="#">About Us</a></li>
      <li><a href="#">Shop</a></li>
      <li><a href="#">Me</a></li>
    </ul>
  </div>
  
  <div class="nav1">
    <ul>
       <li>
         <a href="#">
           <i class="fa fa-envelope"></i>
         </a>
      </li>
      <li>
        <a href="#">
          <i class="fa fa-cog"></i>
        </a>
      </li>
      <li>
        <a href="#">
          
        </a>
      </li>
    </ul>
  </div>
  
  <div class="search_box">
    <form >
      <input type="text" class="search_input" placeholder="Search"/>
      <a href="#">
        <i class="fa fa-search search_icon"></i>
      </a>
    </form>
  </div>
  <div class="logo">
    <i class="fa fa-twitter"></i>
  </div>
</div>
var openCloseBtn = $('.open');
var openCloseIcon = $('i', '.open');
var openCloseText = $('span', '.open');
var modalWindow = $('.modal');
var modalCloseBtn = $('.close');

// perspModal.el.openCloseBtn.addEventListener('click', perspModal.openClose());
openCloseBtn.click(function(){
  openCloseModal(!modalWindow.hasClass('closed'));
});
modalCloseBtn.click(function(){
  openCloseModal(true);
});


function openCloseModal(isOpen){
  
  if(isOpen){
    
    modalWindow.addClass('closed');
    openCloseIcon.removeClass('ion-toggle-filled').addClass('ion-toggle');
    openCloseText.html('Open Modal');
    
  } else{
    
    modalWindow.removeClass('closed');
    openCloseIcon.removeClass('ion-toggle').addClass('ion-toggle-filled');
    openCloseText.html('Close Modal');
  }
}