//menu burger

const toggleButton = document.getElementById('toggle-btn');
const sideBar = document.getElementById('side-bar');

toggleButton.addEventListener('click', show);

function show(){
  sideBar.classList.toggle('active');
}


// home page 

document.querySelectorAll("nav button").forEach((btn, index) => {
  btn.addEventListener("click", () => {
      gsap.to(window, { duration: 1, scrollTo: { y: "#section" + (index + 1), offsetY: 70 } });
  });
});

function animateFrom(elem, direction) {
  direction = direction || 1;
  var x = 0,
      y = direction * 100;
  if (elem.classList.contains("gs_reveal_fromLeft")) {
      x = -100;
      y = 0;
  } else if (elem.classList.contains("gs_reveal_fromRight")) {
      x = 100;
      y = 0;
  }
  elem.style.transform = "translate(" + x + "px, " + y + "px)";
  elem.style.opacity = "0";
  gsap.fromTo(elem, { x: x, y: y, autoAlpha: 0 }, {
      duration: 1.25,
      x: 0,
      y: 0,
      autoAlpha: 1,
      ease: "expo",
      overwrite: "auto"
  });
}

function hide(elem) {
  gsap.set(elem, { autoAlpha: 0 });
}

document.addEventListener("DOMContentLoaded", function () {
  gsap.registerPlugin(ScrollTrigger);

  gsap.utils.toArray(".gs_reveal").forEach(function (elem) {
      hide(elem); // assure that the element is hidden when scrolled into view

      ScrollTrigger.create({
          trigger: elem,
          onEnter: function () { animateFrom(elem) },
          onEnterBack: function () { animateFrom(elem, -1) },
          onLeave: function () { hide(elem) } // assure that the element is hidden when scrolled into view
      });
  });
});


gsap.to(".pContent", {
  delay: 1,
  scale: 1.2,
  //y: 400,
  autoAlpha: 0.5,
  stagger: 0.15,
  overwrite: true,
  yPercent: -20,
  ease: "flip",
  scrollTrigger: {
      trigger: ".pSection",
      // start: "top bottom", // the default values
      //end: "bottom top",
      scrub: false
  },
});

gsap.to(".pImage", {

  ease: "none",
  scrollTrigger: {
      trigger: ".pSection",
      // start: "top bottom", // the default values
      // end: "bottom top",
      scrub: true
  },
});


/////////----------CAROUSEL--------------/////////////

// $('input').an('change'), function () {
//   $('body').toggleClass('blue');
// }

////////    carousel 2     /////////////////
////////////////////////--------------/////////////////

var radius = 340; // how big of the radius
var autoRotate = true; // auto rotate or not
var rotateSpeed = -60; // unit: seconds/360 degrees
var imgWidth = 120; // width of images (unit: px)
var imgHeight = 170; // height of images (unit: px)

// Link of background music - set 'null' if you dont want to play background music
//var bgMusicURL = 'https://api.soundcloud.com/tracks/143041228/stream?client_id=587aa2d384f7333a886010d5f52f302a';
//var bgMusicControls = true; // Show UI music control



// ===================== start =======================
// animation start after 1000 miliseconds
setTimeout(init, 2000);

var odrag = document.getElementById('drag-container');
var ospin = document.getElementById('spin-container');
var aImg = ospin.getElementsByTagName('img');
var aVid = ospin.getElementsByTagName('video');
var aEle = [...aImg, ...aVid]; // combine 2 arrays

// Size of images
ospin.style.width = imgWidth + "px";
ospin.style.height = imgHeight + "px";

// Size of ground - depend on radius
var ground = document.getElementById('ground');
ground.style.width = radius * 4 + "px";
ground.style.height = `${radius * 3}px`;

function init(delayTime) {
  for (var i = 0; i < aEle.length; i++) {
    aEle[i].style.transform = "rotateY(" + (i * (360 / aEle.length)) + "deg) translateZ(" + radius + "px)";
    aEle[i].style.transition = "transform 1s";
    aEle[i].style.transitionDelay = delayTime || (aEle.length - i) / 4 + "s";
  }
}

function applyTranform(obj) {
  // Constrain the angle of camera (between 0 and 180)
  if(tY > 180) tY = 180;
  if(tY < 0) tY = 0;

  // Apply the angle
  obj.style.transform = "rotateX(" + (-tY) + "deg) rotateY(" + (tX) + "deg)";
}

function playSpin(yes) {
  ospin.style.animationPlayState = (yes?'running':'paused');
}

var sX, sY, nX, nY, desX = 0,
    desY = 0,
    tX = 0,
    tY = 10;

// auto spin
if (autoRotate) {
  var animationName = (rotateSpeed > 0 ? 'spin' : 'spinRevert');
  ospin.style.animation = `${animationName} ${Math.abs(rotateSpeed)}s infinite linear`;
}

// add background music
/*
if (bgMusicURL) {
  document.getElementById('music-container').innerHTML += `
<audio src="${bgMusicURL}" ${bgMusicControls? 'controls': ''} autoplay loop>    
<p>If you are reading this, it is because your browser does not support the audio element.</p>
</audio>
`;
}
*/

// setup events
document.onpointerdown = function (e) {
  clearInterval(odrag.timer);
  e = e || window.event;
  var sX = e.clientX,
      sY = e.clientY;

  this.onpointermove = function (e) {
    e = e || window.event;
    var nX = e.clientX,
        nY = e.clientY;
    desX = nX - sX;
    desY = nY - sY;
    tX += desX * 0.1;
    tY += desY * 0.1;
    applyTranform(odrag);
    sX = nX;
    sY = nY;
  };

  this.onpointerup = function (e) {
    odrag.timer = setInterval(function () {
      desX *= 0.95;
      desY *= 0.95;
      tX += desX * 0.1;
      tY += desY * 0.1;
      applyTranform(odrag);
      playSpin(false);
      if (Math.abs(desX) < 0.5 && Math.abs(desY) < 0.5) {
        clearInterval(odrag.timer);
        playSpin(true);
      }
    }, 17);
    this.onpointermove = this.onpointerup = null;
  };

  return false;
};

document.onmousewheel = function(e) {
  e = e || window.event;
  var d = e.wheelDelta / 20 || -e.detail;
  radius += d;
  init(1);
};


////////////////////////--------------/////////////////
// $(document).ready(function() {
// 	$('.carousel2').carousel();
// });

$('input').on('change', function () {
  $('body').toggleClass('blue');
});






