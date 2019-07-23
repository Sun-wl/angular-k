'use strict';
/**
 * Config for the router
 */
angular.module('app')
    .run(
        ['$rootScope', '$state', '$stateParams',
            function ($rootScope, $state, $stateParams) {
                $rootScope.$state = $state;
                $rootScope.$stateParams = $stateParams;
            }
        ]
    )
    .config(
        ['$stateProvider', '$urlRouterProvider',
            function ($stateProvider, $urlRouterProvider) {

                $urlRouterProvider
                    .otherwise('/page/home');
                $stateProvider
                    .state('page', {
                        url: '/page',
                        templateUrl:function () {
                            return 'tpl/page.html?' + +new Date();
                        },
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function (uiLoad) {
                                    return uiLoad.load([
                                        'js/main.js',
                                        'common/services/httpService.js',
                                        'common/controller/table.js',
                                        'common/controller/sendcode.js',
                                        'common/controller/login.js'
                                    ]);
                                }]
                        }
                    })
                    .state('page.home', {
                        url: '/home',
                        templateUrl:function () {
                            return 'tpl/home/home.html?' + +new Date();
                        },
                        reload:true
                    })
                    .state('page.guide', {
                        url: '/guide',
                        templateUrl:function () {
                            return 'tpl/guide/guide.html?' + +new Date();
                        },
                        reload:true
                    })
                    .state('page.reset', {
                        url: '/reset',
                        templateUrl:function () {
                            return 'tpl/guide/tenant/reset.html?' + +new Date();
                        },
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function (uiLoad) {
                                    return uiLoad.load([
                                        'common/controller/register.js'
                                    ]);
                                }]
                        },
                        reload:true
                    })
                    .state('page.tenantRegister1', {
                        url: '/tenantRegister1',
                        templateUrl:function () {
                            return 'tpl/guide/tenant/tenantRegister1.html?' + +new Date();
                        },
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function (uiLoad) {
                                    return uiLoad.load([
                                        'common/controller/register.js'
                                    ]);
                                }]
                        },
                        reload:true
                    })
                    .state('page.tenantRegister2', {
                        url: '/tenantRegister2',
                        templateUrl:function () {
                            return 'tpl/guide/tenant/tenantRegister2.html?' + +new Date();
                        },
                        params: {uuid:null,mobile:null,password:null,code:null},
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function (uiLoad) {
                                    return uiLoad.load([
                                        'common/controller/register.js'
                                    ]);
                                }]
                        },
                        reload:true
                    })
                    .state('page.tenantRegister3', {
                        url: '/tenantRegister3',
                        templateUrl:function () {
                            return 'tpl/guide/tenant/tenantRegister3.html?' + +new Date();
                        },
                        params: {uuid:null,mobile:null,password:null,code:null,name:null,address:null,contact:null,contactMobile:null},
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function (uiLoad) {
                                    return uiLoad.load([
                                        'common/controller/register.js'
                                    ]);
                                }]
                        },
                        reload:true
                    })
                    .state('page.requireUrl', {
                        url: '/requireUrl',
                        templateUrl:function () {
                            return 'tpl/guide/tenant/requireUrl.html?' + +new Date();
                        },
                        reload:true
                    })
                    .state('page.document', {
                        url: '/document',
                        templateUrl:function () {
                            return 'tpl/document/document.html?' + +new Date();
                        },
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function (uiLoad) {
                                    return uiLoad.load([
                                        'common/controller/document.js'
                                    ]);
                                }]
                        },
                        reload:true
                    })
                    .state('page.document.developKnow', {
                        url: '/developKnow',
                        templateUrl:function () {
                            return 'tpl/document/documentBody/developKnow.html?' + +new Date();
                        },
                        reload:true
                    })
                    .state('page.document.developPortRule', {
                        url: '/developPortRule',
                        templateUrl:function () {
                            return 'tpl/document/documentBody/developPortRule.html?' + +new Date();
                        },
                        reload:true
                    })
                    .state('page.document.developPortCode', {
                        url: '/developPortCode',
                        templateUrl:function () {
                            return 'tpl/document/documentBody/developPortCode.html?' + +new Date();
                        },
                        reload:true
                    })
                    .state('page.document.orderNew', {
                        url: '/orderNew',
                        templateUrl:function () {
                            return 'tpl/document/documentBody/orderNew.html?' + +new Date();
                        },
                        reload:true
                    })
                    .state('page.document.orderAddFee', {
                        url: '/orderAddFee',
                        templateUrl:function () {
                            return 'tpl/document/documentBody/orderAddFee.html?' + +new Date();
                        },
                        reload:true
                    })
                    .state('page.document.orderCallback', {
                        url: '/orderCallback',
                        templateUrl:function () {
                            return 'tpl/document/documentBody/orderCallback.html?' + +new Date();
                        },
                        reload:true
                    })
                    .state('page.document.simulateTaking', {
                        url: '/simulateTaking',
                        templateUrl:function () {
                            return 'tpl/document/documentBody/simulateTaking.html?' + +new Date();
                        },
                        reload:true
                    })
                    .state('page.document.simulatePickup', {
                        url: '/simulatePickup',
                        templateUrl:function () {
                            return 'tpl/document/documentBody/simulatePickup.html?' + +new Date();
                        },
                        reload:true
                    })
                    .state('page.document.simulateFinish', {
                        url: '/simulateFinish',
                        templateUrl:function () {
                            return 'tpl/document/documentBody/simulateFinish.html?' + +new Date();
                        },
                        reload:true
                    })
                    .state('page.document.simulateCancel', {
                        url: '/simulateCancel',
                        templateUrl:function () {
                            return 'tpl/document/documentBody/simulateCancel.html?' + +new Date();
                        },
                        reload:true
                    })
                    .state('page.document.orderStatusQuery', {
                        url: '/orderStatusQuery',
                        templateUrl:function () {
                            return 'tpl/document/documentBody/orderStatusQuery.html?' + +new Date();
                        },
                        reload:true
                    })
                    .state('page.document.orderCancel', {
                        url: '/orderCancel',
                        templateUrl:function () {
                            return 'tpl/document/documentBody/orderCancel.html?' + +new Date();
                        },
                        reload:true
                    })
                    .state('page.document.orderCancelReason', {
                        url: '/orderCancelReason',
                        templateUrl:function () {
                            return 'tpl/document/documentBody/orderCancelReason.html?' + +new Date();
                        },
                        reload:true
                    })
                    .state('page.document.tenantCityList', {
                        url: '/tenantCityList',
                        templateUrl:function () {
                            return 'tpl/document/documentBody/tenantCityList.html?' + +new Date();
                        },
                        reload:true
                    })
                    .state('page.document.tenantShopAdd', {
                        url: '/tenantShopAdd',
                        templateUrl:function () {
                            return 'tpl/document/documentBody/tenantShopAdd.html?' + +new Date();
                        },
                        reload:true
                    })
                    .state('page.document.tenantShopUpdate', {
                        url: '/tenantShopUpdate',
                        templateUrl:function () {
                            return 'tpl/document/documentBody/tenantShopUpdate.html?' + +new Date();
                        },
                        reload:true
                    })
                    .state('page.document.tenantShopDetail', {
                        url: '/tenantShopDetail',
                        templateUrl:function () {
                            return 'tpl/document/documentBody/tenantShopDetail.html?' + +new Date();
                        },
                        reload:true
                    })
                    .state('page.document.updateLog', {
                        url: '/updateLog',
                        templateUrl:function () {
                            return 'tpl/document/documentBody/updateLog.html?' + +new Date();
                        },
                        reload:true
                    })
                    .state('page.document.question', {
                        url: '/question',
                        templateUrl:function () {
                            return 'tpl/document/documentBody/question.html?' + +new Date();
                        },
                        reload:true
                    })
                    .state('page.manage', {
                        url: '/manage',
                        templateUrl:function () {
                            return 'tpl/manage/manage.html?' + +new Date();
                        },
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function (uiLoad) {
                                    return uiLoad.load([
                                        'common/controller/manage.js'
                                    ]);
                                }]
                        },
                        reload:true
                    })
                    .state('page.manage.order', {
                        url: '/order',
                        templateUrl:function () {
                            return 'tpl/manage/manageBody/order.html?' + +new Date();
                        },
                        reload:true
                    })
                    .state('page.manage.apply', {
                        url: '/apply',
                        templateUrl:function () {
                            return 'tpl/manage/manageBody/apply.html?' + +new Date();
                        },
                        reload:true
                    })
                    .state('page.manage.applyDetail', {
                        url: '/applyDetail',
                        templateUrl:function () {
                            return 'tpl/manage/manageBody/applyDetail.html?' + +new Date();
                        },
                        params:{key:null},
                        reload:true
                    })
                    .state('page.manage.shop', {
                        url: '/shop',
                        templateUrl:function () {
                            return 'tpl/manage/manageBody/shop.html?' + +new Date();
                        },
                        reload:true
                    })
                    .state('page.manage.shopAdd', {
                        url: '/shopAdd',
                        templateUrl:function () {
                            return 'tpl/manage/manageBody/shopAdd.html?' + +new Date();
                        },
                        params:{id:null, city:null},
                        reload:true
                    })
                    .state('page.manage.info', {
                        url: '/info',
                        templateUrl:function () {
                            return 'tpl/manage/manageBody/info.html?' + +new Date();
                        },
                        reload:true
                    })
                    .state('page.manage.updateInfo', {
                        url: '/updateInfo',
                        templateUrl:function () {
                            return 'tpl/manage/manageBody/updateInfo.html?' + +new Date();
                        },
                        reload:true
                    })
                    .state('page.manage.updatePassword', {
                        url: '/updatePassword',
                        templateUrl:function () {
                            return 'tpl/manage/manageBody/updatePassword.html?' + +new Date();
                        },
                        reload:true
                    })
                    .state('page.help', {
                        url: '/help',
                        templateUrl:function () {
                            return 'tpl/help/help.html?' + +new Date();
                        },
                        reload:true
                    })
                    .state('page.help.feedback', {
                        url: '/feedback',
                        templateUrl:function () {
                            return 'tpl/help/helpBody/feedback.html?' + +new Date();
                        },
                        reload:true
                    })
            }
        ]
    );