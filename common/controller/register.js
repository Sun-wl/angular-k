/**
 * Created by admin on 2017/5/16.
 */
app.controller("RegisterCtrl",function ($scope, $state, $stateParams, httpService) {
    // $(".provision-agree>input").hide();
    // $(".provision-agree>img").click(function () {
    //     $(this).hide();
    //     $(".provision-agree>input").removeAttr("checked");
    //     $(".provision-agree>input").show();
    //     $(".tenant-footer>button.submit").attr("disabled","disabled");
    // })
    // $(".provision-agree>input").click(function () {
    //     $(this).hide();
    //     $(".provision-agree>img").show();
    //     $(".tenant-footer>button.submit").removeAttr("disabled");
    // })
    $scope.form = {};
    $scope.toReg2 = function () {
        if(!$scope.form.mobile){
            alert("请输入手机号");
            return
        }
        if(!/^1[345678]\d{9}$/.test($scope.form.mobile)){
            alert("请输入正确的手机号");
            return
        }
        if($scope.form.password ==""){
            alert("请输入密码");
            return
        }
        if($scope.form.password.length<6){
            alert("密码不能少于6位");
            return
        }
        if(!$scope.form.code){
            alert("请输入验证码");
            return
        }
        var _opts = {
            url:"member/isCaptcha",
            params:{
                "mobile":$scope.form.mobile,
                "code":$scope.form.code
            },
            success:function (result) {
                if(result.statusCode == 200){
                    $state.go("page.tenantRegister2",{
                        uuid:result.data,
                        mobile:$scope.form.mobile,
                        password:$scope.form.password,
                        code:$scope.form.code
                    })
                }else{
                    alert(result.message);
                }
            }
        }
        httpService.httpPost(_opts);

    }
    // $scope.toReg3 = function () {
    //     if($scope.form.name && $scope.form.address && $scope.form.contact && /^1[345678]\d{9}$/.test($scope.form.contactMobile)){
    //         $state.go("page.tenantRegister3",{
    //             uuid:$stateParams.uuid,
    //             mobile:$stateParams.mobile,
    //             password:$stateParams.password,
    //             code:$stateParams.code,
    //             name:$scope.form.name,
    //             address:$scope.form.address,
    //             contact:$scope.form.contact,
    //             contactMobile:$scope.form.contactMobile
    //         })
    //     }else{
    //         alert("请输入正确的信息");
    //     }
    // }
    $scope.reg = function () {
        var _opts = {
            url:"member/register",
            params:{
                "uuid":$stateParams.uuid,
                "mobile":$stateParams.mobile,
                "password":$stateParams.password,
                "code":$stateParams.code,
                "name":$scope.form.name,
                "address":$scope.form.address,
                "contact":$scope.form.contact
            },
            success:function () {
                $state.go("page.home",{},{reload:true});
            },
            checkCodeError:function () {
                
            }
        }
        httpService.httpPost(_opts);
    }
    $scope.resetPass = function () {
        if(/^1[345678]\d{9}$/.test($scope.form.mobile) && $scope.form.password !="" && $scope.form.password.length>=6 && $scope.form.code) {
            var _opts = {
                url: "member/updatePassword",
                params: {
                    "mobile": $scope.form.mobile,
                    "password": $scope.form.password,
                    "code": $scope.form.code
                },
                success: function () {
                    $state.go("page.home", {}, {reload: true});
                },
                checkCodeError: function () {

                }
            }
            httpService.httpPost(_opts);
        }else{
            alert("请输入正确的信息")
        }
    }
});