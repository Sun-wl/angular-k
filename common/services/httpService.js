/**
 * Created by Administrator on 2016/12/12.
 */


/**
 * code 响应变量定义
 * @type {{SUCCESS: number, ERROR: number, SESSION_TIME_OUT: number}}
 */
var CODESTATUS = {
    SUCCESS: 200,
    ERROR: 300,
    TIMEOUT: 301,
    SESSION_TIME_OUT: 401,
    UNAUTHORIZED: 403
};


/**
 * 判断 code
 * @param data
 */
function checkCode(data, opts) {
    var _data;
    var _isCode = true;
    if (!data) {
        _isCode = false;
    } else {
        if (typeof data == "string") {
            if (data.indexOf("code") > -1) {
                _data = jQuery.parseJSON(data);
            } else {
                _isCode = false;
            }
        } else {
            _data = data;
        }
    }

    if (_isCode && (_data.code)) {
        if (_data.code == CODESTATUS.SESSION_TIME_OUT || _data.code == CODESTATUS.TIMEOUT) {// 会话超时
            // 超时处理
            alert("登录超时");
            return false;
        } else if (_data.code == CODESTATUS.ERROR) {
            alert(_data.message);
            if (opts.checkCodeError) {
                opts.checkCodeError(_data.code, _data.message, _data);
            }
            return false;
        } else if (_data.code == CODESTATUS.UNAUTHORIZED) {
            alert(_data.message);
            if (opts.checkCodeError) {
                opts.checkCodeError(_data.code, "您没有权限!", _data);
            }
            return false;
        } else if (_data.code == CODESTATUS.PARAM_IS_ERROR) {

            alert("无效的请求参数");
            if (opts.checkCodeError) {
                opts.checkCodeError(_data.code, "无效的请求参数!", _data);
            }
            return false;
        }
    }
    return true;
}

/**
 * http 自定义封装
 */
app.factory('httpService', function ($http, $timeout, $q) {
    // 默认参数
    var _httpDefaultOpts = {
        method: 'GET', // GET/DELETE/HEAD/JSONP/POST/PUT
        url: '',
        params: {}, // 拼接在url的参数
        data: {},
        cache: false, // boolean or Cache object
        limit: false, //是否节流
        timeout: "httpTimeout", // 节流变量名
        timeoutTime: 0,
        isErrMsg: false,// 错误提示
        isErrMsgFn: null,// 错误提示函数
        checkCode: true, // 是否校验code
        before: function () {
        }, // ajax 执行开始 执行函数
        end: function () {
        }, // ajax 执行结束 执行函数
        error: function (e) {
            console.log(e);
        }, // ajax 执行失败 执行函数
        success: function (data) {
        }, // ajax 执行成功 执行函数
        checkCodeError: function (result) {

        } // ajax 校验code失败 执行函数
    };

    var _httpTimeoutArray = {"httpTimeout": null};//ajax节流使用的定时器 集合

    var _isErrMsgFn = function (opts) {
        if (angular.isFunction(opts.isErrMsgFn)) {
            opts.isErrMsgFn();
        } else {
            alert("抱歉！因为操作不能够及时响应，请稍后在试...");
        }
    };

    // http请求之前执行函数
    var _httpBefore = function (opts) {
        if (angular.isFunction(opts.before)) {
            opts.before();
        }
    };

    // http请求之后执行函数
    var _httpEnd = function (opts) {
        if (angular.isFunction(opts.end)) {
            opts.end();
        }
        if (opts.limit) {
            $timeout.cancel(_httpTimeoutArray[opts.timeout]);
        }
    };

    // 响应错误判断
    var _responseError = function (data, opts) {
        // public.js
        return checkCode(data, opts);
    };

    // http 请求执行过程封装    deferred ：http 链式请求延迟对象
    var _httpMin = function (opts, deferred) {
        /*
         _httpBefore(opts);
         $.ajax({
         'url': opts.url,
         type: "GET",
         traditional: true,
         data: (opts.params ? opts.params : {}),
         xhrFields: {
         withCredentials: true,
         },
         crossDomain: true,
         success:function(data,header,config,status) {

         // 权限，超时等控制
         if (!_responseError(data, opts)) {
         return false;
         }
         // 请求成功回调函数
         if (opts.success) {
         opts.success(data, header, config, status);
         }
         _httpEnd(opts);
         },
         error: function(data,header,config,status){ //处理响应失败
         if(opts.isErrMsg){
         _isErrMsgFn();
         }

         opts.error(data,header,config,status);

         _httpEnd(opts);
         }
         });*/

        _httpBefore(opts);
        opts.params.timestamp = new Date().getTime();
        $http({
            method: opts.method,
            url: opts.url,
            params: opts.params,
            data: opts.data
        }).success(function (data, header, config, status) { //响应成功

            // 权限，超时等控制
            if (!_responseError(data, opts)) {
                return false;
            }

            // 请求成功回调函数
            if (opts.success) {
                opts.success(data, header, config, status);
            }
            if (deferred) {
                deferred.resolve(data, header, config, status);  //任务被成功执行
            }
            _httpEnd(opts);
        }).error(function (data, header, config, status) { //处理响应失败
            if (opts.isErrMsg) {
                _isErrMsgFn();
            }

            opts.error(data, header, config, status);

            if (deferred) {
                deferred.reject(data, header, config, status); //任务未被成功执行
            }

            _httpEnd(opts);
        });
    };


    var _httpPost = function (opts) {
        _httpBefore(opts);
        $.ajax({
            'url': opts.url,
            type: "POST",
            traditional: true,
            data: (opts.params ? opts.params : {}),
            xhrFields: {
                withCredentials: true,
            },
            crossDomain: true,
            success: function (data, header, config, status) {

                // 权限，超时等控制
                if (!_responseError(data, opts)) {
                    return false;
                }

                // 请求成功回调函数
                if (opts.success) {
                    opts.success(data, header, config, status);
                }
                _httpEnd(opts);
            },
            error: function (data, header, config, status) { //处理响应失败
                if (opts.isErrMsg) {
                    _isErrMsgFn();
                }

                opts.error(data, header, config, status);

                _httpEnd(opts);
            },
            checkCodeError:function (result) {
                alert(result.message)
            }
        });
    };

    var _httpDownload = function (opts) {
        _httpBefore(opts);

        var obj = opts.params;

        var u = opts.url + "?";

        for (var p in obj) { // 方法
            if (typeof ( obj [p]) == " function ") {
                obj [p]();
            } else { // p 为属性名称，obj[p]为对应属性的值

                if (obj[p]) {
                    u += p + "=" + obj[p] + "&";
                }
            }
        } // 最后显示所有的属性

        u = u.substring(0, u.length - 1);

        window.open(u);

    };

    // http请求，内含节流等控制
    var _http = function (opts, deferred) {

        opts = $.extend({}, _httpDefaultOpts, opts);
        var result;

        if (opts.limit) {
            $timeout.cancel(_httpTimeoutArray[opts.timeout]);
            _httpTimeoutArray[opts.timeout] = $timeout(function () {
                result = _httpMin(opts, deferred);
            }, opts.timeoutTime);
        } else {
            result = _httpMin(opts, deferred);
        }


    };

    var _combogrid = function (opts, handler) {

        //$(opts.dom).bsSuggest("destroy");

        $(opts.dom).bsSuggest({
            url: baseUrl + opts.url,
            allowNoKeyword: false,
            effectiveFieldsAlias: {"id": "ID", "text": "名称"},
            ignorecase: true,
            getDataMethod: "url",
            data: (opts.params ? opts.params : {}),
            showHeader: true,
            showBtn: true,          //显示下拉按钮
            delayUntilKeyup: true, //获取数据的方式为 firstByUrl 时，延迟到有输入/获取到焦点时才请求数据
            idField: "id",
            keyField: "text",
            clearable: true,
            fnAdjustAjaxParam: function (keyword, options) {

                return {
                    traditional: true,
                    xhrFields: {
                        withCredentials: true
                    },
                    data: {text: keyword, status: opts.params.status},
                    crossDomain: true
                };
            },

            fnProcessData: function (json) {

                //字符串转化为 js 对象
                return {value: json.data};
            }
        }).on('onDataRequestSuccess', function (e, result) {
            console.log('onDataRequestSuccess: ', result);
        }).on('onSetSelectValue', function (e, keyword, data) {
            console.log('onSetSelectValue: ', keyword, data);
            handler(data.id);
        }).on('onUnsetSelectValue', function () {
            console.log("onUnsetSelectValue");
        });


    };

    var _preventRepeat = function (e) {
        var edit = false;
        e.attr("disabled", "disabled");
        var elements = $("[name=form]")[0].elements;
        for (var i = 0; i < elements.length; i++) {
            elements[i].onchange = function () {
                if (event.target.value) {
                    edit = true;
                    e.attr("disabled", false);
                }
            }
        }
    };

    var _spinLoad = function (ele) {
        var spinner = new Spinner({
            lines: 12,
            length: 5,
            width: 2,
            radius: 4,
            color: '#000',
            speed: 1,
            trail: 50,
            shadow: false,
            hwaccel: false,
            className: 'spinner',
            top: 43
        });
        var target = $(ele + ' .spin')[0];
        spinner.spin(target);

        return spinner;
    };

    // http 链式请求
    var _linkHttpMin = function (opts, deferred) {
        _http(opts, deferred);
    };

     var baseUrl = 'http://10.0.0.46:8181/backend/';

    if (window.location.host.indexOf("open.qa.gidoor.com") >= 0) {

        baseUrl = 'http://open.qa.gidoor.com/platform-web/backend/';
    } else if (window.location.host.indexOf("open.gidoor.com") >= 0) {

        baseUrl = 'http://open.gidoor.com/platform-web/backend/';
    }

    return {
        /**
         * http请求
         * @param opts
         */
        httpPost: function (opts) {
            opts.url = baseUrl + opts.url;
            _httpPost(opts);
        },
        sms: function (opts) {
            var baseUrl = 'http://10.0.0.46:8181/';

            if (window.location.host.indexOf("open.qa.gidoor.com") >= 0) {

                baseUrl = 'http://open.qa.gidoor.com/platform-web/';
            } else if (window.location.host.indexOf("open.gidoor.com") >= 0) {

                baseUrl = 'http://open.gidoor.com/platform-web/';
            }
            opts.url = baseUrl + opts.url;
            _httpPost(opts);
        },
        httpDownload: function (opts) {
            opts.url = baseUrl + opts.url;
            _httpDownload(opts);
        },
        preventRepeat: function (e) {
            _preventRepeat(e);
        },
        spinLoad: function (ele) {
            _spinLoad(ele);
        },
        storeListHandle: function (list) {

            for (var i in list) {
                if (!list[i].name) list[i].name = '未命名';
            }
            return list;
        },
        combogrid: function (opts, handler) {

            _combogrid(opts, handler);
        },
        searchRunnerOrMemberByName: function (text, url, success) {

            _combogrid(
                {
                    dom: "#userOrRunner",
                    url: "autoSelect/" + url,
                    params: {text: text}
                }, success
            );
        },
        searchProject: function (text, status, success) {

            _combogrid(
                {
                    dom: "#projectName",
                    url: "autoSelect/findProjectNameAndStatus",
                    params: {text: text, status: status}
                }, success
            );
        },
        searchMemberName: function (text, status, success) {

            _combogrid(
                {
                    dom: "#memberName",
                    url: "autoSelect/findCreateMember",
                    params: {text: text, status: status}
                }, success
            );
        },
        /**
         * http请求
         * @param opts
         */
        http: function (opts) {
            opts.url = baseUrl + opts.url;
            _http(opts);
        },
        /**
         * http链式请求
         * @param opts
         * @param deferred
         * @returns {deferred.promise|{then, catch, finally}}
         */
        linkHttp: function (opts, deferred) {
            opts.url = baseUrl + opts.url;
            deferred = deferred || $q.defer();
            _linkHttpMin(opts, deferred);
            return deferred.promise;
        },
        datatable: function (opts) {

            opts.url = baseUrl + opts.url;

            if (opts.columnsArray) {

                opts.columns = [];
                for (var i in opts.columnsArray) {

                    opts.columns.push({"data": opts.columnsArray[i]});
                }
            }

            if (opts.custColumns) {

                opts.columnDefs = [];
                for (var i in opts.custColumns) {

                    for (var j = opts.columns.length; j > 0; j--) {

                        if (opts.columns[j - 1].data == opts.custColumns[i].data) {
                            opts.columnDefs.push({
                                "targets": [parseInt(j - 1)],
                                "data": opts.columns[j - 1].data,
                                "render": opts.custColumns[i].render
                            })
                            break;
                        }
                    }
                }
            }

            return {
                "scrollX": true,
                "paging": true,
                "lengthChange": false,
                "searching": false,
                "ordering": false,
                "bInfo": true,
                "bPaginate": true,
                "bServerSide": true,
                "responsive": true,
                "bLengthChange": false, //改变每页显示数据数量

                "ajax": {
                    url: opts.url,
                    type: "GET",
                    data: opts.searchParams,
                    xhrFields: {
                        withCredentials: true
                    },
                    crossDomain: true
                },
                "columns": opts.columns,
                "columnDefs": opts.columnDefs,
                pagingType: "full_numbers",
                bFilter: false,
                language: {
                    sEmptyTable: "<b>符合条件的数据为空</b>",
                    sInfo: "显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",
                    sInfoEmpty: "显示第 0 至 0 项结果，共 0 项",
                    sInfoFiltered: "(filtered from _MAX_ total entries)",
                    sInfoThousands: ",",
                    sLengthMenu: "显示 _MENU_ 项",
                    sLoadingRecords: "数据加载中，请稍后...",
                    sProcessing: "加载中...",
                    sSearch: "搜索:",
                    sZeroRecords: "未找到匹配的元素",
                    oPaginate: {
                        sFirst: "首页",
                        sLast: "尾页",
                        sNext: "下页",
                        sPrevious: "上页"
                    }
                }
            }
        },
        datatableNoPage: function (opts) {

            opts.url = baseUrl + opts.url;

            if (opts.columnsArray) {

                opts.columns = [];
                for (var i in opts.columnsArray) {

                    opts.columns.push({"data": opts.columnsArray[i]});
                }
            }

            if (opts.custColumns) {

                opts.columnDefs = [];
                for (var i in opts.custColumns) {

                    for (var j in opts.columns) {

                        if (opts.columns[j].data == opts.custColumns[i].data) {
                            opts.columnDefs.push({
                                "targets": [parseInt(j)],
                                "data": opts.columns[j].data,
                                "render": opts.custColumns[i].render
                            })
                        }
                    }
                }
            }

            return {
                "scrollX": true,
                "paging": false,
                "lengthChange": false,
                "searching": false,
                "ordering": false,
                "bInfo": true,
                "bPaginate": true,
                "bServerSide": true,
                "responsive": true,
                "bLengthChange": false, //改变每页显示数据数量
                "ajax": {
                    'url': opts.url,
                    type: "GET",
                    data: (opts.params ? opts.params : {}),
                    xhrFields: {
                        withCredentials: true
                    },
                    crossDomain: true
                },
                "columns": opts.columns,
                "columnDefs": opts.columnDefs,
                pagingType: "full_numbers",
                bFilter: false,
                language: {
                    sEmptyTable: "<b>符合条件的数据为空</b>",
                    sInfo: "",
                    sInfoEmpty: "",
                    sInfoFiltered: "(filtered from _MAX_ total entries)",
                    sInfoThousands: ",",
                    sLengthMenu: "显示 _MENU_ 项",
                    sLoadingRecords: "数据加载中，请稍后...",
                    sProcessing: "加载中...",
                    sSearch: "搜索:",
                    sZeroRecords: "未找到匹配的元素",
                    errMode: function (settings, tn, msg) {
                        console.log(msg)
                    }
                }

            }
        }
    };
});

