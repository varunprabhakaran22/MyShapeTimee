//fetch the menu/day from json file 
class Menu{ 
    constructor(userData, menu , menuPerDay){
        this.menu = menu;
        this.menuPerDay = menuPerDay;
        this.userData = userData;
        this.userData.height = userData.height;
        this.userData.weight = userData.Weight;
        this.userData.age = userData.age;
    }

    calculatingBmi(){
        
        //calculating the bmi 
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
            console.log(" do you want to");   
        }
    }
    calculateMenuPerDay() {
        console.log(this.menu)
        console.log(this.menuPerDay);
        let previousRandom = []
        let max = 4;
        for(let i = 0; i <= max; i++){
            previousRandom.push(i)
        }
        for(let i=0;i<2;i++){
            let currentRandom = Math.floor( Math.random() * previousRandom.length );
            console.log(currentRandom);
            previousRandom.splice(currentRandom , 1);
            console.log(previousRandom);
            this.menuPerDay.breakfast.push(this.menu.breakfast[currentRandom])
            this.menuPerDay.lunch.push(this.menu.lunch[currentRandom])
            this.menuPerDay.dinner.push(this.menu.dinner[currentRandom])
        }
        console.log(this.menuPerDay) 
    }

}
const external = {Menu};
module.exports = external;