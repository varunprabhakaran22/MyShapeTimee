let name;
let age;
let Weight;
let height;


function process(){

    name=document.getElementsByClassName("name");
    age=document.getElementsByClassName("age");
    height=document.getElementsByClassName("height");
    Weight=document.getElementsByClassName("weight");
    
    console.log(name[0].value);
    console.log(age[0].value);
    console.log(height[0].value);
    console.log(Weight[0].value);


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