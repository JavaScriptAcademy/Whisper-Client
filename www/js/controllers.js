angular.module('starter.controllers', ['starter.services','ngCookies'])

.controller('AppCtrl',function( $rootScope, $scope, $cookies, $ionicModal, $timeout,loginService ,$state) {

  var socket = io('http://localhost:3030');
  var app = feathers()
  .configure(feathers.socketio(socket))
  .configure(feathers.hooks())
  // Use localStorage to store our login token
  .configure(feathers.authentication({
    storage: window.localStorage
  }));

  $rootScope.app = app;

  $scope.loginData = {};
  $scope.signUpData = {};
  $scope.currentUser = $cookies.get('user') ? JSON.parse($cookies.get('user')) : null;

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $ionicModal.fromTemplateUrl('templates/signup.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.signUpModal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };
  $scope.closeSignup = function() {
    $scope.signUpModal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  $scope.signup = function() {
    $scope.signUpModal.show();
  };

  $scope.logout = function() {
    $rootScope.app.logout();
    $cookies.remove('user');
    $scope.currentUser = null;
  };



  const userService = app.service('users');
  userService.on('created',function(){
  });

  $scope.doSignUp = function(){
    var newUser = $scope.signUpData;

    loginService.generateRandomUser(function(user) {
      loginService.CreateNewUser({
        email: newUser.email,
        password: newUser.password,
        nickname:  user.results[0].name.first + ' ' + user.results[0].name.last,
        profileImage: user.results[0].picture.thumbnail
      }, function(user) {
        $cookies.put('user', JSON.stringify(user));
        $scope.currentUser = JSON.parse($cookies.get('user'));
        console.log( $scope.currentUser);
        $state.go('app.roomlist');
        $scope.closeSignup();
      });
    });

    $scope.doLogin= function(){
      var user = $scope.loginData;

      loginService.onLogin({
        email:user.email,
        password: user.password
      }, function(res) {
        console.log(res)
      })
    }

  }

  $scope.doLogin = function(){
    var loginUser = $scope.signUpData;
    loginService.onLogin({email:loginUser.email,password:loginUser.password});

  }


})

.directive('input', function($timeout) {
  return {
    restrict: 'E',
    scope: {
      'returnClose': '=',
      'onReturn': '&',
      'onFocus': '&',
      'onBlur': '&'
    },
    link: function(scope, element, attr) {
      element.bind('focus', function(e) {
        if (scope.onFocus) {
          $timeout(function() {
            scope.onFocus();
          });
        }
      });
      element.bind('blur', function(e) {
        if (scope.onBlur) {
          $timeout(function() {
            scope.onBlur();
          });
        }
      });
      element.bind('keydown', function(e) {
        if (e.which == 13) {
          if (scope.returnClose) element[0].blur();
          if (scope.onReturn) {
            $timeout(function() {
              scope.onReturn();
            });
          }
        }
      });
    }
  }
})

.controller('MessagesControl', function($rootScope, $scope, $state, $timeout, 
  $ionicScrollDelegate,awesomeService, Sounds, $ionicHistory) {
  $scope.messages = [];
  $scope.roomName=$state.params.roomName;
  var rooms = $rootScope.app.service('rooms');



  // record service


  $scope.sound = {name:""};

  $scope.saveSound = function() {
    console.log('trying to save '+$scope.sound.name);

    //Simple error checking
    if($scope.sound.name === "") {
      navigator.notification.alert("Name this sound first.", null, "Error");
      return;
    }

    if(!$scope.sound.file) {
      navigator.notification.alert("Record a sound first.", null, "Error");
      return;
    }

    Sounds.save($scope.sound).then(function() {
      $ionicHistory.nextViewOptions({
        disableBack: true
      });
      $state.go("home");
    });
  }

  var captureError = function(e) {
    console.log('captureError' ,e);
  }

  var captureSuccess = function(e) {
    console.log('captureSuccess');
    console.dir(e);
    $scope.sound.file = e[0].localURL;
    $scope.sound.filePath = e[0].fullPath;
    $state.go("home");
  }

  $scope.record = function() {
    navigator.device.capture.captureAudio(
      captureSuccess,captureError,{duration:120});
    console.log("Recording...");
  }

  $scope.play = function() {
    if(!$scope.sound.file) {
      navigator.notification.alert("Record a sound first.", null, "Error");
      return;
    }
    var media = new Media($scope.sound.file, function(e) {
      media.release();
    }, function(err) {
      console.log("media err", err);
    });
    media.play();
  }
  // end of record service


  awesomeService.GetAllMessage($state.params.roomId, function(response) {
    $scope.topic = response.topic;
    $scope.roomName = response.name;
    $scope.messages = response.messages;
  });

/*
* #Switch between text message and voice message
* Added by Cyrus 4.24
*/
$scope.isVideo = true;
$scope.isRecording = false;
$scope.switch = function(){
  $scope.isVideo = !$scope.isVideo;
  $scope.isRecording = false;
}

$scope.startRecord = function(){
  $scope.isRecording = !$scope.isRecording;
  $scope.record();
}
$scope.stopRecord = function(){
  console.log('test');

  $scope.saveSound();
  console.log($scope.sound.file);
    //TODO: call function to send record to server
    //insert record message to server
    var newMessage = {
     text:'TODO: real file path',
     type:'voice',
     userId:$scope.currentUser._id,
     userNickname:$scope.currentUser.nickname,
     userProfileImage:$scope.currentUser.profileImage
   }
   rooms.update({
    _id:$state.params.roomId
  },{
    $push:{
      messages:newMessage
    }
  }).then(function (message){console.log(message)} );
   $scope.isRecording = !$scope.isRecording;
 }

 rooms.on('updated', function(message) {
  awesomeService.GetAllMessage($state.params.roomId, function(responses) {
    $scope.messages = responses.messages;
  });

  $timeout(function() {
    $ionicScrollDelegate.scrollBottom(true);
  }, 300);
});

 $scope.hideTime = true;
 var alternate,
 isIOS = ionic.Platform.isWebView() && ionic.Platform.isIOS();

 $scope.sendMessage = function() {
  alternate = !alternate;

  var newMessage = {
   text:$scope.data.message,
   type:'text',
   userId:$scope.currentUser._id,
   userNickname:$scope.currentUser.nickname,
   userProfileImage:$scope.currentUser.profileImage
 }
 rooms.update({
  _id:$state.params.roomId
},{
  $push:{
    messages:newMessage
  }
}).then(function(message) { console.log(message) });

 $scope.data.message;
 $ionicScrollDelegate.scrollBottom(true);

};


$scope.inputUp = function() {
  if (isIOS) $scope.data.keyboardHeight = 216;
  $timeout(function() {
    $ionicScrollDelegate.scrollBottom(true);
  }, 300);

};

$scope.inputDown = function() {
  if (isIOS) $scope.data.keyboardHeight = 0;
  $ionicScrollDelegate.resize();
};

$scope.closeKeyboard = function() {
    // cordova.plugins.Keyboard.close();
  };


  $scope.data = {};
  $scope.myId = '12345';

  $timeout(function() {
    $ionicScrollDelegate.scrollBottom(true);
  }, 300);

})
.controller('menuControl', function( $scope, $state) {

})
.controller('HomeCtrl', function($scope, Sounds, $ionicPlatform) {

  var getSounds = function() {
    console.log('getSounds called');
    Sounds.get().then(function(sounds) {
      console.dir(sounds);
      $scope.sounds = sounds;
    });
  }

  $scope.$on('$ionicView.enter', function(){
    console.log('enter');
    getSounds();
  });

  $scope.play = function(x) {
    console.log('play', x);
    // Sounds.play(x);
    Sounds.get().then(function(sounds) {
      var sound = sounds[x];
      console.log(sound);

        /*
        Ok, so on Android, we just work.
        On iOS, we need to rewrite to ../Library/NoCloud/FILE
        */
        var mediaUrl = sound.file;

        // if(device.platform.indexOf("iOS") >= 0) {
        //   mediaUrl = "../Library/NoCloud/" + mediaUrl.split("/").pop();
        // }
        var media = new Media(mediaUrl, function(e) {
          media.release();
        }, function(err) {
          console.log("media err", err);
        });
        media.play();
      });

  }

  $scope.devare = function(x) {
    console.log('devare', x);
    Sounds.get().then(function(sounds) {
      var toDie = sounds[x];
      window.resolveLocalFileSystemURL(toDie.file, function(fe) {
        fe.remove(function() {
          Sounds.devare(x).then(function() {
            getSounds();
          });
        }, function(err) {
          console.log("err cleaning up file", err);
        });
      });
    });
  }

  $scope.cordova = {loaded:false};
  $ionicPlatform.ready(function() {
    $scope.$apply(function() {
      $scope.cordova.loaded = true;
    });
  });

});


