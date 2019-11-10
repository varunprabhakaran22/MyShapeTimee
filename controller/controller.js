//fetch the menu/day from json file 
class Menu{ 
    constructor(userData, menu , menuPerDay){
        this.menu = menu;
        this.menuPerDay = menuPerDay;
        this.compensation = menu;
        this.userData = userData;
        this.userData.height = userData.height;
        this.userData.weight = userData.Weight;
        this.userData.desiredWeight = userData.desiredWeight
        this.userData.age = userData.age;
        this.caloriesPerDay = 0;
    }

    //calculating the bmi
    calculatingBmi(){
        let bmi = Math.round(this.userData.weight/((this.userData.height/100)*(this.userData.height/100)));
        console.log("bmi is " + bmi);
        //categorizing
        if(bmi >= 25){
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
        //calories need for weight loss
        if(this.userData.Weight > this.userData.desiredWeight ){
            let bmr = ( 655.1 + ( 9.563 * this.userData.Weight ) + ( 1.85 * this.userData.height ) - ( 4.676 * this.userData.age ));
            this.caloriesPerDay = ( bmr * 1.1 );
            console.log(" desired weight " + this.userData.desiredWeight +" weight :" + this.userData.Weight);
            console.log("Weight loss " + this.caloriesPerDay);

	    }    
        //calories need for weight gain 
        else
        {
            let bmr = ( 655.1 + ( 9.563 * this.userData.Weight ) + ( 1.85 * this.userData.height ) - ( 4.676 * this.userData.age ));
            this.caloriesPerDay = ( bmr * 1.4 );
            console.log(" desired weight " +this.userData.desiredWeight +" weight :" + this.userData.Weight );
            console.log("Weight gain " + this.caloriesPerDay);     
        }
    }

    //calculating the menu
    calculateMenuPerDay() {
        let previousRandom = []
        let max = 4;
        for(let i = 0; i <= max; i++){
            previousRandom.push(i)
        }

        //picking only two dish using for loop 
        for(let i=0;i<2;i++){
            let currentRandom = Math.floor( Math.random() * previousRandom.length );
            currentRandom = previousRandom[currentRandom];
            previousRandom.splice(currentRandom , 1);
            this.menuPerDay.breakfast.push(this.menu.breakfast[currentRandom])
            this.menuPerDay.snacks.push(this.menu.snacks[currentRandom])
            this.menuPerDay.lunch.push(this.menu.lunch[currentRandom])
            this.menuPerDay.dinner.push(this.menu.dinner[currentRandom])
        }
        console.log(this.menuPerDay)

        // calculating the calories from menu
        // let cal = 2750;
        let difference=0;
        let totalCalorie = 0;
        let breakfastCalories = 0;
        let snacksCalories = 0;
        let lunchCalories = 0;
        let dinnerCalories = 0;
        for(let i=0; i<2; i++){
            breakfastCalories = breakfastCalories + this.menuPerDay.breakfast[i].Calorie;
            snacksCalories = snacksCalories + this.menuPerDay.snacks[i].Calorie;
            lunchCalories = lunchCalories + this.menuPerDay.lunch[i].Calorie;
            dinnerCalories = dinnerCalories + this.menuPerDay.dinner[i].Calorie;
        }
        totalCalorie = breakfastCalories + snacksCalories + lunchCalories + dinnerCalories;
        difference = this.caloriesPerDay - totalCalorie;
        console.log(" breakfast calories " + breakfastCalories);
        console.log("snacks" + snacksCalories);
        console.log("lunch" + lunchCalories);
        console.log("dinner" + dinnerCalories);
        console.log("total calories " + totalCalorie);
        

        //method calling to find the calories 
        this.calculatingTheRequiredCalories( difference, totalCalorie );
    }

    calculatingTheRequiredCalories(difference, totalCalorie){
        this.difference = difference;
        this.totalCalorie = totalCalorie
        // this.cal = cal
        let quantityOfEgg = 0;
        if(this.caloriesPerDay > this.totalCalorie){
            quantityOfEgg++;
            console.log(this.compensation);            
            totalCalorie = totalCalorie + this.compensation.snacks[0].Calorie;
            console.log(this.compensation.snacks[0].Name);
            console.log(quantityOfEgg);
            console.log("Updated total calories " + totalCalorie);
        }
    }
}


//exporting the class Menu to route.js file
const external = {Menu};
module.exports = external;