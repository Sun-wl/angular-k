'use strict';

app.controller("LoginCtrl", function ($scope, $modal, $rootScope, $location, $state, httpService) {
    if($location.$$path == "/page/home"){
        $(".header-top").css("background","rgba(255,255,255,0.1)");
    }else{
        $(".header-top").css("background","#0D88CC");
    }
    var header = $location.$$path.split("/")[2];
    $(".header-ctn li").removeClass("active");
    $(".header-ctn li." + header + "-li").addClass("active");
    $(".header-ctn").on("click", "li", function () {
        $(".header-ctn li").removeClass("active");
        $(this).addClass("active");
    });
    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
        if ($(".header-ctn button").hasClass("active")) {
            $(".header-ctn button").removeClass("active");
            $(".header-ctn .header-nav").removeClass("off-screen");
        }
    })
    var _opts = {
        url: "member/isLogin",
        success: function (result) {
            $scope.loginCode = result.statusCode;
            if (result.data) {
                $scope.userName = result.data.userName;
            }
            $scope.$apply()
        }
    }
    httpService.httpPost(_opts);

    $scope.open = function (type) {
        if ($(".header-ctn button").hasClass("active")) {
            $(".header-ctn button").removeClass("active");
            $(".header-ctn .header-nav").removeClass("off-screen");
        }
        var modalInstance = $modal.open({
            templateUrl: 'loginModal.html',
            controller: 'LoginDetailCtrl',
            resolve: {
                type: function () {
                    return type;
                }
            }
        });
    }

    $scope.logOut = function () {
        $scope.url = "";
        for (var i = 1; i < $location.$$path.split("/").length; i++) {
            if (i != $location.$$path.split("/").length - 1) {
                $scope.url += $location.$$path.split("/")[i] + ".";
            } else {
                $scope.url += $location.$$path.split("/")[i];
            }
        }
        var _opts = {
            url: "member/loginOut",
            success: function () {
                $state.go($scope.url, {}, {reload: true});
            }
        }
        httpService.httpPost(_opts);
    }

    $scope.toManage = function () {
        if ($scope.loginCode == 200) {
            $state.go("page.manage.order");
        } else {
            $scope.open(1);
        }
    }

    $scope.toReg1 = function () {
        if ($scope.loginCode == 200) {
            alert("您已成为商户！");
        } else {
            $state.go("page.tenantRegister1");
        }
    }

});
app.controller("LoginDetailCtrl", function ($scope, $modalInstance, $state, httpService, $location, type) {
    $scope.form = {};
    $scope.login = function () {
        if (/^1[345678]\d{9}$/.test($scope.form.userName) && $scope.form.password != "") {
            var _opts = {
                url: 'member/login',
                params: {
                    "userName": $scope.form.userName,
                    "password": $scope.form.password
                },
                success: function (result) {
                    if(result.statusCode == 200){
                        if (type == 1) {
                            $state.go("page.manage.order", {}, {reload: true});
                        } else if (type == 2) {
                            $state.go("page.manage.apply", {}, {reload: true});
                        } else if (type == 3) {
                            $scope.url = "";
                            for (var i = 1; i < $location.$$path.split("/").length; i++) {
                                if (i != $location.$$path.split("/").length - 1) {
                                    $scope.url += $location.$$path.split("/")[i] + ".";
                                } else {
                                    $scope.url += $location.$$path.split("/")[i];
                                }
                            }
                            $state.go($scope.url, {}, {reload: true});
                        }
                        $modalInstance.close();
                    }else{
                        alert(result.message);
                    }

                },
                checkCodeError: function (result) {
                    alert(result.message);
                }
            }
            httpService.httpPost(_opts);
        } else {
            alert("请输入正确的信息");
        }
    };
    $scope.toRegister = function () {
        $modalInstance.dismiss('cancel');
        $state.go("page.tenantRegister1");
    };
    $scope.toReset = function () {
        $modalInstance.dismiss('cancel');
        $state.go("page.reset");
    }
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
    $scope.mobileOver = function () {
        if (/^1[345678]\d{9}$/.test($scope.form.userName)) {
            $(".username").blur()
            $(".password").focus();
        }
    }

});