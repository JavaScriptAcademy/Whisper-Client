// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers','starter.roomListCtrl'
  ,'starter.newRoomCtrl','starter.recentChatsCtrl','starter.roommanagement'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('app.roomlist', {
      url: '/roomlist',
      views: {
        'menuContent': {
          templateUrl: 'roomList/views/roomList.html',
          controller: 'RoomListCtrl',
        }
      }
    })

  .state('app.newroom', {
    url: '/newroom',
    views: {
      'menuContent': {
        templateUrl: 'roomList/views/newRoom.html',
        controller: 'NewRoomCtrl',
        controllerAs: 'vm',
      }
    }
  })
  .state('app.recentchats', {
    url: '/recent',
    views: {
      'menuContent': {
        templateUrl: 'roomList/views/recentChats.html',
        controller: 'RecentChatsCtrl',
      }
    }
  })
  .state('app.management', {
    url: '/management',
    views: {
      'menuContent': {
        templateUrl: 'roomList/views/roomManagement.html',
        controller: 'RoomManagement',
      }
    }
  })

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.room', {
    url: '/chatRoom/:roomId',
    views: {
      'menuContent': {
        templateUrl: 'templates/chattingRoom.html',
        controller: 'MessagesControl'
      }
    }

  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/roomlist');
});
