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
    CreateRoom:function(room, successCallback ){
      $http.post('http://localhost:3030/rooms/', room).then(successCallback);
    },

  }
})