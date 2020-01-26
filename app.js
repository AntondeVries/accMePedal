
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

      scope.$on('streamsUpdate', function (event, streams) {
        
        var speedMs = streams.electrics.wheelspeed;
        scope.speed = UiUnits.speed(speedMs);
       
        iframe.rotatePedal(streams.electrics.engineThrottle);
        console.log(streams.electrics.engineThrottle);
        iframe.pedalReleased(streams.electrics.engineThrottle);
        
        iframe.conEffBerechnen(scope.speed.val);
      });
    }
  };
  
}])