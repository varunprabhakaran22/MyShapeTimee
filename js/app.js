let name;
let age;
let Weight;
let height;
let password;

function uploadData(){

    name=document.getElementsByClassName("name");
    age=document.getElementsByClassName("age");
    height=document.getElementsByClassName("height");
    Weight=document.getElementsByClassName("weight");
    


       $.ajax({
        url: 'http://localhost:8000/add',
        type: 'POST',
        dataType: 'json',
        data: { 
         'name': name[0].value, 
         'age' : age[0].value,
         'height' : height[0].value,
         'Weight' : Weight[0].value
        } ,
        success: function (response) {
            alert(response.status);
        }
    }); 

}

function authLogin()
{
    name=document.getElementsByClassName("name");
    password=document.getElementsByClassName("password");

    $.ajax({
        url: 'http://localhost:8000/signup',
        type: 'POST',
        dataType: 'json',
        data: { 
         'name': name[0].value, 
         'password' : password[0].value,
        } ,
        success: function (response) {
            alert(response.status);
        }
    }); 



}