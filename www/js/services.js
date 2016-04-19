angular.module('starter.services', [])
.factory('awesomeService', function($http) {
  return {
    PostMessage: function(message) {
      $http.post('http://localhost:3030/messages/', message);
    },
    GetAllMessage:function(successCallback){
      $http({
        url: "http://localhost:3030/messages/",
        method: "GET",
        params: {
          $sort: { createdAt: -1 }
        }
      }).success((res)=>{
        successCallback(res);
      });
    }
  }
})
.factory('loginService',function($rootScope, $http){
  return{
    CreateNewUser : function(user, successCallback){
      return $http({
                    method: 'POST',
                    url: 'http://localhost:3030/signup/',
                    data: user,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).success(successCallback);

    },
    generateRandomUser: function(successCallback){
      $http({
        url: "https://randomuser.me/api/",
        method: "GET",
      }).success((res)=>{
        successCallback(res);
      });
    },
    onLogin:function(user, successCallback){
      return $http({
                    method: 'POST',
                    url: 'http://localhost:3030/login/',
                    data: user,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).success(successCallback);
    }
  }

})