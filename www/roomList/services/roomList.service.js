angular.module('starter.roomlistservice', [])
.factory('roomListService', function($http) {
  return {
    GetAllRooms:function(successCallback){
      $http({
        method: 'GET',
        url: 'http://localhost:3030/rooms/',
        params: {
          $sort: { createdAt: -1 }
        }
      }).then(successCallback)
    },
    GetRecentVisit:function(userId, successCallback){
      $http({
        method: 'GET',
        url: 'http://localhost:3030/users/getRecentVisit/'+userId,
        params: {
          $sort: { lastVisitTime: -1 }
        }
      }).then(function(res){
        successCallback(res)
      })
    },
    CreateRoom:function(room, successCallback ){
      $http.post('http://localhost:3030/rooms/', room).then(successCallback);
    },
    addNewMember:function(data, successCallback){
      $http.post('http://localhost:3030/users/resetRecentVisit', data).then(function(res){
        successCallback(res);
      });
    }

  }
})