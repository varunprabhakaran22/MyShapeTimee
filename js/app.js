//Declaring the global variables
let name;
let age;
let Weight;
let height;
let password;
let data;
let Repassword;
let desiredWeight;
let perDayMenu
let eggQuantity
let numberOfTimeUserTookMenu = 0;


// getting the user profile data from client using ajax call 
function uploadData(){
    name=document.getElementsByClassName("name");
    email=document.getElementsByClassName("email");
    age=document.getElementsByClassName("age");
    height=document.getElementsByClassName("height");
    Weight=document.getElementsByClassName("weight");
    desiredWeight=document.getElementsByClassName("desiredWeight");
    password=document.getElementsByClassName("password");
    Repassword=document.getElementsByClassName("Re-password");
    let atposition=email[0].value.indexOf("@");  
    let dotposition=email[0].value.lastIndexOf(".");  
    console.log(desiredWeight[0].value);
    if(Weight > desiredWeight){
        a = Weight
        b = desiredWeight;
    }
    else{
        b = Weight
        a = desiredWeight;
    } 

//setting the condition for all the user input fields
    if((name[0].value=="" && email[0].value=="" && age[0].value=="" && height[0].value=="" && Weight[0].value==""
    && password[0].value==""))
    {
        alert("Fill the data..");    
    }

    else if (atposition<1 || dotposition<atposition+2 || dotposition+2>=email[0].value.length){  
        alert("Please enter a valid Email"); 
    }

    else if(!(password[0].value === Repassword[0].value)){
        alert("Password does not matchs"); 
    }

    else if ( ((a - b) < 0 ) && ((a -b) >= 10 ) ){
        alert("Enter valid Desired Weight.."); 
    }

    //Passing the user details to the server using the ajax call
    else{   
        $.ajax({
            url: 'http://localhost:8000/add',
            type: 'POST',
            dataType: 'json',
            data: { 
                'name': name[0].value, 
                'email':email[0].value,
                'age' : age[0].value,
                'height' : height[0].value,
                'Weight' : Weight[0].value,
                'desiredWeight' : desiredWeight[0].value,
                'password':password[0].value
            }
        })
        .done(function(data){
            if(data.msg=="success")
            {
                location.replace("login.html");
            }
            else if(data.msg=="Email Id already present")
            {
                alert("Email ID Already Present")
            }
        }); 
    }
}

//creating the function to check login 
function checkLogin(){
    email=document.getElementsByClassName("email");
    password=document.getElementsByClassName("password");
    let atposition=email[0].value.indexOf("@");  
    let dotposition=email[0].value.lastIndexOf(".");  
    if (atposition<1 || dotposition<atposition+2 || dotposition+2>=email[0].value.length){  
        alert("Please enter a valid e-mail address");  
    }
    else
    {
        $.ajax({
            url: 'http://localhost:8000/',
            type: 'POST',
            dataType: 'json',
            data: { 
                'email': email[0].value, 
                'password' : password[0].value,
            }
        })
        .done(function(data){
            perDayMenu = data.perDayMenu;
            if(data.msg=="User Exist")
            {
                
                location.replace("Dashboard.html");
                perDayMenu = data.perDayMenu
                eggQuantity = data.eggQuantity
            }
            else if(data.msg=="User Does Not Exist")
            {
                location.replace("login.html");
                alert("User Does Not Exist");
            }
            else
            {
                alert("User Does Not Exist");
            }
        }); 
    }  
}


function display(){
    console.log("heyyy");
    // console.log(perDayMenu);
    // for(let i= 0; i< 2; i++){
    //     let breakfast = console.log(perDayMenu.breakfast[i].Name)
    //     let lunch = console.log(perDayMenu.lunch[i].Name)
    //     let snacks = console.log(perDayMenu.snacks[i].Name)
    //     let dinner = console.log(perDayMenu.dinner[i].Name)
    // }
    
    document.getElementsByClassName("yes")[0].addEventListener("click", function(){
        numberOfTimeUserTookMenu++;
        console.log(numberOfTimeUserTookMenu);
        if( (numberOfTimeUserTookMenu % 7 ) === 0 ){  
            console.log("me" + numberOfTimeUserTookMenu);
            $.ajax({
                url: 'http://localhost:8000/oneweek',
                type: 'POST',
                dataType: 'json',
                data: {
                    'message' :'oneWeek' 
                }
            })
            .done(function(data){
                perDayMenu = data.perDayMenu;                
                eggQuantity = data.eggQuantity
                let we = data.updatedWeight
                console.log(perDayMenu);
                console.log(eggQuantity);
                
            });
        }

        else{
            console.log("else block");     
            $.ajax({
                url: 'http://localhost:8000/tookmenu',
                type: 'POST',
                dataType: 'json',
                data: {
                    'message' : 'yes' 
                }
            })
            .done(function(data){
                perDayMenu = data.perDayMenu;
                console.log(perDayMenu);
                console.log(data.eggQuantity);
                
            });
        }
    });

    // document.getElementsByClassName("no")[0].addEventListener("click", function(){
    //     $.ajax({
    //         url: 'http://localhost:8000/day',
    //         type: 'POST',
    //         dataType: 'json',
    //         data: {
    //             'message' : 'no' 
    //         }
    //     });    
    // });
}
