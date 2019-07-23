/**
 * Created by admin on 2017/3/28.
 */
app.directive('imgPre', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        controller:function($scope,$element,$attrs,$transclude){

            $attrs.src = $scope.app.rwtImgPre + $attrs.src;

        }
    };
}]);