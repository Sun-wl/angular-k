/**
 * Created by admin on 2017/5/17.
 */
app.controller("DocumentCtrl", function ($scope, $location) {
    if($location.$$path.split("/")[3]){
        if(!$("."+ $location.$$path.split("/")[3] +"-li").hasClass("active")){
            $("."+ $location.$$path.split("/")[3] +"-li").addClass("active");
        }
        $("."+ $location.$$path.split("/")[3] +"-li>a").addClass("pray");
    }else{
        $(".developKnow-li>a").addClass("pray");
    }
    // SyntaxHighlighter.config.clipboardSwf = 'scripts/clipboard.swf';
    SyntaxHighlighter.all();

});