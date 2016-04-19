angular.module('starter.newRoomCtrl', ['ionic','starter.roomlistservice'])

.controller('NewRoomCtrl', function($scope,$state,roomListService) {
  $scope.room = {};
  $scope.createNewRoom = function(){
    var newRoom = {
      'name': $scope.room.name,
      'discription': $scope.room.discription,
      'topic': $scope.room.topic,
    };
    roomListService.CreateRoom(newRoom,(response)=>{
      $scope.room = {};
      console.log('create room get response: ', response);
    });
    $state.go('app.room');
  };


});