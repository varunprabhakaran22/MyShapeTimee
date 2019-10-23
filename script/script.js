init();


function init(){
    document.getElementsByClassName("save-button")[0].addEventListener("click", function(){
        $(".program-selection").show();
        $(".main").hide();
    })
}