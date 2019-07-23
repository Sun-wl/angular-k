/**
 * Created by admin on 2017/5/17.
 */
app.controller("ManageCtrl", function ($scope, httpService, $location, $state) {
    if ($location.$$path.split("/")[3]) {
        if (!$("." + $location.$$path.split("/")[3] + "-li").hasClass("active")) {
            $("." + $location.$$path.split("/")[3] + "-li").addClass("active");
        }
        $("." + $location.$$path.split("/")[3] + "-li>a").addClass("pray");
    } else {
        $(".order-li>a").addClass("pray");
    }
    var _opts = {
        url: "platform/selectAllMemberApp",
        success: function (result) {
            if (result.statusCode == 401) {
                alert("您已退出登录，当前界面会被关闭！");
                $state.go("page.home", {}, {reload: true});
            }
            if (result.statusCode == 200) {
                $scope.apps = result.data;
                $scope.$apply();
            }
        },
        error: function () {
            alert("网络错误");
            $state.go("page.home", {}, {reload: true});
        },
        checkCodeError: function () {

        }
    }
    httpService.httpPost(_opts);
    $scope.toApply = function () {
        $state.go("page.manage.apply", {}, {reload: true});
    }
});
app.controller("OrderCtrl", function ($scope, httpService, $modal) {
    $scope.form = {};
    $scope.currentPage = 1;
    $scope.maxSize = 5;
    $scope.bigTotalItems = 1;
    $scope.start = 0;
    $scope.payStatus = [
        {value: 1, name: '未支付'},
        {value: 2, name: '已支付'},
        {value: 3, name: '支付失败'},
        {value: 4, name: '退款申请'},
        {value: 5, name: '退款处理中'},
        {value: 6, name: '退款成功'}
    ];
    function reload() {
        var _opts = {
            url: "platform/getOrder",
            params: {
                "start": $scope.start,
                "length": 10,
                "orderNo": $scope.form.orderNo,
                "originId": $scope.form.originId,
                "fromMobile": $scope.form.fromMobile,
                "toMobile": $scope.form.toMobile,
                "appKey": $scope.form.appKey,
                "payStatus": $scope.form.payStatus
            },
            success: function (result) {
                $scope.orders = result.data;
                $scope.result = result;
                $scope.bigTotalItems = $scope.result.recordsTotal;
                $scope.lastStart = parseInt($scope.result.recordsTotal / 10) * 10;
                $scope.$apply();
            }
        }
        httpService.httpPost(_opts)
    }

    reload();
    //翻页
    $scope.pageChanged = function () {
        $scope.start = ($scope.currentPage - 1) * 10;
        reload();
    };
    $scope.search = function () {
        reload();
    }

    $scope.open = function (orderNo) {
        var modalInstance = $modal.open({
            templateUrl: 'orderDetail.html',
            controller: 'orderDetailCtrl',
            resolve: {
                orderNo: function () {
                    return orderNo;
                }
            }
        });
    }

});
app.controller("orderDetailCtrl", function ($scope, $modalInstance, $state, httpService, orderNo) {
    var _opts = {
        url: "platform/order/details/" + orderNo,
        success: function (result) {
            if (result.statusCode == 200) {
                $scope.entity = result.data;
            }
        },
        checkCodeError: function () {

        }
    }
    httpService.http(_opts);
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});

app.controller("ApplyDetailCtrl", function ($scope, $modal, $stateParams, $state, httpService) {
    $scope.entity = {}
    $scope.key = undefined;
    if ($stateParams.key) {
        $scope.key = $stateParams.key;
        var _opts = {
            url: "platform/selectOneMemberApp",
            params: {
                "appKey": $scope.key
            },
            success: function (result) {
                $scope.entity = result.data;
                $scope.$apply();
            }
        }
        httpService.httpPost(_opts);
    }

    $scope.save = function () {
        if (!$scope.entity.name) {
            alert("请输入应用名称");
            return
        }
        if (!$scope.entity.stateCallback) {
            alert("请输入回调地址");
            return
        }
        // if(!/^(http|https?):\/\/[\w\-]+(\.[\w\-]+)+([\w\-\.,@?^=%&:\/~\+#]*[\w\-\@?^=%&\/~\+#])?$/.test($scope.entity.stateCallback)){
        //     alert("回调地址格式不正确！");
        //     return
        // }
        var _opts = {
            url: "platform/saveOrUpdateApp",
            params: {
                "appKey": $scope.key,
                "name": $scope.entity.name,
                "remark": $scope.entity.remark,
                "stateCallback": $scope.entity.stateCallback
            },
            success: function (result) {
                if (result.statusCode == 200) {
                    $state.go("page.manage.apply", {}, {reload: true});
                } else {
                    alert(result.message);
                }


            }
        }
        httpService.httpPost(_opts);

    }
    $scope.delApply = function (key) {
        if (confirm("确定删除？")) {
            var _opts = {
                url: "platform/delectByAppKey",
                params: {
                    "appKey": key
                },
                success: function () {
                    $state.go("page.manage.apply", {}, {reload: true});
                }
            }
            httpService.httpPost(_opts);
        }

    }

});
app.controller("shopCtrl", function ($scope, httpService) {
    $scope.form = {};
    $scope.currentPage = 1;
    $scope.maxSize = 5;
    $scope.bigTotalItems = 1;
    $scope.start = 0;
    function reload() {
        var _opts = {
            url: "store/list",
            params: {
                "start": $scope.start,
                "length": 10,
                "entity.originShopId": $scope.form.originShopId,
                "entity.name": $scope.form.name,
                "entity.contact": $scope.form.contact,
                "entity.mobile": $scope.form.mobile
            },
            success: function (result) {
                $scope.shops = result.data;
                $scope.result = result;
                $scope.bigTotalItems = $scope.result.recordsTotal;
                $scope.lastStart = parseInt($scope.result.recordsTotal / 10) * 10;

            }
        }
        httpService.http(_opts)
    }

    reload();
    //翻页
    $scope.pageChanged = function () {
        $scope.start = ($scope.currentPage - 1) * 10;
        reload();
    };
    $scope.search = function () {
        reload();
    }

});
app.controller("shopAddCtrl", function ($scope, $modal, $state, httpService, $stateParams) {
    $scope.entity = {};
    $scope.map = new AMap.Map('container', {
        resizeEnable: true,
        zoom: 13,
        center: [116.397428, 39.90923]
    });

    AMap.plugin(['AMap.Autocomplete', 'AMap.PlaceSearch', "AMap.MouseTool", 'AMap.Geocoder'], function () {
        //地址输入提示
        $scope.autocomplete = new AMap.Autocomplete({
            citylimit: true,
            city: $scope.entity.areaCode ? $scope.entity.areaCode : $scope.entity.city,
            input: "address"//使用联想输入的input的id
        });
        //地址搜索
        $scope.PlaceSearch = new AMap.PlaceSearch({
            citylimit: true,
            city: $scope.entity.areaCode ? $scope.entity.areaCode : $scope.entity.city
        });
        //点标注
        $scope.marker = new AMap.Marker({
            map: $scope.map,
            icon: new AMap.Icon({
                image: 'img/clickPosition.png',
                imageSize: new AMap.Size(18, 25)
            }),
            position: [121.602751, 31.266768]
        });
        $scope.marker.hide();
        //地址经纬度
        $scope.geocoder = new AMap.Geocoder({
            city: $scope.entity.city//城市，默认：“全国”
        });
        //输入后搜索
        AMap.event.addListener($scope.autocomplete, "select", function (e) {
            $scope.marker.show();
            $scope.map.setZoom(16);
            $scope.map.setCenter(e.poi.location);
            $scope.marker.setPosition(e.poi.location);

            $scope.entity.address = e.poi.name;
            $scope.entity.point = e.poi.location;
        });

        //点击选地址
        $scope.map.on('click', function (e) {
            $scope.marker.show();
            $scope.marker.setPosition(e.lnglat);
            $scope.entity.point = e.lnglat;
            $scope.geocoder.getAddress(e.lnglat, function (status, result) {
                if (status == 'complete') {
                    $scope.entity.address = result.regeocode.formattedAddress;
                    $scope.$apply();
                } else {
                    $("#address").attr("placeholder", '无法获取地址')
                }
            })

        })


    });

    $scope.addressChange = function () {
        $scope.entity.point = '';
        $scope.marker.hide();
    }
    $scope.getArea = function () {
        $scope.map.setCity($scope.entity.city);
        AMap.service('AMap.DistrictSearch', function () {//回调函数
            //实例化DistrictSearch
            $scope.districtSearch = new AMap.DistrictSearch({
                level: 'province',
                subdistrict: 2
            });
            $scope.districtSearch.search($scope.entity.city, function (status, result) {
                if ($scope.entity.city == '021') {
                    $scope.areaNameList = result.districtList[0].districtList[0].districtList;
                } else {
                    $scope.areaNameList = result.districtList;
                }
                $scope.$apply();
            })
        })
    }
    $scope.cityChange = function () {
        $scope.getArea();
        $scope.entity.areaName = '';
        $scope.entity.address = '';
        $scope.entity.point = '';
        $scope.marker.hide();
    }
    $scope.areaChange = function () {
        $scope.areaNameList.forEach(function (i) {
            if (i.name == $scope.entity.areaName) {
                $scope.entity.areaCode = i.adcode;
            }
        })
        $scope.map.setCity($scope.entity.areaCode);
        $scope.entity.address = '';
        $scope.entity.point = '';
        $scope.marker.hide();
    }
    $scope.save = function () {
        if (!$scope.entity.originShopId) {
            alert('请输入门店编码');
            return
        }
        if (!$scope.entity.name) {
            alert('请输入门店名称');
            return
        }
        if (!$scope.entity.contact) {
            alert('请输入联系人');
            return
        }
        if (!$scope.entity.mobile) {
            alert('请输入联系方式');
            return
        }
        if (!/^1[345678]\d{9}$/.test($scope.entity.mobile)) {
            alert("请输入正确的联系方式");
            return
        }
        if (!$scope.entity.city) {
            alert('请选择城市');
            return
        }
        if (!$scope.entity.areaName) {
            alert('请选择区域');
            return
        }
        if (!$scope.entity.address) {
            alert('请输入详细地址');
            return
        }
        if (!$scope.entity.point) {
            alert('请选择正确的详细地址，使地图有红色标记方可保存！');
            return
        }
        var _opts = {
            url: 'store/save',
            params: {
                'entity.id': $scope.entity.id,
                "entity.originShopId": $scope.entity.originShopId,
                "entity.name": $scope.entity.name,
                "entity.contact": $scope.entity.contact,
                "entity.mobile": $scope.entity.mobile,
                "entity.city": $scope.entity.city,
                "entity.areaName": $scope.entity.areaName,
                "entity.address": $scope.entity.address,
                "entity.addrDetail": $scope.entity.addrDetail,
                "entity.point": $scope.entity.point
            },
            success: function (result) {
                if (result.statusCode == 200) {
                    $state.go('page.manage.shop', {}, {reload: true})
                } else {
                    alert(result.message);
                }
            },
            checkCodeError: function () {

            }
        }
        httpService.httpPost(_opts);
    }

    if ($stateParams.id && $stateParams.city) {
        $scope.entity.city = $stateParams.city;
        $scope.getArea();
        var _opts = {
            url: "store/details/" + $stateParams.id,
            success: function (result) {
                $scope.entity = result.data;
                if ($scope.entity.point) {
                    $scope.marker.show();
                    $scope.map.setZoom(16);
                    $scope.map.setCenter($scope.entity.point.split(","));
                    $scope.marker.setPosition($scope.entity.point.split(","));
                }
            }
        }
        setTimeout(function () {
            httpService.http(_opts);
        }, 1000)

    } else {
        $scope.map.setCity('上海');
    }

});
app.controller("infoCtrl", function ($scope, httpService) {
    $scope.entity = {}
    var _opts = {
        url: "member/details",
        success: function (result) {
            $scope.entity = result.data;

        }
    }
    httpService.http(_opts);


});
app.controller("updateInfoCtrl", function ($scope, httpService, $state) {
    $scope.entity = {};
    var _opts = {
        url: "member/details",
        success: function (result) {
            $scope.entity = result.data;

        }
    }
    httpService.http(_opts);

    $scope.save = function () {
        var _opt = {
            url: "member/update/info",
            params:{
                "name":$scope.entity.name,
                "address":$scope.entity.address,
                "contact":$scope.entity.contact
            },
            success: function (result) {
                $state.go('page.manage.info',{},{reload:true});
            }
        }
        httpService.httpPost(_opt);
    }

});
app.controller("updatePasswordCtrl", function ($scope, httpService, $state) {
    $scope.form = {};
    $scope.save = function () {
        if(!$scope.form.passwordOld){
            alert("请输入原密码");
            return
        }
        if(!$scope.form.passwordNew){
            alert("请输入新密码");
            return
        }
        if(!$scope.form.confirm){
            alert("请确认新密码");
            return
        }
        if($scope.form.passwordNew.length < 6){
            alert("密码不能少于6位");
            return
        }
        if($scope.form.passwordNew != $scope.form.confirm){
            alert("两次新密码不统一");
            return
        }
        var _opt = {
            url: "member/update/password",
            params:{
                "passwordOld":$scope.form.passwordOld,
                "passwordNew":$scope.form.passwordNew
            },
            success: function (result) {
                if(result.statusCode == 200){
                    alert("修改成功");
                    $state.go('page.manage.updatePassword',{},{reload:true});
                }else{
                    alert(result.message);
                }
            },
            checkCodeError:function () {

            }
        }
        httpService.httpPost(_opt);
    }

});
