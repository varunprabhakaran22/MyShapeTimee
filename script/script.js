let originalWeight
let desiredWeight


getDay();
init();


function init(){
    
    $(document).ready(function () {
        $(".program-selection").hide();
    })


    document.getElementsByClassName("save-button")[0].addEventListener("click", function(){
        originalWeight = document.getElementsByClassName("weight")[0].value;
        document.getElementsByClassName("original-weight")[0].innerHTML = originalWeight;
        $(".program-selection").show();
        $(".main").hide();
    })

    document.getElementsByClassName("basic")[0].addEventListener("click", function () {
        desiredWeight = document.getElementsByClassName("desired-weight")[0].value;
        console.log(desiredWeight);
    })

    //calling the day function
  
}


//for displaying the time

function getDay(){
    let date=new Date();
    let month = date.getMonth();
    let months = ["Jan", "Feb","Mar ","Apr","May","Jun", "July","Aug","Sep","Oct","Nov","Dec" ]
    month = months[month]
    let dayValue=date.getDate(); 
    dayValue = dayValue + " " + month;
    console.log(dayValue);
     
    document.getElementsByClassName("calender")[0].innerHTML=dayValue;
}