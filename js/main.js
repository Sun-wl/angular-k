'use strict';

/* Controllers */

angular.module('app')
  .controller('AppCtrl', ['$scope', '$localStorage', '$window','$rootScope',
    function(              $scope,   $localStorage,   $window,$rootScope ) {
      // add 'ie' classes to html
      var isIE = !!navigator.userAgent.match(/MSIE/i);
      isIE && angular.element($window.document.body).addClass('ie');
      isSmartDevice( $window ) && angular.element($window.document.body).addClass('smart');

      $rootScope.$on('$routeChangeStart', function(event, next, current) {
        if (typeof(current) !== 'undefined'){
          $templateCache.remove(current.templateUrl);
        }
      });

      // config
      $scope.app = {
        backendName: '西客开放平台',
        name: '西客开放平台',
        version: 'v1.0.0 版本',
        ctx: '',
        rwtImgPre:'http://img.renwutang.gidoor.com/',
        rateTime: [{name:"立即取货",value:"120"},{name:"预约取货",value:"-2"}],
        settleType: [{name:"请选择",value:"0"},{name:"月结",value:"1"},{name:"单结",value:"2"}],
        projectType: [{name:"同城配送",value:"1"},{name:"生活服务",value:"2"},{name:"维修",value:"3"},{name:"推广",value:"4"},{name:"集散",value:"5"},{name:"其他",value:"6"}],
        goodsType: [{name:"包裹",value:"2"},{name:"外卖",value:"1"},{name:"鲜花",value:"4"},{name:"生鲜",value:"9"}],
        city: [{name:"上海",code:"021",value:"上海"},{name:"深圳",code:"0755",value:"深圳"},{name:"青岛",code:"0532",value:"青岛"},{name:"杭州",code:"0571",value:"杭州"}],
        cityMobile: [{name:"上海",value:"021"},{name:"深圳",value:"0755"},{name:"青岛",value:"0532"},{name:"杭州",value:"0571"}],
        runnerLevel: [{name:"普通佣兵",value:1},{name:"佣兵队长",value:5}],
        gradeOptions: [{name:"5星",value:5}, {name:"4星及以上",value:4}, {name:"3星及以上",value:3}, {name:"2星及以上",value:2}, {name:"无要求",value:1}],
        taskType: [{name:"同城配送",value:1,imgName:'tasktype1'}, {name:"跑腿",value:2,imgName:'tasktype2'}, {name:"维修",value:3,imgName:'tasktype3'}, {name:"保洁",value:4,imgName:'tasktype4'}, {name:"推广",value:5,imgName:'tasktype5'}, {name:"其他",value:6,imgName:'tasktype6'}],
        storeType:[{name:"餐厅",value:1},{name:"水果店",value:2},{name:"咖啡店",value:3},{name:"面包房",value:4},{name:"早餐店",value:5},{name:"鲜花店",value:6},{name:"药店",value:7},{name:"商超",value:8},{name:"洗衣房",value:9},{name:"其他",value:10}],
        rakeType:[{name:"金额",unit:"元",value:1},{name:"比例",unit:"%",value:2}],
        status:[{name:"待审核",value:"1"},{name:"待发布",value:"2"},{name:"已驳回",value:"3"},{name:"报名中",value:"4"},{name:"进行中",value:"5"},{name:"已结束",value:"6"},{name:"已取消",value:"7"}],
        tradeStatus:[{name:"交易成功",value:"1"},{name:"交易取消",value:"2"},{name:"申请中",value:"3"},{name:"处理中",value:"4"},{name:"失败",value:"5"}],
        companyStatus2:[{name:"禁用",value:1},{name:"启用",value:2}],//工会账号
        companyStatus1:[{name:"禁用",value:2},{name:"启用",value:1}],
        accountType:[{name:"支付宝",value:1},{name:"对公账户",value:2}],
        payStatus:[{name:"未支付",value:1},{name:"已支付",value:2},{name:"支付失败",value:3}],
        gender:[{name:"男",value:1},{name:"女",value:2},{name:"",value:3}],
        deviceType:[{name:"IOS",value:1},{name:"安卓",value:2},{name:"微信",value:3},{name:"PC",value:5}],
        releaseType:[{name:"单独发布",value:1},{name:"集合发布",value:2},{name:"",value:0}],
        menuType:[{name:"菜单",value:1},{name:"功能",value:2}],
        workType:[{name:"全职",value:1},{name:"兼职",value:2},{name:"暂未设置",value:3}],
        workTime:[{name:"每日",value:1},{name:"工作日",value:2},{name:"双休日",value:3},{name:"暂不设置",value:4}],
          deliveryArea:[{name:"1.0km",value:"1.0"},{name:"1.5km",value:"1.5"},{name:"2.0km",value:"2.0"},{name:"2.5km",value:"2.5"},{name:"3.0km",value:"3.0"}],
        channel:[{name:"钱包支付",value:"gidoorWallet"},{name:"支付宝扫码",value:"alipayQRcode"},{name:"支付宝",value:"alipay"},{name:"微信支付",value:"wx"},{name:"微信公众号支付",value:"wx_pub"}],
        auditStatus:[{name:"未审核",value:11},{name:"身份证未上传",value:12},{name:"身份证未上传",value:13},{name:"身份证已上传待审核",value:21},
            {name:"身份证已上传待审核",value:22},{name:"身份证已上传待审核",value:23},{name:"已审核",value:31},{name:"已审核",value:32},{name:"已审核",value:33}],
        orderStatus:[{name:"待接单",value:1},{name:"待提货",value:2},{name:"配送中",value:3},{name:"已取消",value:5},{name:"已完成",value:7},{name:"准备中(2)",value:11},{name:"待提货(2)",value:12},{name:"配送中(2)",value:13}],

          // for chart colors
        color: {
          primary: '#7266ba',
          info:    '#3C8DBC',
          success: '#3d9970',//27c24c
          warning: '#f39c12',//fad733
          danger:  '#DD4B39',//f05050
          light:   '#e8eff0',
          dark:    '#3a3f51',
          black:   '#1c2b36'
        },
        settings: {
          themeID: 1,
          navbarHeaderColor: 'bg-black',
          navbarCollapseColor: 'bg-white-only',
          asideColor: 'bg-black',
          headerFixed: true,
          asideFixed: false,
          asideFolded: false,
          asideDock: false,
          container: false,
          light:'light'
        }
      };


      // save settings to local storage
      if ( angular.isDefined($localStorage.settings) ) {
        $scope.app.settings = $localStorage.settings;
      } else {
        $localStorage.settings = $scope.app.settings;
      }
      $scope.$watch('app.settings', function(){
        if( $scope.app.settings.asideDock  &&  $scope.app.settings.asideFixed ){
          // aside dock and fixed must set the header fixed.
          $scope.app.settings.headerFixed = true;
        }
        // save to local storage
        $localStorage.settings = $scope.app.settings;
      }, true);

      function isSmartDevice( $window )
      {
          // Adapted from http://www.detectmobilebrowsers.com
          var ua = $window['navigator']['userAgent'] || $window['navigator']['vendor'] || $window['opera'];
          // Checks for iOs, Android, Blackberry, Opera Mini, and Windows mobile devices
          return (/iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/).test(ua);
      }

  }]);