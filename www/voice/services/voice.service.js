angular.module('media.voiceService', ['ionic','ngCordova'])
.factory('voiceService', function($http, $cordovaFileTransfer,$ionicPlatform) {
  return {
    uploadFileToUrl:function(serverUrl, fileUrl, successCallback){
      $ionicPlatform.ready(function() {
         $cordovaFileTransfer.upload(serverUrl,fileUrl).
        then(successCallback);
      });
    }
   }
})
