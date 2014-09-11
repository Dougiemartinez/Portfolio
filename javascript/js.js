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
// Hover-Carousel jQuery plugin
// By Yair Even-Or
// https://github.com/yairEO/hover-carousel
// http://dropthebit.com

;(function($){
    "use strict";

    var bindToClass      = 'carousel',
        containerWidth   = 0,
        scrollWidth      = 0,
        posFromLeft      = 0,    // Stripe position from the left of the screen
        stripePos        = 0,    // When relative mouse position inside the thumbs stripe
        animated         = null,
        $indicator, $carousel, el, $el, ratio, scrollPos, nextMore, prevMore, pos, padding;

    // calculate the thumbs container width
    function calc(e){
        $el = $(this).find(' > .wrap');
        el  = $el[0];
        $carousel = $el.parent();
        $indicator = $el.prev('.indicator');

        nextMore = prevMore  = false; // reset

        containerWidth       = el.clientWidth;
        scrollWidth          = el.scrollWidth; // the "<ul>"" width
        padding              = 0.2 * containerWidth; // padding in percentage of the area which the mouse movement affects
        posFromLeft          = $el.offset().left;
        stripePos            = e.pageX - padding - posFromLeft;
        pos                  = stripePos / (containerWidth - padding*2);
        scrollPos            = (scrollWidth - containerWidth ) * pos;
        
        if( scrollPos < 0 )
          scrollPos = 0;
        if( scrollPos > (scrollWidth - containerWidth) )
          scrollPos = scrollWidth - containerWidth;
      
        $el.animate({scrollLeft:scrollPos}, 200, 'swing');
        
        if( $indicator.length )
            $indicator.css({
                width: (containerWidth / scrollWidth) * 100 + '%',
                left: (scrollPos / scrollWidth ) * 100 + '%'
            });

        clearTimeout(animated);
        animated = setTimeout(function(){
            animated = null;
        }, 200);

        return this;
    }

    // move the stripe left or right according to mouse position
    function move(e){
        // don't move anything until inital movement on 'mouseenter' has finished
        if( animated ) return;

        ratio     = scrollWidth / containerWidth;
        stripePos = e.pageX - padding - posFromLeft; // the mouse X position, "normalized" to the carousel position

        if( stripePos < 0)
            stripePos = 0;

        pos = stripePos / (containerWidth - padding*2); // calculated position between 0 to 1
        // calculate the percentage of the mouse position within the carousel
        scrollPos = (scrollWidth - containerWidth ) * pos;   

        el.scrollLeft = scrollPos;
        if( $indicator[0] && scrollPos < (scrollWidth - containerWidth) )
          $indicator[0].style.left = (scrollPos / scrollWidth ) * 100 + '%';

        // check if element has reached an edge
        prevMore = el.scrollLeft > 0;
        nextMore = el.scrollLeft < (scrollWidth - containerWidth);

        $carousel[prevMore ? "addClass" : "removeClass"]('left');
        $carousel[nextMore ? "addClass" : "removeClass"]('right');
    }

    $.fn.carousel = function(options){
        $(document)
            .on('mouseenter.carousel', '.' + bindToClass, calc)
            .on('mousemove.carousel', '.' + bindToClass, move);
    };

    // automatic binding to all elements which have the class that is assigned to "bindToClass"
    $.fn.carousel();

})(jQuery);
/*
A quick mock-up I made after seeing the nav bar at this site: http://snipcart.com/
*/


var $window   = $(window),
    height    = $window.height(),
    width     = $window.width(),
    navheight = $('#nav_wrap').height();

function sticky(){
  var scrollTop = $window.scrollTop();
  if (scrollTop > (height - navheight)) {
    $('#nav_wrap').addClass('sticky');
    $('nav').addClass('nav_animate');
    setTimeout(function(){
      $('#logo').css({
        'left': 3 + '%', 
        'transition':'.5s'
      });     
      $('#social').css({
        'right': 5 + '%', 
        'transition':'.5s'
      });
    }, 200);
    
  } else {
    $('#nav_wrap').removeClass('sticky');
    $('nav').removeClass('nav_animate');
    setTimeout(function(){
      $('#logo').css({
        'left':-150, 
        'transition':'.5s'
      });     
      $('#social').css({
        'right':-150, 
        'transition':'.5s'
      });
    }, 200);
  }
} 

$window.on('scroll', sticky);  

//Navigational Menu
$('nav a').click(function(a){
  var menuPlace = $(this).index();
  a.preventDefault();
  $('html, body').animate({
    scrollTop : $('section').eq(menuPlace).offset().top - $('nav').height()
  }, 700);
});
// carousel
// gravity code
/**
 * requestAnimationFrame
 */
window.requestAnimationFrame = (function(){
    return  window.requestAnimationFrame       ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            window.oRequestAnimationFrame      ||
            window.msRequestAnimationFrame     ||
            function (callback) {
                window.setTimeout(callback, 1000 / 60);
            };
})();


/**
 * Vector
 */
function Vector(x, y) {
    this.x = x || 0;
    this.y = y || 0;
}

Vector.add = function(a, b) {
    return new Vector(a.x + b.x, a.y + b.y);
};

Vector.sub = function(a, b) {
    return new Vector(a.x - b.x, a.y - b.y);
};

Vector.scale = function(v, s) {
    return v.clone().scale(s);
};

Vector.random = function() {
    return new Vector(
        Math.random() * 2 - 1,
        Math.random() * 2 - 1
    );
};

Vector.prototype = {
    set: function(x, y) {
        if (typeof x === 'object') {
            y = x.y;
            x = x.x;
        }
        this.x = x || 0;
        this.y = y || 0;
        return this;
    },

    add: function(v) {
        this.x += v.x;
        this.y += v.y;
        return this;
    },

    sub: function(v) {
        this.x -= v.x;
        this.y -= v.y;
        return this;
    },

    scale: function(s) {
        this.x *= s;
        this.y *= s;
        return this;
    },

    length: function() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    },

    lengthSq: function() {
        return this.x * this.x + this.y * this.y;
    },

    normalize: function() {
        var m = Math.sqrt(this.x * this.x + this.y * this.y);
        if (m) {
            this.x /= m;
            this.y /= m;
        }
        return this;
    },

    angle: function() {
        return Math.atan2(this.y, this.x);
    },

    angleTo: function(v) {
        var dx = v.x - this.x,
            dy = v.y - this.y;
        return Math.atan2(dy, dx);
    },

    distanceTo: function(v) {
        var dx = v.x - this.x,
            dy = v.y - this.y;
        return Math.sqrt(dx * dx + dy * dy);
    },

    distanceToSq: function(v) {
        var dx = v.x - this.x,
            dy = v.y - this.y;
        return dx * dx + dy * dy;
    },

    lerp: function(v, t) {
        this.x += (v.x - this.x) * t;
        this.y += (v.y - this.y) * t;
        return this;
    },

    clone: function() {
        return new Vector(this.x, this.y);
    },

    toString: function() {
        return '(x:' + this.x + ', y:' + this.y + ')';
    }
};


/**
 * GravityPoint
 */
function GravityPoint(x, y, radius, targets) {
    Vector.call(this, x, y);
    this.radius = radius;
    this.currentRadius = radius * 0.5;

    this._targets = {
        particles: targets.particles || [],
        gravities: targets.gravities || []
    };
    this._speed = new Vector();
}

GravityPoint.RADIUS_LIMIT = 65;
GravityPoint.interferenceToPoint = true;

GravityPoint.prototype = (function(o) {
    var s = new Vector(0, 0), p;
    for (p in o) s[p] = o[p];
    return s;
})({
    gravity:       0.05,
    isMouseOver:   false,
    dragging:      false,
    destroyed:     false,
    _easeRadius:   0,
    _dragDistance: null,
    _collapsing:   false,

    hitTest: function(p) {
        return this.distanceTo(p) < this.radius;
    },

    startDrag: function(dragStartPoint) {
        this._dragDistance = Vector.sub(dragStartPoint, this);
        this.dragging = true;
    },

    drag: function(dragToPoint) {
        this.x = dragToPoint.x - this._dragDistance.x;
        this.y = dragToPoint.y - this._dragDistance.y;
    },

    endDrag: function() {
        this._dragDistance = null;
        this.dragging = false;
    },

    addSpeed: function(d) {
        this._speed = this._speed.add(d);
    },

    collapse: function(e) {
        this.currentRadius *= 1.75;
        this._collapsing = true;
    },

    render: function(ctx) {
        if (this.destroyed) return;

        var particles = this._targets.particles,
            i, len;

        for (i = 0, len = particles.length; i < len; i++) {
            particles[i].addSpeed(Vector.sub(this, particles[i]).normalize().scale(this.gravity));
        }

        this._easeRadius = (this._easeRadius + (this.radius - this.currentRadius) * 0.07) * 0.95;
        this.currentRadius += this._easeRadius;
        if (this.currentRadius < 0) this.currentRadius = 0;

        if (this._collapsing) {
            this.radius *= 0.75;
            if (this.currentRadius < 1) this.destroyed = true;
            this._draw(ctx);
            return;
        }

        var gravities = this._targets.gravities,
            g, absorp,
            area = this.radius * this.radius * Math.PI, garea;

        for (i = 0, len = gravities.length; i < len; i++) {
            g = gravities[i];

            if (g === this || g.destroyed) continue;

            if (
                (this.currentRadius >= g.radius || this.dragging) &&
                this.distanceTo(g) < (this.currentRadius + g.radius) * 0.85
            ) {
                g.destroyed = true;
                this.gravity += g.gravity;

                absorp = Vector.sub(g, this).scale(g.radius / this.radius * 0.5);
                this.addSpeed(absorp);

                garea = g.radius * g.radius * Math.PI;
                this.currentRadius = Math.sqrt((area + garea * 3) / Math.PI);
                this.radius = Math.sqrt((area + garea) / Math.PI);
            }

            g.addSpeed(Vector.sub(this, g).normalize().scale(this.gravity));
        }

        if (GravityPoint.interferenceToPoint && !this.dragging)
            this.add(this._speed);

        this._speed = new Vector();

        if (this.currentRadius > GravityPoint.RADIUS_LIMIT) this.collapse();

        this._draw(ctx);
    },

    _draw: function(ctx) {
        var grd, r;

        ctx.save();

        grd = ctx.createRadialGradient(this.x, this.y, this.radius, this.x, this.y, this.radius * 5);
        grd.addColorStop(0, 'rgba(0, 0, 0, 0.1)');
        grd.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius * 5, 0, Math.PI * 2, false);
        ctx.fillStyle = grd;
        ctx.fill();

        r = Math.random() * this.currentRadius * 0.7 + this.currentRadius * 0.3;
        grd = ctx.createRadialGradient(this.x, this.y, r, this.x, this.y, this.currentRadius);
        grd.addColorStop(0, 'rgba(0, 0, 0, 1)');
        grd.addColorStop(1, Math.random() < 0.2 ? 'rgba(255, 196, 0, 0.15)' : 'rgba(103, 181, 191, 0.75)');
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.currentRadius, 0, Math.PI * 2, false);
        ctx.fillStyle = grd;
        ctx.fill();
        ctx.restore();
    }
});


/**
 * Particle
 */
function Particle(x, y, radius) {
    Vector.call(this, x, y);
    this.radius = radius;

    this._latest = new Vector();
    this._speed  = new Vector();
}

Particle.prototype = (function(o) {
    var s = new Vector(0, 0), p;
    for (p in o) s[p] = o[p];
    return s;
})({
    addSpeed: function(d) {
        this._speed.add(d);
    },

    update: function() {
        if (this._speed.length() > 12) this._speed.normalize().scale(12);

        this._latest.set(this);
        this.add(this._speed);
    }

    // render: function(ctx) {
    //     if (this._speed.length() > 12) this._speed.normalize().scale(12);

    //     this._latest.set(this);
    //     this.add(this._speed);

    //     ctx.save();
    //     ctx.fillStyle = ctx.strokeStyle = '#fff';
    //     ctx.lineCap = ctx.lineJoin = 'round';
    //     ctx.lineWidth = this.radius * 2;
    //     ctx.beginPath();
    //     ctx.moveTo(this.x, this.y);
    //     ctx.lineTo(this._latest.x, this._latest.y);
    //     ctx.stroke();
    //     ctx.beginPath();
    //     ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    //     ctx.fill();
    //     ctx.restore();
    // }
});



// Initialize

(function() {

    // Configs

    var BACKGROUND_COLOR      = 'rgba(11, 51, 56, 1)',
        PARTICLE_RADIUS       = 1,
        G_POINT_RADIUS        = 10,
        G_POINT_RADIUS_LIMITS = 65;


    // Vars

    var canvas, context,
        bufferCvs, bufferCtx,
        screenWidth, screenHeight,
        mouse = new Vector(),
        gravities = [],
        particles = [],
        grad,
        gui, control;


    // Event Listeners

    function resize(e) {
        screenWidth  = canvas.width  = window.innerWidth;
        screenHeight = canvas.height = window.innerHeight;
        bufferCvs.width  = screenWidth;
        bufferCvs.height = screenHeight;
        context   = canvas.getContext('2d');
        bufferCtx = bufferCvs.getContext('2d');

        var cx = canvas.width * 0.5,
            cy = canvas.height * 0.5;

        grad = context.createRadialGradient(cx, cy, 0, cx, cy, Math.sqrt(cx * cx + cy * cy));
        grad.addColorStop(0, 'rgba(0, 0, 0, 0)');
        grad.addColorStop(1, 'rgba(0, 0, 0, 0.35)');
    }

    function mouseMove(e) {
        mouse.set(e.clientX, e.clientY);

        var i, g, hit = false;
        for (i = gravities.length - 1; i >= 0; i--) {
            g = gravities[i];
            if ((!hit && g.hitTest(mouse)) || g.dragging)
                g.isMouseOver = hit = true;
            else
                g.isMouseOver = false;
        }

        canvas.style.cursor = hit ? 'pointer' : 'default';
    }

    function mouseDown(e) {
        for (var i = gravities.length - 1; i >= 0; i--) {
            if (gravities[i].isMouseOver) {
                gravities[i].startDrag(mouse);
                return;
            }
        }
        gravities.push(new GravityPoint(e.clientX, e.clientY, G_POINT_RADIUS, {
            particles: particles,
            gravities: gravities
        }));
    }

    function mouseUp(e) {
        for (var i = 0, len = gravities.length; i < len; i++) {
            if (gravities[i].dragging) {
                gravities[i].endDrag();
                break;
            }
        }
    }

    function doubleClick(e) {
        for (var i = gravities.length - 1; i >= 0; i--) {
            if (gravities[i].isMouseOver) {
                gravities[i].collapse();
                break;
            }
        }
    }


    // Functions

    function addParticle(num) {
        var i, p;
        for (i = 0; i < num; i++) {
            p = new Particle(
                Math.floor(Math.random() * screenWidth - PARTICLE_RADIUS * 2) + 1 + PARTICLE_RADIUS,
                Math.floor(Math.random() * screenHeight - PARTICLE_RADIUS * 2) + 1 + PARTICLE_RADIUS,
                PARTICLE_RADIUS
            );
            p.addSpeed(Vector.random());
            particles.push(p);
        }
    }

    function removeParticle(num) {
        if (particles.length < num) num = particles.length;
        for (var i = 0; i < num; i++) {
            particles.pop();
        }
    }


    // GUI Control

    control = {
        particleNum: 50
    };


    // Init

    canvas  = document.getElementById('c');
    bufferCvs = document.createElement('canvas');

    window.addEventListener('resize', resize, false);
    resize(null);

    addParticle(control.particleNum);

    canvas.addEventListener('mousemove', mouseMove, false);
    canvas.addEventListener('mousedown', mouseDown, false);
    canvas.addEventListener('mouseup', mouseUp, false);
    canvas.addEventListener('dblclick', doubleClick, false);


    // GUI

    gui = new dat.GUI();
    gui.add(control, 'particleNum', 0, 300).step(1).name('Particle Num').onChange(function() {
        var n = (control.particleNum | 0) - particles.length;
        if (n > 0)
            addParticle(n);
        else if (n < 0)
            removeParticle(-n);
    });
    gui.add(GravityPoint, 'interferenceToPoint').name('Interference Between Point');
    gui.close();


    // Start Update

    var loop = function() {
        var i, len, g, p;

        context.save();
        context.fillStyle = BACKGROUND_COLOR;
        context.fillRect(0, 0, screenWidth, screenHeight);
        context.fillStyle = grad;
        context.fillRect(0, 0, screenWidth, screenHeight);
        context.restore();

        for (i = 0, len = gravities.length; i < len; i++) {
            g = gravities[i];
            if (g.dragging) g.drag(mouse);
            g.render(context);
            if (g.destroyed) {
                gravities.splice(i, 1);
                len--;
                i--;
            }
        }
      
        bufferCtx.save();
        bufferCtx.globalCompositeOperation = 'destination-out';
        bufferCtx.globalAlpha = 0.35;
        bufferCtx.fillRect(0, 0, screenWidth, screenHeight);
        bufferCtx.restore();

        // パーティクルをバッファに描画
        // for (i = 0, len = particles.length; i < len; i++) {
        //     particles[i].render(bufferCtx);
        // }
        len = particles.length;
        bufferCtx.save();
        bufferCtx.fillStyle = bufferCtx.strokeStyle = '#fff';
        bufferCtx.lineCap = bufferCtx.lineJoin = 'round';
        bufferCtx.lineWidth = PARTICLE_RADIUS * 2;
        bufferCtx.beginPath();
        for (i = 0; i < len; i++) {
            p = particles[i];
            p.update();
            bufferCtx.moveTo(p.x, p.y);
            bufferCtx.lineTo(p._latest.x, p._latest.y);
        }
        bufferCtx.stroke();
        bufferCtx.beginPath();
        for (i = 0; i < len; i++) {
            p = particles[i];
            bufferCtx.moveTo(p.x, p.y);
            bufferCtx.arc(p.x, p.y, p.radius, 0, Math.PI * 2, false);
        }
        bufferCtx.fill();
        bufferCtx.restore();

        // バッファをキャンバスに描画
        context.drawImage(bufferCvs, 0, 0);

        requestAnimationFrame(loop);
    };
    loop();

})();
// close gravity code
// CSS Raindrops by Lucas Bebber
