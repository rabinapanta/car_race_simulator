class Car {
    constructor (brand, model, year, color, price, gas){
        this.brand = brand;
        this.model = model;
        this.year = year;
        this.color = color;
        this.price = price;
        this.gas = gas;
    }

    honk(){
        console.log("Tuut tuut");
        console.log(`Brand: ${this.brand}, Model: ${this.model}, Year: ${this.year}, Color: ${this.color}, Price: ${this.price}`);

    }
    gasAfterRace(currentYear){
        let yearsDifference = currentYear - this.year;
        let gasLoss = 5 + yearsDifference;
        this.gas -= gasLoss;
        this.gas = Math.max(0, this.gas); //to ensure that the gas level does not go below zero
        return this.gas;
    }
}

let cars = [
    new Car("Honda", "CR-V", 2023, "Red", 50000, 45),
    new Car("Ford", "F-150", 2020, "Black", 25000, 30),
    new Car("BMW", "X5", 2022, "Green", 60000, 65),
    new Car("Mazda", "CX-5", 2019, "White", 15000, 60),
    new Car("Audi", "Q7", 2018, "Silver", 52000, 47),
    new Car("Kia", "Forte", 2020, "Blue", 21000, 56)
];
// Invoke the honk method for each car
cars.forEach(car => {
    car.honk();
});

let currentYear  = new Date().getFullYear();
let turnInfo = [];

for(let i=1; i<=7; i++){
    turnInfo = [];
    cars.forEach(car =>{
        let remainingGas = car.gasAfterRace(currentYear);
        turnInfo.push(`Brand: ${car.brand}, Model: ${car.model}, Year: ${car.year}, Color: ${car.color}, Price: ${car.price}, Remaining gas: ${remainingGas} liters`);
    });
    updateRaceInfo(i, turnInfo);
        
}

function updateRaceInfo(turn, carInfo){
    const raceInfoElement = document.getElementById("race-info");
    const turnInfo = document.createElement('p');
    turnInfo.textContent = `Turn ${turn}:`;
    raceInfoElement.appendChild(turnInfo);
    
    carInfo.forEach(info => {
        const carInfoLine = document.createElement('p');
        carInfoLine.textContent = info;
        raceInfoElement.appendChild(carInfoLine);
    });
}

