let originalWeight



init();


function init(){
    document.getElementsByClassName("save-button")[0].addEventListener("click", function(){
        originalWeight = document.getElementsByClassName("weight")[0].value;
        document.getElementsByClassName("original-weight")[0].innerHTML = originalWeight;
        $(".program-selection").show();
        $(".main").hide();
    })
}