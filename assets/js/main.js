"use strict";

/* GOOGLE ANALYTICS */
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-70469459-6', 'auto');
ga('send', 'pageview');

function gaEvent(clickedItem){
  ga('send', 'event', clickedItem, 'click');
}



/* INITIALIZATION */
window.onload = function() { document.body.className = ''; }
window.ontouchmove = function() { return false; }
window.onorientationchange = function() { document.body.scrollTop = 0; }

/* COLOR SCHEME */
let prefersDark = false
const darkSchemeQuery = window.matchMedia('(prefers-color-scheme: dark)')

function setColorScheme(e) {
  prefersDark = e.matches
}

setColorScheme(darkSchemeQuery)
darkSchemeQuery.addEventListener('change', setColorScheme)



/* BG ANIMATION */
setInterval( function() {
  requestAnimationFrame(updateGradient);
}, 60);

const brightThemeColors = [
  [ 49, 135, 118],
  [ 83, 120, 149],
  [151, 153,  19],
  [232, 140,  62],
  [106, 145, 129],
  [ 89,  97, 100],
  [ 88, 140,  57],
  [ 60,  21,  24],
  [ 67,  35, 113]
];

const darkThemeColors = [
  [232, 140,  62],
  [191,  15, 255],
  [ 61, 139, 255],
  [110, 238, 135],
  [ 210,210, 210],
  [ 83, 120, 149],
  [203, 255,  73],
  [255,  88,  88],
];

let step = 0;
// color table indices for:
// current color right
// next color right
// current color left
// next color left
let colorIndices = [0, 1, 2, 3];

// transition speed
let gradientSpeed = 0.0075;

function updateGradient() {
  const colors = prefersDark ? darkThemeColors : brightThemeColors;

  let c0_0 = colors[colorIndices[0]];
  let c0_1 = colors[colorIndices[1]];
  let c1_0 = colors[colorIndices[2]];
  let c1_1 = colors[colorIndices[3]];

  let istep = 1 - step;
  let r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
  let g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
  let b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
  let color1 = "rgb("+r1+","+g1+","+b1+")";

  let r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
  let g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
  let b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
  let color2 = "rgb("+r2+","+g2+","+b2+")";

  let gradientEl = document.getElementsByClassName("gradient")[0];

  gradientEl.style.background = "linear-gradient(-45deg, " + color1 + " , " + color2 + ") scroll";

  step += gradientSpeed;
  if ( step >= 1 ){
    step %= 1;

    // mark currently used colors to be avoided
    var colorIndicesToAvoid = [colorIndices[1], colorIndices[3]];

    colorIndices[0] = colorIndices[1];
    colorIndices[2] = colorIndices[3];

    colorIndices[1] = pickColor(colors, colorIndicesToAvoid);
    colorIndices[3] = pickColor(colors, colorIndicesToAvoid);
  }
}

//pick two new target color indices
//do not pick the same as the current one
function pickColor(colors, colorIndicesToAvoid){
  let newColorIndex;

  do {
    newColorIndex = (Math.floor(1 + Math.random() * (colors.length - 1))) % colors.length;
  } while (newColorIndex in colorIndicesToAvoid); // don't pick a color we're told to avoid

  return newColorIndex;
}



/* ABOUT */
function toggleAbout(event) {
  var summaryEl = event.currentTarget;
  var detailEl = summaryEl.parentNode
  var divEl = summaryEl.parentNode.children[1];

  if (detailEl.attributes.length == 2) {
    event.preventDefault();
    divEl.className = 'fadeUpOut';

    setTimeout(function() {
      divEl.removeAttribute('class');
      detailEl.removeAttribute('open');
    }, 1000);
  }
  else {
    gaEvent('about Kostis');
  }
}
