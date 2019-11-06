class Menu{ 
    constructor(menu , menuPerDay){
        this.menu = menu;
        this.menuPerDay = menuPerDay;
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