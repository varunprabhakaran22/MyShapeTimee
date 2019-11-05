let name;
let age;
let Weight;
let height;
let password;
let data;
let Repassword;

function uploadData(){

    name=document.getElementsByClassName("name");
    email=document.getElementsByClassName("email");
    age=document.getElementsByClassName("age");
    height=document.getElementsByClassName("height");
    Weight=document.getElementsByClassName("weight");
    password=document.getElementsByClassName("password");
    Repassword=document.getElementsByClassName("Re-password");
    
    var atposition=email[0].value.indexOf("@");  
    var dotposition=email[0].value.lastIndexOf(".");  

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
         'password':password[0].value
        }
         }).done(function(data){
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

function checkLogin()
{
    email=document.getElementsByClassName("email");
    password=document.getElementsByClassName("password");
 
    var atposition=email[0].value.indexOf("@");  
    var dotposition=email[0].value.lastIndexOf(".");  

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
        }).done(function(data){
            if(data.msg=="User Exist")
            {
                location.replace("Dashboard.html");
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


$(document).ready(function(){
    $.ajax({ 
        url:'http://localhost:8000/'
       }).done(function(dataNew) {
        data=dataNew; 
        console.log(data);
 });


})