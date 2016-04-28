angular.module('starter.newRoomCtrl', ['ionic','starter.roomlistservice'])

.controller('NewRoomCtrl', function($rootScope,$scope,$state,roomListService) {
  $scope.room = {};
  $scope.image_src = '../img/ionic.png';

  $scope.enterRoom =  function(room){
    //insert user into rooms.members
    let newMember = $scope.currentUser;
    roomListService.addNewMember({
      room : room,
      userId : newMember._id
    },(res)=>{
      console.log(res);
    })
    $state.go('app.room',{roomId: room._id});
  };
  $scope.uploadFile = function(){
    //get file from filePath
    var file = $scope.myFile;

    console.log('file is ' );
    console.dir(file);

    var uploadUrl = "/fileUpload";
    voiceService.uploadFileToUrl(file, uploadUrl);
  };

  $scope.createNewRoom = function(){
    var newRoom = {
      'name': $scope.room.name,
      'discription': $scope.room.discription,
      'topic': $scope.room.topic,
      'ownerId': $scope.currentUser,
    };
    roomListService.CreateRoom(newRoom,(response)=>{
      let newMember = $scope.currentUser;
      $scope.room = {};
      roomListService.addNewMember({
        room : response,
        userId : newMember._id
      },(res)=>{
        console.log(res);
      })
      $state.go('app.room',{roomId: response._id});
    });
  };


});