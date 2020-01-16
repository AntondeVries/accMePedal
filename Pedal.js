'use strict';
// Root element 
const root = document.getElementsByTagName('svg')[0];
var img = document.getElementById("pedalImg");
var svg = document.getElementById("svg");
var bBox = svg.getBBox();
var bBoxH = bBox.height.toString();
var bBoxW = bBox.width.toString();
var canvas = document.getElementById('pedalcanvas');
var context = canvas.getContext('2d');

//ConvEfficiency 
const efficiencyMapValues = [
    [0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7],
    [0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7],
    [0.7, 0.723418186, 0.758787864, 0.767137591, 0.760788743, 0.752388867, 0.746292794, 0.740676241, 0.730818134, 0.726345965, 0.715914639],
    [0.7, 0.753610288, 0.805869295, 0.812431638, 0.809574789, 0.807666017, 0.804359027, 0.800954113, 0.792348594, 0.783343237, 0.769329441],
    [0.7, 0.770920836, 0.823156977, 0.835300484, 0.83394582, 0.83135591, 0.830175772, 0.825524969, 0.821046359, 0.816525129, 0.80674766],
    [0.7, 0.764503009, 0.831899951, 0.849889592, 0.850326979, 0.849962727, 0.848989307, 0.846461075, 0.843426802, 0.839272883, 0.808004859],
    [0.7, 0.777613757, 0.848567847, 0.859580638, 0.861693424, 0.862821504, 0.862885798, 0.861845599, 0.859829962, 0.853571269, 0.808262558],
    [0.7, 0.808042881, 0.850319892, 0.865665409, 0.872209944, 0.873054411, 0.873250529, 0.86966634, 0.863617869, 0.860025992, 0.832559861],
    [0.7, 0.803812249, 0.852288508, 0.867997957, 0.87897319, 0.879970526, 0.88, 0.876692437, 0.869807183, 0.86231639, 0.824829062],
    [0.7, 0.794057161, 0.845510236, 0.867811018, 0.876832838, 0.88, 0.879905765, 0.878130335, 0.868703422, 0.858013941, 0.835850828],
    [0.7, 0.781416499, 0.8358298, 0.865409578, 0.875771178, 0.879614963, 0.877381142, 0.872126578, 0.864439542, 0.854626639, 0.842079536],
    [0.7, 0.771523275, 0.823222905, 0.856227136, 0.867111807, 0.871813911, 0.871654624, 0.866370827, 0.858738168, 0.848549315, 0.836527588],
    [0.7, 0.758920457, 0.808213949, 0.844602443, 0.855385968, 0.86, 0.86, 0.858167374, 0.854393246, 0.84308132, 0.832257636],
    [0.7, 0.745294993, 0.786928395, 0.819136703, 0.838825111, 0.848660086, 0.852228706, 0.853241832, 0.844230008, 0.834784629, 0.824686136],
    [0.7, 0.732714959, 0.765301131, 0.796673543, 0.824574116, 0.837850287, 0.846055324, 0.841710006, 0.83589766, 0.827729053, 0.81875825],
    [0.7, 0.701434479, 0.702868957, 0.733620384, 0.767383996, 0.795928514, 0.823277743, 0.828452945, 0.82502554, 0.818716865, 0.810696405],
    [0.7, 0.7, 0.7, 0.7, 0.7, 0.709997101, 0.738915581, 0.767625779, 0.78531552, 0.803005262, 0.803109749],
    [0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.702901421, 0.711488641, 0.720075862],
    [0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7],
    [0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7],
    [0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7]
];


//Geschwindigkeiten (y-achse von Map)
const mapKeys = [0, 6.75, 13.5, 20.25, 27, 33.75, 40.5, 47.25, 54, 60.75, 67.5, 74.25, 81, 87.75, 94.5, 101.25, 108, 114.75, 121.5, 128.25, 135];

//Pedal Positionen (x-aachse von Map)
const pedalValues = [ 0 , 0.1 , 0.2 , 0.3 , 0.4 , 0.5 , 0.6 , 0.7 , 0.8 , 0.9 ,1 ];

//Berechnet aktuelle ConEff mit unterfunktionen
document.conEffBerechnen = function(value) {
    var aktuelleGeschw = value;
    
    //berechnet den Index der aktuellen geschwindigkeit aus constMapKeys (y-Achse von Map) 
    //@PARAM: Geschwindigkeit des Autos @RETURN: Index der Geschwindigkeit
    function geschwIndex(aktuelleGeschw){
        for(let i = 0; i<mapKeys.length ; i++){
            var höher = i+1;
            
            var difZuHöher = mapKeys[höher] - aktuelleGeschw;
            var difZuIndex = aktuelleGeschw - mapKeys[i];
            if (aktuelleGeschw > 135){
                console.log(20);
                return 20;
            }

            if (aktuelleGeschw< mapKeys[i+1] && aktuelleGeschw > mapKeys[i] ){
                console.log('in if')
                if (difZuHöher < difZuIndex){
                    console.log(höher);
                    return höher;
                } else if( difZuIndex < difZuHöher){
                    console.log(i);
                    return i;
                }
            }
        }
    }

    //ermittelt die Kennline der ConEff abhängig von der aktuellen Geschwindigkeit 
    //@PARAM: Index der Geschwindigkeit aus geschwIndex  @RETURN: Kennline der ConEff als Array
    function getKennlinie(geschwIndex){
        var kennlinie = efficiencyMapValues[geschwIndex];
        console.log('in getKennlinie');
        return kennlinie;
    }

    // brechnet die Beste CONEFF abhängg von Geschwindigkeit 
    //@PARAM KennlinienArray aus getKennlinie() @RETURN höchst mögliche ConEff per Geschwindigkeit
    function getGewünschteConvEff(kennlinie){
        var höchsterWert = 0;
        console.log('ingetGewünschteconEff')
        for(var i = 1; i < kennlinie.length; i++){
            console.log(i);
            var prevI = kennlinie[i-1];
            var currentI = kennlinie[i];
            if (currentI < prevI ){
                if(höchsterWert < prevI )
                höchsterWert = prevI;
                
            } else if(currentI == prevI ){
                if(höchsterWert < prevI ){
                    höchsterWert = prevI;
                }
            }
        }
        console.log(höchsterWert);
        return höchsterWert;
    }

    //funktionsaufrufe
    getGewünschteConvEff(getKennlinie(geschwIndex(aktuelleGeschw)));
    //geschwIndex(aktuelleGeschw);


}

document.rotatePedal = function(value){
    var angle = 0;
    var multiplikator = -53;
    var angle = value * multiplikator;
    if (value == 1){
        angle = -53;  
    }
    img.style.transform = `rotate(${angle}deg) `;
    //console.log(angle);
}

