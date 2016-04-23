angular.module('starter.newRoomCtrl', ['ionic','starter.roomlistservice'])

.controller('NewRoomCtrl', function($rootScope,$scope,$state,roomListService) {
  $scope.room = {};
  $scope.image_src = '../img/ionic.png';

  $scope.enterRoom =  function(room){
    //insert user into rooms.members
    var newMember = $scope.currentUser;
    roomListService.addNewMember({
      room : room,
      userId : newMember._id
    }, function(res) {
      console.log(res);
    })
    $state.go('app.room',{roomId: room._id});
  };

  $scope.createNewRoom = function(){
    var newRoom = {
      'name': $scope.room.name,
      'discription': $scope.room.discription,
      'topic': $scope.room.topic,
    };
    roomListService.CreateRoom(newRoom,function(response){
      var newMember = $scope.currentUser;
      $scope.room = {};
      roomListService.addNewMember({
        room : response,
        userId : newMember._id
      },function(res) {
        console.log(res);
      })
      $state.go('app.room',{roomId: response._id});
    });
  };


});