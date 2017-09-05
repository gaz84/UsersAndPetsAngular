
(function () {
    var app = angular.module("petsApp", ["ngResource", "ngRoute"])

        //routing
        .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

            $locationProvider.html5Mode({
                enabled: true,
                requireBase: false
            });
            var viewBase = '/Views/Users/';
            $routeProvider.when("/users", {
                templateUrl: "/Views/Users/Users.html"
            });

            $routeProvider.when("/pets", {
                templateUrl: "/Views/Users/Pets.html"
            });


            $routeProvider.otherwise({
                redirectTo: '/users'
            });
            
        }])

        //web API Urls 
        .constant("baseUrl", "http://localhost:53244/api/Users")
        .constant("petsUrl", "http://localhost:53244/api/Pets")

        //filters for pagination
        .constant("itemsListPageCount", 3) 
        .filter("paddingRange", function ($filter) {
            return function (data, page, size) {
                if (angular.isArray(data) && angular.isNumber(page) && angular.isNumber(size))
                {
                    var start_index = (page - 1) * size;
                    if (data.length < start_index)
                    { return []; }
                    else {
                        return $filter("limitTo")(data.splice(start_index), size);
                    }
                } else { return data; }
            }
        })
        .filter("pageCount", function () {
            return function (data, size) {
                if (angular.isArray(data))
                {
                    var result = [];
                    for (var i = 0; i < Math.ceil(data.length / size); i++)
                    { result.push(i); }
                    return result;
                }
                else { return data; }
            }
        })

        //controller
        .controller("usersCtrl", function ($scope, $http, $resource, $filter, $location, baseUrl, petsUrl, itemsListPageCount) { 

            //pagination
            $scope.selectedPage = 1;
            $scope.pageSize = itemsListPageCount;
            $scope.selectPage = function (newPage) { $scope.selectedPage = newPage; }

            //**********work with Users**************
                       
            $scope.usersResource = $resource(baseUrl + ":id", { id: "@id" });
            $scope.petsResource = $resource(petsUrl + ":id", { id: "@id" });
           
            // get all users (list)
            $scope.refresh = function () {
                
                $scope.users = $scope.usersResource.query();

            }
            
            // add new user
            $scope.create = function (user) {
                
                                    
                new $scope.usersResource(user).$save().then(function (newUser) {
                    $scope.users.push(newUser);
                    //$location.path("/users");
                    alert("New user " + newUser.UserName + " was added");
                    angular.element('#userName').val('');
                });
            }

            ////// update user
            //$scope.update = function (user) {
            //    user.$save();
            //}

            // delete user
            $scope.delete = function (user) {
                var req = {
                    method: 'DELETE',
                    url: baseUrl + "/" + user.Id,
                    headers: {
                        'Content-Type': undefined
                    },
                    data: { id: user.Id}
                }
                $http(req).then(function () {
                        $scope.users.splice($scope.users.indexOf(user), 1);
                    });

            }

            //**********work with CurrentUser and Pets**************
            $scope.currentUser;

            //show pets of current user
            $scope.showCurrentUser = function (user) {
                $scope.currentUser = user;
                $scope.selectedPage = 1;
                $location.path("/pets");
            }

            //create new pet
            $scope.createNewPet = function (pet) {

                pet.UserId = $scope.currentUser.Id;
                new $scope.petsResource(pet).$save().then(function (newPet) {
                    $scope.currentUser.Pets.push(newPet);
                    alert("New pet " + newPet.PetName + " was added");
                    angular.element('#petName').val('');
                });
            }
            
            //delete pet
            $scope.deletePet = function(pet) {
                
                var req = {
                    method: 'DELETE',
                    url: petsUrl + "/" + pet.Id,
                    headers: {
                        'Content-Type': undefined
                    },
                    data: { id: pet.Id }
                }
                $http(req).then(function () {
                    $scope.currentUser.Pets.splice($scope.currentUser.Pets.indexOf(pet), 1);
                });
            }
            
            $location.path("/users");
            $scope.refresh();
        });
    
})();