angular.module('starter.recentChatsCtrl', ['ionic','starter.roomlistservice'])

.controller('RecentChatsCtrl', function($rootScope,$scope,$state,roomListService) {
  var roomsService = $rootScope.app.service('rooms');

  //init all room list
  var rooms = [];
  roomListService.GetAllRooms((response) => {
    rooms = response.data.data;
  });
  console.log('rooms',rooms);

});