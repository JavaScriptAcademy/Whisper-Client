angular.module('starter.roommanagement', ['ionic'])

.controller('RoomManagement', function($rootScope,$scope,$state,$timeout,$ionicScrollDelegate,roomListService) {
  var roomsService = $rootScope.app.service('rooms');
  $scope.rooms = [];
  getOwnedRooms();

  function getOwnedRooms(){
    roomListService.GetOwnedRooms($scope.currentUser._id,(response) => {
      console.log('response',response);
      $scope.rooms = response.data;
    });
    $timeout(function() {
      $ionicScrollDelegate.scrollBottom(true);
    }, 300);
  }

  //init all room list
  // console.log('user',$scope.currentUser);

  //listen to rooms events
  roomsService.on('created', function(room){
   getOwnedRooms();
  });

   roomsService.on('removed', function(room){
    getOwnedRooms();
  });
   roomsService.on('updated', function(room){
    getOwnedRooms();
  });

  $scope.remove = function(roomId) {
    roomListService.RemoveRoom(roomId,(response)=>{
      console.log('remove response',response);
    });
  };
  $scope.edit = function(roomId) {
    $state.go('app.editroom',{roomId: roomId});
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
