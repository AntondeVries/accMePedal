/**
 * !READ ME FIRST! 
 * Vorlage von BeamNg vorgegeben.
 * Nicht alles selbst geschreiben, es wurden lediglich Teile editiert.
 * Dazu gehören : template, streamsList, element.on('load'), scope.$on('streamsUpdate')
 * src = https://wiki.beamng.com/My_First_App   (app.js file)
 * 
 */
angular.module('beamng.apps')
.directive('pedal', ['StreamsManager', 'UiUnits', 'bngApi' ,function (StreamsManager, UiUnits, bngApi) {
  return {
    template:  '<iframe src="modules/apps/Pedal/Pedal.html" style="width:100%; height:100%;" frameborder="0"></iframe>',
    replace: true,
    restrict: 'EA',
    link: function (scope, element, attrs) {      
      // An optional list of streams that will be used in the app
      var streamsList = ['engineInfo , electrics'];
      bngApi.engineLua('extensions.load("util_logStreams")');
      // Make the needed streams available.
      StreamsManager.add(streamsList);
 
      // Make sure we clean up after closing the app.
      scope.$on('$destroy', function () {
        StreamsManager.remove(streamsList);
      });
      
      
      var iframe 

      element.on('load', function(){
        iframe = element[0].contentDocument;
        
        
      });

      //Bei Veränderung der Streamwerte wird Funktion aufgerufen. 
      //Beinhaltet Funktionsaufrufe für Pedal.js
      scope.$on('streamsUpdate', function (event, streams) {
        
        var speedMs = streams.electrics.wheelspeed;
        scope.speed = UiUnits.speed(speedMs);
       
        iframe.rotatePedal(streams.electrics.engineThrottle);
        
        iframe.pedalReleased(streams.electrics.engineThrottle , scope.speed.val);
        
        iframe.conEffBerechnen(scope.speed.val);
      });
    }
  };

}])