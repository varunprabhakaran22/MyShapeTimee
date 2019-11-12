//fetch the menu/day from json file 
class Menu{
    constructor(userData, menu , menuPerDay,menuPerDayTemp){
        this.menu = menu;
        this.menuPerDay = menuPerDay;
        this.menuPerDayTemp = menuPerDayTemp;
        this.compensation = menu;
        this.userData = userData;
        this.userData.height = userData.height;
        this.userData.weight = userData.Weight;
        this.userData.desiredWeight = userData.desiredWeight
        this.userData.age = userData.age;
        this.caloriesPerDay = 0;
        this.quantityOfEgg = 0;
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
        if(this.userData.weight > this.userData.desiredWeight ){
            let bmr = ( 655.1 + ( 9.563 * this.userData.weight ) + ( 1.85 * this.userData.height ) - ( 4.676 * this.userData.age ));
            this.caloriesPerDay = ( bmr * 1.1 );
            console.log(" desired weight " + this.userData.desiredWeight +" weight :" + this.userData.Weight);
            console.log("Weight loss " + this.caloriesPerDay);
        }    
        //calories need for weight gain 
        else
        {
            let bmr = ( 655.1 + ( 9.563 * this.userData.weight ) + ( 1.85 * this.userData.height ) - ( 4.676 * this.userData.age ));
            this.caloriesPerDay = ( bmr * 1.4 );
            console.log(" desired weight " +this.userData.desiredWeight +" weight :" + this.userData.Weight );
            console.log("Weight gain " + this.caloriesPerDay);     
        }
    }

    //calculating the menu
    calculateMenuPerDay() {
        let previousRandom = []
        let max = 4;
        let totalCalorie = 0;
        let breakfastCalories = 0;
        let snacksCalories = 0;
        let lunchCalories = 0;
        let dinnerCalories = 0;

        for(let i = 0; i <= max; i++){
            previousRandom.push(i)
        }

        //picking only two dish using for loop 
        for(let i=0;i<2;i++){
            // this.menuPerDay.breakfast = {};
            let currentRandom = Math.floor( Math.random() * previousRandom.length );
            currentRandom = previousRandom[currentRandom];
            previousRandom.splice(currentRandom , 1);
            // this.menuPerDayTemp.breakfast[i] = this.menuPerDay.breakfast.push(this.menu.breakfast[currentRandom])
            // this.menuPerDayTemp.snacks[i] = this.menuPerDay.snacks.push(this.menu.snacks[currentRandom])
            // this.menuPerDayTemp.lunch[i] = this.menuPerDay.lunch.push(this.menu.lunch[currentRandom])
            // this.menuPerDayTemp.dinner[i]= this.menuPerDay.dinner.push(this.menu.dinner[currentRandom])

            this.menuPerDay.breakfast[i] = this.menu.breakfast[currentRandom]
            this.menuPerDay.snacks[i] = this.menu.snacks[currentRandom]
            this.menuPerDay.lunch[i] = this.menu.lunch[currentRandom]
            this.menuPerDay.dinner[i] = this.menu.dinner[currentRandom]
            
        }

        for(let i=0; i<2; i++){
            breakfastCalories = breakfastCalories + this.menuPerDay.breakfast[i].Calorie;
            snacksCalories = snacksCalories + this.menuPerDay.snacks[i].Calorie;
            lunchCalories = lunchCalories + this.menuPerDay.lunch[i].Calorie;
            dinnerCalories = dinnerCalories + this.menuPerDay.dinner[i].Calorie;
        }

        totalCalorie = breakfastCalories + snacksCalories + lunchCalories + dinnerCalories;
        console.log("total calories " + totalCalorie);
        // console.log(" breakfast calories " + breakfastCalories);
        // console.log("snacks" + snacksCalories);
        // console.log("lunch" + lunchCalories);
        // console.log("dinner" + dinnerCalories);


        //method calling to find the calories 
        if( this.caloriesPerDay > totalCalorie ){
            this.calculatingTheRequiredCalories( totalCalorie );        
        }

        return this.menuPerDay
        // return this.quantityOfEgg
    }


    calculatingTheRequiredCalories( totalCalorie ){
        let difference = 0;
        this.totalCalorie = totalCalorie
        difference = this.caloriesPerDay - this.totalCalorie;
        // console.log("total calorie" + this.totalCalorie);

        if(this.caloriesPerDay > this.totalCalorie){
            this.quantityOfEgg++;            
            totalCalorie = totalCalorie + this.compensation.snacks[0].Calorie;
            this.calculatingTheRequiredCalories(totalCalorie)
        }
        else{
            console.log("count of the egg  " + this.quantityOfEgg);
        }
    }


    ifUserTookTheMenu(numberOfDayMenuTook){
        this.numberOfDayMenuTook = numberOfDayMenuTook;
        this.numberOfDayMenuTook++;


        console.log(this.numberOfDayMenuTook);
        this.userData.weight = this.userData.weight - 1.2;
        console.log("updated user weight " + this.userData.weight);  
        // this.calculatingBmi();
        // this.calculatingCaloriesPerDay();
        // this.calculateMenuPerDay();
    }
}


//exporting the class Menu to route.js file
const external = {Menu};
module.exports = external;