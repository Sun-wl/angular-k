app.controller('SendCode', function($scope, httpService) {
    $scope.text = '获取验证码'

    $scope.sendCode = function(type) {
        if(!/^1[345678]\d{9}$/.test($scope.form.mobile)) {
            alert("请输入正确的手机号")
            return
        }
        var c = 59;
        $scope.text = "60s";
        var t = setInterval(function() {
            $scope.text = c+"s";
            if(c==0){
                clearInterval(t);
                c=60;
                $scope.text = '获取验证码';
            }
            c--;
            $scope.$apply();
        }, 1000);

        var _opts = {
            url: "captcha/sendSMS",
            params : {
                'mobile': $scope.form.mobile,
                'type': type
            },
            success : function(result){
                if(result.statusCode != 200){
                    clearInterval(t);
                    c=60;
                    $scope.text = '获取验证码';
                    $scope.$apply();
                    alert(result.message)
                }
            },
            error:function(){
                clearInterval(t);
                c=60;
                $scope.text = '获取验证码';
                $scope.$apply();
            },
            checkCodeError : function(){
                clearInterval(t);
                c=60;
                $scope.text = '获取验证码';
                $scope.$apply();
            }
        }

        httpService.sms(_opts);
    };

});