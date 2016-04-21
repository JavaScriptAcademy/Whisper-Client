angular.module('starter.roomListCtrl', ['ionic','starter.roomlistservice'])

.controller('RoomListCtrl', function($rootScope,$scope,$state,$timeout,$ionicScrollDelegate,roomListService) {
  $scope.rooms = [];
  var roomsService = $rootScope.app.service('rooms');

  //init all room list
  roomListService.GetAllRooms((response) => {
    $scope.rooms = response.data;
  });

  //listen to rooms events
  roomsService.on('created', function(room){
    // $scope.rooms.push(room);
   roomListService.GetAllRooms((response) => {
    $scope.rooms = response.data;
    });

    $timeout(function() {
      $ionicScrollDelegate.scrollBottom(true);
    }, 300);
  });

  $scope.enterRoom =  function(room){
    //insert user into rooms.members
    let newMember = $scope.currentUser;
    roomListService.addNewMember({
      room : room,
      userId : newMember._id
    },(res)=>{
      console.log('res',res);
    })
    $state.go('app.room',{roomId: room._id, roomName:room.name});
  };

  //pull to fresh
  $scope.doRefresh = function() {
    console.log('Refreshing!');
    $timeout(function() {
      // $scope.items.push('New Item ' + Math.floor(Math.random() * 1000) + 4);
      //Stop the ion-refresher from spinning
      $scope.$broadcast('scroll.refreshComplete');
    }, 1000);
  };

});