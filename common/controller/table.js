/**
 * Created by admin on 2017/5/16.
 */
app.controller("TableCtrl",function ($scope) {
    $(".table-nav>.nav>li>a").click(function () {
        $(".table-nav>.nav>li a").removeClass("pray");
        $(this).addClass("pray");
        if($(this).parent().hasClass("active")){
            $(this).parent().removeClass("active");
            $(this).find("i:first").removeClass("hide");
            $(this).find("i:last").addClass("hide");
            $(this).next("ul").addClass("hide");
        }else{
            if(innerWidth<=768){
                $(".table-nav>.nav>li").removeClass("active");
                $(".table-nav>.nav>li>ul").addClass("hide");
                $(".fa-angle-right").removeClass("hide");
                $(".fa-angle-down").addClass("hide");
            }
            $(this).parent().addClass("active");
            $(this).find("i:first").addClass("hide");
            $(this).find("i:last").removeClass("hide");
            $(this).next("ul").removeClass("hide");
        }
    });
    $(".table-nav>.nav>li").on("click","a",function () {
        $(".table-nav>.nav>li a").removeClass("pray");
        $(this).addClass("pray");
    })
    $(".table-nav>.nav>li>ul>li").click(function () {
        if(innerWidth<=768){
            $(".table-nav>.nav>li").removeClass("active");
            $(".table-nav>.nav>li>ul").addClass("hide");
            $(".fa-angle-right").removeClass("hide");
            $(".fa-angle-down").addClass("hide");
        }
    })
    
    $(".table-nav-title").click(function () {
        if(innerWidth<=768){
            var display = $(this).next().css('display');
            if(display == 'none'){
                $(".manage-ul").hide();
                $(this).next().show();
            }else{
                $(this).next().hide();
            }
        }else{
            $(".manage-ul").show();
        }
    })
});
