const express = require('express');
const router = express.Router();
const {Menu} = require("../../controller/controller");


let eggCount = 0;
let userData;
let numberOfDayMenuTook = 0
let menuPerDay={
	breakfast: [],
	lunch: [],
	dinner:[],
	snacks: []   
}
let menuPerDayTemp={
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
			"Calorie": 75
		},
		{
			"Name": "Wheat Bread",
			"Protein": 3.6,
			"Calorie": 75
		}
	],
	
	"snacks" :[{
			"Name": "Egg",
			"Protein": 5,
			"Calorie": 78
		},
		{
			"Name": "Apple",
			"Protein": 5,
			"Calorie": 150
		},
		{
			"Name": "Turkey with cheese ",
			"Protein": 5,
			"Calorie": 140
		},
		{
			"Name": "Cereal",
			"Protein": 5,
			"Calorie": 180
		},
		{
			"Name": "Nuts",
			"Protein": 7,
			"Calorie": 160
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
			"Calorie": 100
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
			"Calorie": 160
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
			"Calorie": 200
		}
	]
}

module.exports = (app, db) => {    
    app.post("/add", (req, res) => {
        console.log(req.body);
        const note = { name: req.body.name, email:req.body.email, age: req.body.age,
                     height: req.body.height,Weight: req.body.Weight, desiredWeight : req.body.desiredWeight,
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
        db.collection('UserData').findOne({email: req.body.email, password: req.body.password}).then(function(result){
            if(!(result==null)){
                db.collection('UserData').findOne(note, (err, result) => {
                    if (err)
                    {
                        console.log(err + " this error has occured");   
                    }
                    else
                    {
                        userData=result;
                        let userMenu = new Menu(userData, menu , menuPerDay,menuPerDayTemp);
                        userMenu.calculatingBmi();
						userMenu.calculatingCaloriesPerDay();
						menuPerDay = userMenu.calculateMenuPerDay();
						console.log("printing from route");
						console.log(menuPerDay);
						res.status(200).json({msg:"User Exist", perDayMenu: menuPerDay}); 
                    } 
                });
            }
           else
           {
              res.status(200).json({msg:"User Does Not Exist"});
           }
        });
	});
	
	app.post("/day", (req, res) => {
		console.log("am executing");
		if(req.body.message === "yes"){
			let userMenu = new Menu(userData, menu , menuPerDay);
			userMenu.ifUserTookTheMenu(numberOfDayMenuTook);
			userMenu.calculatingBmi();
			userMenu.calculatingCaloriesPerDay();
			userMenu.calculateMenuPerDay();
			console.log(menuPerDay);
		}
		else{
			numberOfDayMenuTook--;
		}
	});
}

