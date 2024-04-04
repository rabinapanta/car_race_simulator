class Car {
  constructor(brand, model, year, color, price, gas, index) {
      this.brand = brand;
      this.model = model;
      this.year = year;
      this.color = color;
      this.price = price;
      this.gas = gas;
      this.speed = Math.random() * 5 + 1; // Random speed between 1 and 5
      this.position = 0; // Initial position at the leftmost part

      this.element = document.createElement('div');
      this.element.id = `car-${index}`;
      this.element.classList.add('car');
      this.element.innerText = `${this.brand} ${this.model}`;
      this.element.style.backgroundColor = color;
      document.querySelector('.race-track').appendChild(this.element);
      this.move(); // Move the car to the starting position
  }

  move(totalGas) {
    if (this.gas > 0) {
        const gasPercentage = this.gas / totalGas; // Calculate gas percentage
        const distance = gasPercentage * 100; // Calculate distance to move based on gas percentage
        this.position += this.speed * distance; // Move based on gas percentage
        this.element.style.marginLeft = `${this.position}px`; // Move the car horizontally
        this.gas -= 5 + (new Date().getFullYear() - this.year); // Consume gas
        if (this.gas <= 0) {
            this.gas = 0;
            this.speed = 0; // Stop the car if out of gas
        }
        this.updateDetails();
    }
}






  updateDetails() {
      document.getElementById('car-details').innerText = `${this.brand} ${this.model} (${this.year}), ${this.color}, $${this.price}, Gas: ${this.gas.toFixed(2)} liters`;
  }

  static getWinner(cars) {
      const remainingCars = cars.filter(car => car.gas > 0);
      if (remainingCars.length === 1) {
          return `${remainingCars[0].brand} ${remainingCars[0].model}`;
      } else {
          return null;
      }
  }
}

const cars = [
  new Car('Honda', 'CR-V', 2023, 'Red', 50000, 45, 1),
  new Car('Ford', 'F-150', 2020, 'Black', 25000, 30, 2),
  new Car('BMW', 'X5', 2022, 'Green', 60000, 65, 3),
  new Car('Mazda', 'CX-5', 2019, 'Gold', 15000, 60, 4),
  new Car('Audi', 'Q7', 2018, 'Silver', 52000, 47, 5),
  new Car('Kia', 'Forte', 2020, 'Blue', 21000, 56, 6)
];

let currentTurn = 0;

document.getElementById('next-turn-btn').addEventListener('click', () => {
  if (currentTurn >= 7 || cars.every(car => car.gas <= 0)) {
      const winner = Car.getWinner(cars);
      if (winner) {
          document.getElementById('race-details').innerText = `Winner: ${winner}`;
      } else {
          document.getElementById('race-details').innerText = 'No winner';
      }
      return;
  }

  const totalGas = cars.reduce((total, car) => total + car.gas, 0); // Calculate total gas of all cars
  cars.forEach(car => {
      car.move(totalGas);
  });
  currentTurn++;
  updateRaceDetails(); // Update race details after each turn
});


function updateRaceDetails() {
  const raceDetailsElement = document.getElementById('race-details');
  const sortedCars = [...cars].sort((a, b) => b.gas - a.gas); // Sort cars by gas amount in descending order
  const turnDetails = document.createElement('div');
  turnDetails.innerHTML = `<h3>Turn ${currentTurn}</h3>`;
  sortedCars.forEach(car => {
      const carDetails = document.createElement('div');
      carDetails.innerHTML = `
          <p>Brand: ${car.brand}, Model: ${car.model},
          Year: ${car.year},
          Color: ${car.color},
          Price: $${car.price},
          Gas: ${car.gas.toFixed(2)} liters</p>
      `;
      turnDetails.appendChild(carDetails);
  });
  raceDetailsElement.innerHTML = '';
  raceDetailsElement.appendChild(turnDetails);
}
