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

  console.log(  $scope.currentUser  );

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
    loginService.CreateNewUser({
      email: newUser.email,
      password: newUser.password
    }, user=>{
      $cookies.put('user', JSON.stringify(user));
      $scope.currentUser = JSON.parse($cookies.get('user'));
      $state.go('app.roomlist');
      $scope.closeSignup();
    });

  }

  $scope.doLogin = function(){
    let loginUser = $scope.signUpData;
    loginService.onLogin({email:loginUser.email,password:loginUser.password}, ()=>{
      console.log(111);
    })

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


.controller('MessagesControl', function($rootScope, $scope, $timeout, $ionicScrollDelegate,awesomeService) {
  $scope.messages = [];
  // Retrieve a connection to the /messages service on the server
  // This service will use websockets for all communication
  var messages = $rootScope.app.service('messages');

  // Listen for when a new message has been created
  messages.on('created', function(message) {
    console.log('Someone created a message', message);
    console.log($scope.messages);
    $scope.messages.push(message);
    $timeout(function() {
      $ionicScrollDelegate.scrollBottom(true);
    }, 300);
  });


  awesomeService.GetAllMessage(responses => {
    $scope.messages = responses.data.data;
  });

  $scope.hideTime = true;

  var alternate,
  isIOS = ionic.Platform.isWebView() && ionic.Platform.isIOS();

  $scope.sendMessage = function() {
    alternate = !alternate;

    var d = new Date();
    d = d.toLocaleTimeString().replace(/:\d+ /, ' ');

    awesomeService.PostMessage({text:$scope.data.message},response => {
      console.log(response);
    });

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
