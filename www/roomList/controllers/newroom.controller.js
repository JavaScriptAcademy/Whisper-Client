angular.module('starter.newRoomCtrl', ['ionic','starter.roomlistservice'])

.controller('NewRoomCtrl', function($rootScope,$scope,$state,roomListService) {
  $scope.room = {};
  $scope.image_src = '../img/ionic.png';
  $scope.createNewRoom = function(){
    var newRoom = {
      'name': $scope.room.name,
      'discription': $scope.room.discription,
      'topic': $scope.room.topic,
    };
    roomListService.CreateRoom(newRoom,(response)=>{
      let newMember = $scope.currentUser;
      $scope.room = {};
      console.log('response',response);
      roomListService.addNewMember({
        room : response.data,
        userId : newMember._id
      },(res)=>{
        console.log(res);
      })
      $state.go('app.room',{roomId: response.data._id});
    });
  };


});