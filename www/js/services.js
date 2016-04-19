angular.module('starter.services', [])
.factory('awesomeService', function($http) {
  return {
    PostMessage: function(message) {
      $http.post('http://localhost:3030/messages/', message);
    },
    GetAllMessage:function(){
      $http({
        url: "http://localhost:3030/messages/",
        method: "GET",
        params: {
          $sort: { createdAt: -1 }
        }
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

    }
  }

})