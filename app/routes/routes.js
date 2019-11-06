const express = require('express');
const router = express.Router();
const {Menu} = require("../../controller/controller");



let userData;
let menuPerDay={
	breakfast: [],
	lunch: [],
	dinner:[],
	snacks: []   
}
let menu = {
	"breakfast": [{
			"Name": "Egg",
			"Protein": 5,
			"Calorie": 78
		},
		{
			"Name": "Milk",
			"Protein": 8,
			"Calorie": 42
		},
		{
			"Name": "Banana",
			"Protein": 1.3,
			"Calorie": 100
		},
		{
			"Name": "OatMmeals",
			"Protein": 17,
			"Calorie": 68
		},
		{
			"Name": "Wheat Bread",
			"Protein": 3.6,
			"Calorie": 69
		}
	],
	
	"lunch" :[{
			"Name": "Chicken Breast",
			"Protein": 20,
			"Calorie": 165
		},
		{
			"Name": "Brown Rice",
			"Protein": 3,
			"Calorie": 111
		},
		{
			"Name": "Spinach",
			"Protein": 2.9,
			"Calorie": 10
		},
		{
			"Name": "Salmon",
			"Protein": 20,
			"Calorie": 185
		},
		{
			"Name": "Tuna",
			"Protein": 20,
			"Calorie": 180
		}
	],
	
	"dinner" :[{
			"Name": "Nuts",
			"Protein": 7,
			"Calorie": 607
		},
		{
			"Name": "Beans",
			"Protein": 8,
			"Calorie": 347
		},	
		{
			"Name": "Avacados",
			"Protein": 2.5,
			"Calorie": 160
		},
		{
			"Name": "Potato",
			"Protein": 2.5,
			"Calorie": 77
		},
		
		{
			"Name": "Chapathi",
			"Protein": 3.5,
			"Calorie": 90
		}
		
	]
}

module.exports = (app, db) => {    
    app.post("/add", (req, res) => {
        console.log(req.body);
        const note = { name: req.body.name, email:req.body.email, age: req.body.age,
                     height: req.body.height,Weight: req.body.Weight,DesiredWeight : req.body.DesiredWeight,
                     password:req.body.password
        };
        db.collection('UserData').findOne({email: req.body.email}).then(function(result){
            if(!(result==null)){
                res.status(200).json({msg:"Email Id already present"});
            }
            else
            {
                db.collection('UserData').insertOne(note, (err, result) => {
                    if (err)
                    {
                        console.log(err + " this error has occured");
                    }
                    else
                    {
    
                         res.status(200).json({msg:"success"});
                    }
                });
            }
        });
    });

    app.post("/", (req, res) => {
        const note = { email: req.body.email, password: req.body.password };
        //console.log(req.body);
        db.collection('UserData').findOne({email: req.body.email, password: req.body.password}).then(function(result){
            if(!(result==null)){
                db.collection('UserData').findOne(note, (err, result) => {
                    if (err)
                    {
                        console.log(err + " this error has occured");   
                    }
                    else
                    {
                        console.log(result);
                        userData=result;
                        res.status(200).json({msg:"User Exist"});
                        console.log("am coming");
                        
                        let userMenu = new Menu(userData, menu , menuPerDay);
                        userMenu.calculatingBmi();
                        userMenu.calculateMenuPerDay();
                    }
                });
            }
           else
           {
              res.status(200).json({msg:"User Does Not Exist"});
           }
        });
    });    
}


// router.post('/',(req,res) => {
//     userData =  req.body;
//     weight = userData.originalWeight;
//     height = userData.height;
//     originalWeight = userData.originalWeight
//     age = userData.age;

//     //calculating the bmi 
//     bmi = Math.round(weight/((height/100)*(height/100)));
//     console.log("bmi is " + bmi);

//     //categorizing
//     if(bmi > 25){
//         console.log("over weight");
        
//     }
//     if(bmi < 19){
//         console.log("under weight");
        
//     }
//     if((bmi > 19)&&( bmi < 25)){
//         console.log(" do you want to");   
// 	}
// 	//responding to  the request
//     res.json({"bmi":bmi});
// });


// // based on the user's desired weight recommending the menu 
// router.post('/desiredWeight',(req,res) => {
// 	let currentRandom = 11;
//     userData =  req.body;
//     weight = userData.desiredWeight;
//     desiredWeight = userData.desiredWeight;
// 	console.log("Goal " + weight);
	
//     //Finding the calories needed per day and suggesting the menu  for weight loss
//     if(originalWeight > desiredWeight ){
//         bmr = ( 655.1 + ( 9.563 * originalWeight) + ( 1.85 * height  ) - ( 4.676 * age ));
//         caloriesPerDay = ( bmr * 1.1 );
//         console.log(caloriesPerDay);
// 		let singleMenu = new Menu(menu , menuPerDay)
// 		singleMenu.calculateMenuPerDay();
// 	}
	
// 	// suggesting the menu for weight gain 
// 	else
//     {
//         bmr = ( 655.1 + ( 9.563 * originalWeight) + ( 1.85 * height  ) - ( 4.676 * age ));
//         caloriesPerDay = ( bmr * 1.4 );
//         console.log(caloriesPerDay);     
//     }
//     res.json({"caloriesPerDay" : caloriesPerDay})

// });





// function test()
// {
//     console.log(userData.name);
// }
