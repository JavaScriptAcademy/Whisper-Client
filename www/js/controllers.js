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
    let newUser = $scope.signUpData;

    loginService.generateRandomUser((user)=>{
      loginService.CreateNewUser({
        email: newUser.email,
        password: newUser.password,
        nickname:  user.results[0].name.first + ' ' + user.results[0].name.last,
        profileImage: user.results[0].picture.thumbnail
      }, (user) =>{
        $cookies.put('user', JSON.stringify(user));
        $scope.currentUser = JSON.parse($cookies.get('user'));
        console.log( $scope.currentUser);
        $state.go('app.roomlist');
        $scope.closeSignup();
      });
    });

    $scope.doLogin= function(){
      let user = $scope.loginData;

      loginService.onLogin({
        email:user.email,
        password: user.password
      },(res)=>{
        console.log(res)
      })
    }

  }

  $scope.doLogin = function(){
    let loginUser = $scope.signUpData;
    loginService.onLogin({email:loginUser.email,password:loginUser.password});

  }


})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
  { title: 'Reggae', id: 1 },
  { title: 'Chill', id: 2 },
  { title: 'Dubstep', id: 3 },
  { title: 'Indie', id: 4 },
  { title: 'Rap', id: 5 },
  { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
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

.controller('MessagesControl', function($rootScope, $scope, $state, $timeout, $ionicScrollDelegate,awesomeService) {
  $scope.messages = [];
  var rooms = $rootScope.app.service('rooms');

  awesomeService.GetAllMessage($state.params.roomId, (responses) => {
    $scope.messages = responses.messages;
  });

  rooms.on('updated', function(message) {
    awesomeService.GetAllMessage($state.params.roomId, (responses) => {
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

    var d = new Date();
    d = d.toLocaleTimeString().replace(/:\d+ /, ' ');
    let newMessage = {
     text:$scope.data.message,
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
  }).then(message => console.log(message));

   delete $scope.data.message;
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

});
