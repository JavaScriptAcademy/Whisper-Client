angular.module('media.voiceService', ['ionic'])
.factory('voiceService', function($http, $cordovaFileTransfer,$ionicPlatform) {
	return {
		uploadFileToUrl:function(serverUrl, fileUrl){
			console.log('enter uploadFileToUrl');
			$ionicPlatform.ready(function() {
				var options = new FileUploadOptions();
				options.fileKey="post";
				options.chunkedMode=false;
				options.headers = {Connection : "close"};

				$cordovaFileTransfer.upload(serverUrl,fileUrl, options);
			});
		},
		downloadFileFromUrl:function(serverUrl, fileUrl){
			console.log('enter downloadFileFromUrl');
			$ionicPlatform.ready(function() {
				console.log('ionicPlatform is ready');
				console.log('serverUrl:'+serverUrl);
				console.log('fileUrl:'+fileUrl);
				var options = new FileUploadOptions();
				options.fileKey="file";
				options.chunkedMode=false;
				options.headers = {Connection : "close"};

				$cordovaFileTransfer.upload(serverUrl,fileUrl, options);
			});
		}
	}
})
// angular.module('media.voiceService', ['ionic'])
// .factory('voiceService', function($http,$ionicPlatform) {
// 	return {
// 		uploadFileToUrl:function(serverUrl, fileUrl, successCallback){
// 			console.log('enter uploadFileToUrl');
// 			$ionicPlatform.ready(function() {
// 				console.log('ionicPlatform is ready');
// 				console.log('serverUrl:'+serverUrl);
// 				console.log('fileUrl:'+fileUrl);
// 				console.log('successCallback:'+successCallback);
// 				$cordovaFileTransfer.upload(serverUrl,fileUrl,successCallback,function(res){
// 					console.log('fail: voice service response: '+res);
// 				});
// 			});
// 		}
// 	}
// })
