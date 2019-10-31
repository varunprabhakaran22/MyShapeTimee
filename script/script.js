let name 
let age
let height
let originalWeight
let desiredWeight



init();
getDay();

function init(){
    
    $(document).ready(function () {
        $(".program-selection").hide();
    })

    document.getElementsByClassName("save-button")[0].addEventListener("click", function(){
        name = $(".name").val();
        age = $(".age").val();
        height = $(".height").val();
        originalWeight = $(".weight").val();
        document.getElementsByClassName("original-weight")[0].innerHTML = originalWeight;
        $(".program-selection").show();
        $(".main").hide();

         console.log(originalWeight);
         
        let userDetails = {}
        userDetails.name = name;
        userDetails.age = age;
        userDetails.height = height;
        userDetails.originalWeight = originalWeight;
        $.ajax({
            type: "POST",
            data: JSON.stringify(userDetails),
            contentType:"application/json",
            url: "http://localhost:3000/api",
            success: (data) => {
                console.log(data);
                window.location.href='./asset/dashboard.html'
            },
            error: () => {
                console.log("Error");
                
            },
            complete: () => {
               console.log("complete");
            }
        });
    })

     desiredWeightGoal();
}

function desiredWeightGoal(){    
    let a,b;
    document.getElementsByClassName("basic")[0].addEventListener("click", function () {
        desiredWeight = document.getElementsByClassName("desired-weight")[0].value;
        console.log(desiredWeight);
        let userDetails = {}
        userDetails.desiredWeight = desiredWeight;
        if(originalWeight > desiredWeight){
            a = originalWeight
            b = desiredWeight;
        }
        else{
            b = originalWeight
            a = desiredWeight;   
        }

        if( ((a - b) > 0 ) && ((a -b) <=20 ) ){

            $.ajax({
                type: "POST",
                data: JSON.stringify(userDetails),
                contentType:"application/json",
                url: "http://localhost:3000/api/desiredWeight",
                success: (data) => {
                    console.log(data);
                    // window.location.href='/src/html/dashboard.html'
                },
                error: () => {
                    console.log("Error");
                    
                },
                complete: () => {
                console.log("complete");
                }
            });
        }
        else{
            alert("Enter the value correctly")
        }
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