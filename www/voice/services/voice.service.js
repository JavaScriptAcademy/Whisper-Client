angular.module('media.voiceService', ['ionic'])
.factory('voiceService', function($http, $cordovaFileTransfer,$ionicPlatform) {
  return {
    uploadFileToUrl:function(serverUrl, fileUrl, successCallback){
      $ionicPlatform.ready(function() {
        console.log('ionicPlatform is ready');
        console.log('serverUrl:'+serverUrl);
        console.log('fileUrl:'+fileUrl);
        console.log('successCallback:'+successCallback);
        $cordovaFileTransfer.upload(serverUrl,fileUrl,successCallback,function(res){
          console.log('fail: voice service response: '+res);
        });
      });
    }
   }
})
