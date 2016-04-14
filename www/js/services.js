angular.module('starter.services', [])
.factory('awesomeService', function($http) {
  return {
    GetUser: function() {
      var url = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22"
      +"shenzhen"
      +"%2C%20"
      +"cn"
      +"%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys"

        return $http.get(url).then(function(response) {
          //Process Stuff Here
          console.log(response);
          return response;
        });
    },
  }
})