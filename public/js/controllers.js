/**
 * Created by Sandeep on 16/10/14.
 */
angular.module('com.htmlxprs.autocomplete.controllers',[]).controller('TagController',['$scope',function($scope){
    $scope.$watchCollection('data.tags',function(val){
        console.log(val);
    });
}]);