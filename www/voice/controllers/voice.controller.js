angular.module('media.voiceCtrl', ['ionic','media.voiceService',
  'angularFileUpload'])

.controller('VoiceCtrl', function($rootScope,$scope,voiceService,FileUploader) {
 $scope.uploader = new FileUploader();
});
