angular.module('starter.roomlistservice', [])
.factory('roomListService', function($rootScope,$http) {
  let roomsService = $rootScope.app.service('rooms');

  return {
    GetAllRooms:function(successCallback){
      roomsService.find({$sort: { createdAt: -1 } }).then(successCallback);
      // console.log('rooms',rooms);
      // return rooms;
    },
    GetOwnedRooms:function(userId,successCallback){
      $http({
        method: 'GET',
        url: 'http://localhost:3030/rooms/getOwnRooms/'+userId
      }).then(successCallback)
      // roomsService.find({ownerId: userId}).then(successCallback);
    },
    GetRecentVisit:function(userId, successCallback){
      $http({
        method: 'GET',
        url: 'http://localhost:3030/users/getRecentVisit/'+userId
      }).then(successCallback)
    },
    CreateRoom:function(room, successCallback){
      roomsService.create(room).then(successCallback);
      // $http.post('http://localhost:3030/rooms/', room).then(successCallback);
    },
    RemoveRoom:function(roomId,successCallback){
      roomsService.remove(roomId).then(successCallback);
    },
    EditRoom:function(roomId,room,successCallback){
      roomsService.update(roomId,room).then(successCallback);
    },
    addNewMember:function(data, successCallback){
      $http.post('http://localhost:3030/users/resetRecentVisit', data).then(function(res){
        console.log('res',res);
        successCallback(res);
      });
    }

  }
})
