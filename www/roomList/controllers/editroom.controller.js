angular.module('starter.editRoomCtrl', ['ionic','starter.roomlistservice'])

.controller('EditRoomCtrl', function($rootScope,$scope,$state,roomListService) {
  $scope.room = {};
  var roomsService = $rootScope.app.service('rooms');
  console.log('ahhahah');
  getRoom();

  function getRoom(){
    let roomId = $state.params.roomId;
    console.log('$state.params',$state.params);
    roomsService.get(roomId).then((res)=>{
      console.log('res',res);
      $scope.room = res;
    },(res)=>{
      console.log('res');
    })
  };
  $scope.editRoom = function(room){
    // var newRoom = {
    //   'topic': $scope.room.topic,
    // };
    room.topic = $scope.room.topic;

    roomListService.EditRoom($state.params.roomId, room,(response)=>{
      console.log('editroom response',response);
      $state.go('app.management');
    });
  };


})
;