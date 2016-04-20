angular.module('starter.services', [])
.factory('awesomeService', function($http) {
  return {
    GetAllMessage:function(roomId, successCallback){
      $http({
        url: "http://localhost:3030/rooms/"+roomId,
        method: "GET"
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