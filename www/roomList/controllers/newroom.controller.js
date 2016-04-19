angular.module('starter.newRoomCtrl', ['ionic','starter.roomlistservice'])

.controller('NewRoomCtrl', function($rootScope,$scope,$state,roomListService) {
  $scope.room = {};
  $scope.createNewRoom = function(){
    var newRoom = {
      'name': $scope.room.name,
      'discription': $scope.room.discription,
      'topic': $scope.room.topic,
    };
    roomListService.CreateRoom(newRoom,(response)=>{
      let newMember = $scope.currentUser;
      $scope.room = {};
      roomListService.addNewMember({
        roomId : response.data._id,
        userId : newMember._id
      },(res)=>{
        console.log(res);
      })
      $state.go('app.room',{roomId: response.data._id});
    });
  };


});