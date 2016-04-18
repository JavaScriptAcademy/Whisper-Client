angular.module('starter.services', [])
.factory('awesomeService', function($http) {
  return {
    PostMessage: function(message, successCallback) {
      $http.post('http://localhost:3030/messages/', message).then(successCallback);
    },
    GetAllMessage:function(successCallback){
      $http({
        url: "http://localhost:3030/messages/",
        method: "GET",
        params: {
          $sort: { createdAt: -1 }
        }
      }).then(successCallback);
    }
  }
})