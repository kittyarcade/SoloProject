var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(['$routeProvider', function($routeProvider){
  $routeProvider
  .when('/findpet', {
    templateUrl: 'views/findpet.html',
    controller: 'PetController'
  })
  .when('/login', {
    templateUrl: 'views/login.html',
    controller: 'LoginController'
  })
  .when('/profile', {
    templateUrl: 'views/profile.html',
    controller: 'ProfileController'
  })
  .otherwise({
    redirectTo: 'login'
  });
}]); //end routeProvider

myApp.controller('LoginController',['$scope', '$http', function($scope, $http){
  console.log('Login Controller');
}]); //end LoginController

myApp.controller('PetController', ['$scope', '$http', function($scope, $http){
  console.log('Pet Controller');

  var mykey = config.MY_KEY;
  var secretkey = config.SECRET_KEY;

  //get call to Petfinder
  $scope.getPet=function(){
  var url = 'http://api.petfinder.com/pet.find?animal='+$scope.petType+ "&location="+$scope.zip+"&format=json&key=" + mykey;
$http({
  method: 'GET',
  url: url,
}).then(function(response){
  console.log('GET', response);
  $scope.pets = response.data.petfinder.pets.pet;
});
clearForms();
};

//start POST call
$scope.favorite=function(pet){
  console.log('faved');
  $http.post('/routers', pet)
  .then(function(response){
    console.log('POST Hit!');
  });
}; //end POST


//clears input fields after submit
var clearForms = function(){
  $scope.petType='';
  $scope.zip='';
};

}]);//end PetController

myApp.controller('ProfileController', ['$scope', '$http', function($scope, $http){
  console.log('Profile Controller');
}]);
