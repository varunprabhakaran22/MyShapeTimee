//fetch the menu/day from json file 
class Menu{ 
    constructor(userData, menu , menuPerDay){
        this.menu = menu;
        this.menuPerDay = menuPerDay;
        this.userData = userData;
        this.userData.height = userData.height;
        this.userData.weight = userData.Weight;
        this.userData.desiredWeight = userData.desiredWeight
        this.userData.age = userData.age;
    }

    //calculating the bmi
    calculatingBmi(){
        let bmi = Math.round(this.userData.weight/((this.userData.height/100)*(this.userData.height/100)));
        console.log("bmi is " + bmi);

        //categorizing
        if(bmi > 25){
            console.log("over weight");
            
        }
        if(bmi < 19){
            console.log("under weight");
            
        }
        if((bmi > 19)&&( bmi < 25)){
            console.log("Normal weight ");   
        }
    }

    //calculating the calories needed per day 
    calculatingCaloriesPerDay(){
        //weight loss
        if(this.userData.Weight > this.userData.desiredWeight ){
            let bmr = ( 655.1 + ( 9.563 * this.userData.Weight ) + ( 1.85 * this.userData.height ) - ( 4.676 * this.userData.age ));
            let caloriesPerDay = ( bmr * 1.1 );
            console.log(" desired weight " + this.userData.desiredWeight +" weight :" + this.userData.Weight);
            
            console.log("Weight loss " + caloriesPerDay);
	    }    
        // weight gain 
        else
        {
            let bmr = ( 655.1 + ( 9.563 * this.userData.Weight ) + ( 1.85 * this.userData.height ) - ( 4.676 * this.userData.age ));
            let caloriesPerDay = ( bmr * 1.4 );
            console.log(" desired weight " +this.userData.desiredWeight +" weight :" + this.userData.Weight );
            console.log("Weight gain " + caloriesPerDay);     
        }
    }

    //calculating the menu
    calculateMenuPerDay() {
        let previousRandom = []
        let max = 4;
        for(let i = 0; i <= max; i++){
            previousRandom.push(i)
        }
        for(let i=0;i<2;i++){
            console.log(previousRandom);
            
            let currentRandom = Math.floor( Math.random() * previousRandom.length );
            console.log(currentRandom);
            previousRandom.splice(currentRandom , 1);
            console.log(previousRandom);
            this.menuPerDay.breakfast.push(this.menu.breakfast[currentRandom])
            this.menuPerDay.snacks.push(this.menu.snacks[currentRandom])
            this.menuPerDay.lunch.push(this.menu.lunch[currentRandom])
            this.menuPerDay.dinner.push(this.menu.dinner[currentRandom])

        }

        console.log(this.menuPerDay)

        // calculating the calories from menu
        let breakfastCalories = 0;
        for(let i=0; i<2; i++){
            breakfastCalories = breakfastCalories + this.menuPerDay.breakfast[i].Calorie;
        }
        console.log(breakfastCalories);
    }
}

//exporting the class Menu to route.js file
const external = {Menu};
module.exports = external;