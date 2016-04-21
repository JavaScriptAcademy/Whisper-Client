angular.module('starter.recentChatsCtrl', ['ionic','starter.roomlistservice'])

.controller('RecentChatsCtrl', function($rootScope,$scope,$state,roomListService,$timeout,$ionicScrollDelegate) {
  var roomsService = $rootScope.app.service('rooms');
  var userService = $rootScope.app.service('users');
  var currentUser = $scope.currentUser;

  $scope.enterRoom =  function(room){
    //insert user into rooms.members
    let newMember = $scope.currentUser;
    roomListService.addNewMember({
      room : room,
      userId : newMember._id
    },(res)=>{
      console.log(res);
    })
    $state.go('app.room',{roomId: room.roomId});
  };
  function setRooms(res){
    console.log('set rooms start',res);
    $scope.rooms = res.data;
  };
  userService.on('updated', function(room){
   roomListService.GetRecentVisit(currentUser._id,setRooms);

    $timeout(function() {
      $ionicScrollDelegate.scrollBottom(true);
    }, 300);
  });

  roomListService.GetRecentVisit(currentUser._id,setRooms);
});