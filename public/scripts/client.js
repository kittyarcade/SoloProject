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
  .when('/register', {
    templateUrl: 'views/register.html',
    controller: 'registerController'
  })
  .otherwise({
    redirectTo: 'login'
  });
}]); //end routeProvider

myApp.controller('LoginController',['$scope', '$http', '$window', function($scope, $http, $window){
  console.log('Login Controller');
  $scope.login = function(){

   var userInfo = {
     username: $scope.username,
     password: $scope.password
   };

   $http({
     method: 'POST',
     url: '/auth',
     data: userInfo
   }).then(function successCallback(response) {
     console.log(response);
     $window.location.href = '#!/findpet';
   }, function errorCallback(error) {
     console.log('error', error);
     $window.location.href = '#!/login';
   });
 };
}]); //end LoginController

myApp.controller('registerController',['$scope', '$http', '$window',
  function($scope, $http, $window) {
  console.log('inside register controller');
  $scope.register = function() {
    var userInfo = {
      username: $scope.username,
      password: $scope.password
    };
    $http({
      method: 'POST',
      url: '/register',
      data: userInfo
    }).then(function successCallback(response) {
      console.log('success', response);
      $window.location.href = '#!/login';
    }, function errorCallback(error) {
      console.log('error occurred!');
    });
  };
}]); //end registerController

myApp.controller('PetController', ['$scope', '$http', '$window', function($scope, $http, $window){
  console.log('Pet Controller');

  $scope.goPet = false;

  $scope.toggleBolean = function(variable){
    console.log('variable: ', variable);
    variable = !variable;
    console.log($scope.goPet, variable);
  };// end toggleBolean()

  $scope.checkLogin = function(){
    $http.get('/auth')
      .then(function successCallback(response) {
        console.log('success', response);
      }, function errorCallback(error) {
        console.log('error occurred!');
        $window.location.href = '#!/login';
      });
  };$scope.checkLogin();

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
      swal("Awesome!", "Added to favorites!", "success");
    });
  }; //end POST

  //clears input fields after submit
  var clearForms = function(){
    $scope.petType='select';
    $scope.zip='';
  };
}]);//end PetController

myApp.controller('ProfileController', ['$scope', '$http', '$window', function($scope, $http, $window){
  console.log('Profile Controller');
  $scope.checkLogin = function(){
    $http.get('/auth')
      .then(function successCallback(response) {
        console.log('success', response);
      }, function errorCallback(error) {
        console.log('error occurred!');
        $window.location.href = '#!/login';
      });
  };$scope.checkLogin();
  //GET call to display favorites
  $scope.display = function(){
    console.log('GET');
      $http({
        method:'GET',
        url: '/routers',
      }).then(function(response){
        console.log('GET Response', response.data);
        $scope.favorites = response.data;
      });
  }; //end GET

  //Delete favorites
  $scope.deleteFav = function(petId){
  $http({
    method: 'DELETE',
    url: '/routers/' + petId
  }).then(function(response){
    console.log('Delete success: ', response);
    $scope.display();
  });
};

}]);
