angular.module('starter.newRoomCtrl', ['ionic','starter.roomlistservice',
  'media.voiceService'])

.controller('NewRoomCtrl', function($rootScope,$scope,$state,roomListService,voiceService) {
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


})
.directive('fileModel', ['$parse', function ($parse) {
  return {
   restrict: 'A',
   link: function(scope, element, attrs) {
    var model = $parse(attrs.fileModel);
    var modelSetter = model.assign;

    element.bind('change', function(){
     scope.$apply(function(){
      modelSetter(scope, element[0].files[0]);
    });
   });
  }
}
}]);