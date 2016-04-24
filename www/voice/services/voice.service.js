angular.module('media.voiceService', [])
.factory('voiceService', function($http) {

  return {
    uploadFileToUrl:function(file, uploadUrl, successCallback){
      var fd = new FormData();
      fd.append('file', file);

      $http.post(uploadUrl, fd, {
        transformRequest: angular.identity,
        headers: {'Content-Type': undefined}
      })
      .success(function(res){
        if(successCallback){
          successCallback(res);
        }else{
          console.log('uploadFileToUrl res',res);
        }
      })
      .error(function(res){
        console.log('uploadFileToUrl res',res);
      });
    },
  }
})
