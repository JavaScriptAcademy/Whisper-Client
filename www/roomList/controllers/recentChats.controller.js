angular.module('starter.recentChatsCtrl', ['ionic','starter.roomlistservice'])

.controller('RecentChatsCtrl', function($rootScope,$scope,$state,roomListService) {
  var roomsService = $rootScope.app.service('rooms');

  //init all room list
  var rooms = [];
  var currentUser = $scope.currentUser;
  function setRooms(res){
    rooms = res.visitedRooms;
  }
  roomListService.GetRecentVisit(currentUser._id,setRooms);

});