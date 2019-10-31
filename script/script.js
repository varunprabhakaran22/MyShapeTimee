let originalWeight
let desiredWeight



init();
getDay();

function init(){
    
    $(document).ready(function () {
        $(".program-selection").hide();
    })


    document.getElementsByClassName("save-button")[0].addEventListener("click", function(){
        originalWeight = document.getElementsByClassName("weight")[0].value;
        document.getElementsByClassName("original-weight")[0].innerHTML = originalWeight;
        console.log("hey");
        
        $(".program-selection").show();
        $(".main").hide();

         console.log(originalWeight);
         
        let g = {}
        g.originalWeight = originalWeight;
        
        $.ajax({
            type: "POST",
            data: JSON.stringify(g),
            contentType:"application/json",
            url: "http://localhost:3000/api",
            success: (data) => {
                console.log("Heyyy");
                window.location.href='/src/html/dashboard.html'
            },
            error: () => {
                console.log("Error");
                
            },
            complete: () => {
               console.log("complete");
            }
        });
    })

    document.getElementsByClassName("basic")[0].addEventListener("click", function () {
        desiredWeight = document.getElementsByClassName("desired-weight")[0].value;
        console.log(desiredWeight);
    })
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