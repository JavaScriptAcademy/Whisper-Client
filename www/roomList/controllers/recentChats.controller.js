angular.module('starter.recentChatsCtrl', ['ionic','starter.roomlistservice'])

.controller('RecentChatsCtrl', function($rootScope,$scope,$state,roomListService) {
  var roomsService = $rootScope.app.service('rooms');
  function setRooms(res){
    console.log('set rooms start',res);
    $scope.rooms = res.data;
  };
  var currentUser = $scope.currentUser;
  roomListService.GetRecentVisit(currentUser._id,setRooms);


});