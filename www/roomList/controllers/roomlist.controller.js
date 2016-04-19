angular.module('starter.roomListCtrl', ['ionic'])

.controller('RoomListCtrl', function($scope,$state,roomListService) {
  $scope.rooms = [];
  var roomsService = app.service('rooms');

  //init all room list
  roomListService.GetAllRooms((response) => {
    $scope.rooms = response.data.data;
  });

  //listen to rooms events
  roomsService.on('created', function(room){
    $scope.rooms.push(room.messages);
  });
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