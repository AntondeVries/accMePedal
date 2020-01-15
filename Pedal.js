
// Root element 
const root = document.getElementsByTagName('svg')[0];
var img = document.getElementById("pedalImg");
var svg = document.getElementById("svg");
var bBox = svg.getBBox();
var bBoxH = bBox.height.toString();
var bBoxW = bBox.width.toString();
var canvas = document.getElementById('pedalcanvas');
var context = canvas.getContext('2d');





document.rotatePedal = function(value){
    var angle = 0;
    var multiplikator = -53;

    var angle = value * multiplikator;

    if (value == 1){
        angle = -53;
        
    }

    img.style.transform = `rotate(${angle}deg) `;
    console.log(angle);
}

