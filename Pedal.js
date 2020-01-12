
// Root element 
const root = document.getElementsByTagName('svg')[0];
var img = document.getElementById("pedalImg");

document.PedalUi = function(){
    //MainObj
   const pedalUi = {
       root: root
   };
    
    return PedalUi;
}
document.drawPedal = function(){
    var canvas = document.getElementById('pedalcanvas');
    var context = canvas.getContext('2d');

    
    
    img.onload = function(){
        context.drawImage(img , 200 , 0 , );
        console.log('hier');
        //console.log()
    }
    img.src = "test.svg";   
    //context.drawImage(pedalSvg);  
    //context.beginPath();
    //context.moveTo(21038,2728);
    //context.lineTo(18806,835);
    //context.stroke();
}

document.rotatePedal = function(value){
    
    img.style.transform = "rotate(180 deg)";
    console.log("rotatePedal");
    
}