// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('todo', ['ionic','firebase'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});

app.factory('Items', function($firebaseArray){
  var itemsRef = new Firebase('https://golf-tracker.firebaseio.com/');
  return $firebaseArray(itemsRef);
});

app.controller('TodoCtrl',function($scope,Items){
  $scope.items = Items;

  $scope.addItem = function(key){
    if(key.which == 13){
      //take a look at the keyboard event
      // console.log(key);
      $scope.items.$add({
        'name':$scope.newTodo
      });
      $scope.newTodo='';
    }

  };

});

app.controller('tabsCtrl',function($scope){
  $scope.stuff=function(){
    console.log('hello world');
  };
});

app.controller('MapCtrl',function($scope){
  console.log('hellow world the controller is linked up correctly');
  $scope.getGeoLocation = function(){
    var loc = navigator.geolocation.getCurrentPosition(function(data){
      console.log('your current location is: ');
      console.log('latitude: ',data.coords.latitude,'longitude:',data.coords.longitude);
      return data;
    });
    console.log(loc);
  };
});

app.config(function($stateProvider,$urlRouterProvider){
  $stateProvider
    .state('home',{
      url:'/',
      templateUrl:'templates/home.html'
    })
    .state('new-round', {
      url:'/new-round',
      templateUrl:'templates/new-round.html'
    })
    .state('map',{
      url:'/map',
      templateUrl:'templates/map.html',
      controller:'MapCtrl'
    });
  $urlRouterProvider.otherwise('/');
});
