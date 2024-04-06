let currentFloor = 1;
let moving = false;
const floorSts = document.getElementById("curFor");
const elevator = document.getElementById("elevator");
const leftDoor = document.getElementById("leftDoor");
const rightDoor = document.getElementById("rightDoor");
const moveElevator = (floor) => {
  if (!elevator || !leftDoor || !rightDoor) {
    console.error("Could not find necessary elements.");
    return;
  }
  const targetPosition = 320 - floor * 80;
    moving = true;
  // Close the doors before moving
  leftDoor.style.left = "0";
  rightDoor.style.left = "25px";

  setTimeout(() => {
    // Doors are closed completely, now move the elevator
    elevator.style.top = `${targetPosition}px`;

    setTimeout(() => {
      // Elevator has reached the destination floor, now open the doors
      leftDoor.style.left = "-25px";
      rightDoor.style.left = "50px";

      setTimeout(() => {
        currentFloor = floor;
        moving = false;
        updateDisplay();
      }, 500); // Delay for door opening animation
    }, 1000); // Simulate 1 second travel time
  }, 1000); // Simulate 1 second delay before closing doors
}

const requestElevator=(floor)=> {
  if (moving) {
    console.log("Elevator is already in motion. Please wait.");
    return;
  }
  if (floor === currentFloor) {
    console.log("Elevator is already on this floor.");
  } else {
    moveElevator(floor);
  }
}

const updateDisplay=()=> {
  const floorButtonsDiv = document.getElementById("floor-buttons");
  floorSts.innerHTML = `<p>Elevator is on the ${currentFloor} floor</p>`;

  const floorButtons = floorButtonsDiv.getElementsByClassName("floor-button");
  for (let i = 0; i < floorButtons.length; i++) {
    floorButtons[i].style.pointerEvents = moving ? "none" : "auto";
  }
}

updateDisplay(); // Initial display update
