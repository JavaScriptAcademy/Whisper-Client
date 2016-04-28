angular.module('starter.roommanagement', ['ionic'])

.controller('RoomManagement', function($rootScope,$scope,$state,roomListService) {
  $scope.rooms = [];
  var roomsService = $rootScope.app.service('rooms');

  //init all room list
  roomListService.GetAllRooms(function(response) {
    $scope.rooms = response.data.data;
  });

  //listen to rooms events
  roomsService.on('created', function(room){
    // $scope.rooms.push(room);
    roomListService.GetAllRooms(function (response){
      $scope.rooms = response.data;
    });

    $timeout(function() {
      $ionicScrollDelegate.scrollBottom(true);
    }, 300);
  });
  $scope.remove = function() {

  };
  $scope.edit = function() {

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
