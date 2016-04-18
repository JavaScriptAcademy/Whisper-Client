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
.factory('loginService',function($http){
  return{
    CreateNewUser : function(user){
      console.log(user);
      $http.post('http://localhost:3030/signup/', user);
    },
    onLogin : function(email,password){
      console.log(email,password);
      app.authenticate({
        type: 'local',
        'email': email,
        'password': password
      }).then(function(result){
        console.log('Authenticated!', app.get('token'));
      }).catch(function(error){
        console.error('Error authenticating!', error);
      });
    }
  }

})