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



/* BG ANIMATION */
setInterval( function (){
  updateGradient();
}, 50);

let colors = new Array(
  [89,   97, 100],
  [83,  120, 149],
  [232, 140,  62],
  [106, 145, 129],
  [60,   21,  24],
  [173,  43,  43],
  [151, 153,  19]
);

let step = 0;
//color table indices for: 
// current color left
// next color left
// current color right
// next color right
let colorIndices = [4,5,3,0];

//transition speed
let gradientSpeed = 0.0075;

function updateGradient() {          
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

    colorIndices[0] = colorIndices[1];
    colorIndices[2] = colorIndices[3];

    colorIndices[1] = pickColor(colors, [colorIndices[1], colorIndices[3]]);
    colorIndices[3] = pickColor(colors, [colorIndices[1], colorIndices[3]]);
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



/* About */

function toggleAboutContent() {
  let contentClass = document.getElementById('about-content').className;

  if (contentClass === 'displayed'){
    document.getElementById('about-content').className = 'not-displayed';
    document.getElementById('about-icon').className = '';
  }
  else if (contentClass === 'not-displayed') {
    document.getElementById('about-content').className = 'displayed';
    document.getElementById('about-icon').className = 'rotated90';
  }
  else {
    console.error('No man\'s land!');
  }
}