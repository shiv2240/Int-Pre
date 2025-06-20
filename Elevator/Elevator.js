class Elevator {
  constructor(floors, currentFloor = 1) {
    this.floors = floors;
    this.currentFloor = currentFloor;
    this.direction = 0;
    this.requests = [];
    this.intervalId = null; // Store interval ID
  }

  requestStop(floor) {
    if (floor >= 1 && floor <= this.floors) {
      if (!this.requests.includes(floor)) {
        this.requests.push(floor);
      }

      // Sort requests based on direction
      if (this.direction === 1) {
        this.requests.sort((a, b) => a - b);
      } else if (this.direction === -1) {
        this.requests.sort((a, b) => b - a);
      }
    } else {
      console.log("Not a valid floor");
    }

    // If the elevator was idle, restart the loop
    if (!this.intervalId) {
      this.run();
    }
  }

  move() {
    if (this.requests.length > 0) {
      const nextFloor = this.requests[0];

      if (nextFloor > this.currentFloor) {
        this.direction = 1;
        this.currentFloor++;
        console.log(`Lift is going to ${this.currentFloor}`);
      } else if (nextFloor < this.currentFloor) {
        this.direction = -1;
        this.currentFloor--;
        console.log(`Lift is going to ${this.currentFloor}`);
      } else {
        console.log(`Lift has arrived at floor ${this.currentFloor}`);
        this.requests.shift();

        if (this.requests.length > 0) {
          const next = this.requests[0];
          this.direction = next > this.currentFloor ? 1 : -1;
        } else {
          this.direction = 0;
        }
      }
    } else {
      this.direction = 0;
      console.log("Lift is idle..");
      clearInterval(this.intervalId); // Stop the loop
      this.intervalId = null;
    }
  }

  run() {
    this.intervalId = setInterval(() => {
      this.move();
    }, 1000);
  }
}

const elevator = new Elevator(10);
elevator.requestStop(5);
elevator.requestStop(8);
elevator.requestStop(3);