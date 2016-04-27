

angular.module('media.recordCtrl', ['ionic'])

.controller('RecordCtrl', function($scope) {
  var recorder = new Object;

  $scope.stop = function() {
    window.plugins.audioRecorderAPI.stop(function(msg) {
    // success
    alert('ok: ' + msg);
  }, function(msg) {
    // failed
    alert('ko: ' + msg);
  });
  }
  $scope.record = function() {
    window.plugins.audioRecorderAPI.record(function(msg) {
    // complete
    alert('ok: ' + msg);
  }, function(msg) {
    // failed
    alert('ko: ' + msg);
  }, 30); // record 30 seconds
  }
  $scope.playback = function() {
    window.plugins.audioRecorderAPI.playback(function(msg) {
    // complete
    alert('ok: ' + msg);
  }, function(msg) {
    // failed
    alert('ko: ' + msg);
  });
  }

});
