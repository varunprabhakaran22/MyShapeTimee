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
let we;


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
                location.replace("index.html");
              

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
                //
                perDayMenu = data.perDayMenu;
                sessionStorage.setItem("email",email[0].value);
                //getData(data);
                perDayMenu=data;
               // console.log(data.perDayMenu);
                // localStorage.setItem("perDayMenu",JSON.stringify(data));
                // perDayMenu = data.perDayMenu
                // eggQuantity = data.eggQuantity
                location.replace("Dashboard.html");

            }
            else if(data.msg=="User Does Not Exist")
            {
                location.replace("index.html");
                alert("User Does Not Exist");
            }
            else
            {
                alert("User Does Not Exist");
            }
        }); 


    }  
}

// function getData()
// {
//     let email=sessionStorage.getItem("email");
//     console.log(email);   
//     var x = localStorage.getItem("perDayMenu");
//     var y=JSON.parse(x)
//    // console.log(y)

   

    document.getElementById("lunchData").innerHTML=y.perDayMenu.lunch[0].Name+" ";
    var para = document.createElement("lunchData"); 
    var t = document.createTextNode(y.perDayMenu.lunch[1].Name);
    para.appendChild(t);                                          // Append the text to <p>
    document.getElementById("lunchData").appendChild(para);  

    document.getElementById("dinnerData").innerHTML=y.perDayMenu.dinner[0].Name+" ";
    var para = document.createElement("dinnerData"); 
    var t = document.createTextNode(y.perDayMenu.dinner[1].Name);
    para.appendChild(t);                                          // Append the text to <p>
    document.getElementById("dinnerData").appendChild(para);  

    document.getElementById("snacksData").innerHTML=y.perDayMenu.snacks[0].Name+" ";
    var para = document.createElement("snacksData"); 
    var t = document.createTextNode(y.perDayMenu.snacks[1].Name);
    para.appendChild(t);                                          // Append the text to <p>
    document.getElementById("snacksData").appendChild(para);  


// }

function display()
{
    console.log("heyyy");
    numberOfTimeUserTookMenu++;
    let email=sessionStorage.getItem("email");
    console.log(numberOfTimeUserTookMenu);
    if( (numberOfTimeUserTookMenu % 7 ) === 0 )
        {
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
                console.log(we)

                
                $.ajax({
                    url: 'http://localhost:8000/updateWeight',
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        'email': email,
                        'Weight' :we
                    }
                })
                

            });
        }       
         else{
            console.log("else block");
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
                
                document.getElementById("breakfastData").innerHTML=perDayMenu.breakfast[0].Name+" ";
                var para = document.createElement("breakfastData"); 
                var t = document.createTextNode(perDayMenu.breakfast[1].Name);
                para.appendChild(t);                                          // Append the text to <p>
                document.getElementById("breakfastData").appendChild(para);  


                document.getElementById("lunchData").innerHTML=perDayMenu.lunch[0].Name+" ";
                var para = document.createElement("lunchData"); 
                var t = document.createTextNode(perDayMenu.lunch[1].Name);
                para.appendChild(t);                                          // Append the text to <p>
                document.getElementById("lunchData").appendChild(para);  

                document.getElementById("dinnerData").innerHTML=perDayMenu.dinner[0].Name+" ";
                var para = document.createElement("dinnerData"); 
                var t = document.createTextNode(perDayMenu.dinner[1].Name);
                para.appendChild(t);                                          // Append the text to <p>
                document.getElementById("dinnerData").appendChild(para);  

                document.getElementById("snacksData").innerHTML=perDayMenu.snacks[0].Name+" ";
                var para = document.createElement("snacksData"); 
                var t = document.createTextNode(perDayMenu.snacks[1].Name);
                para.appendChild(t);                                          // Append the text to <p>
                document.getElementById("snacksData").appendChild(para);  

            });
         }
 }

function logout()
{
    location.replace("index.html");
    localStorage.clear();
    sessionStorage.clear();
}
