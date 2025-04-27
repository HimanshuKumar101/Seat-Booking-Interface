//1. Grab the elements form the html
const rowsInput = document.getElementById("rows");
const colsInput = document.getElementById("cols");
const blockedInput = document.getElementById("blockedseats");
const generateButton = document.getElementById("generate");
const seatsGrid = document.getElementById("seats");
const seatsContainer = document.getElementById("seats-container");
const bookedCountDisplay = document.getElementById("booked-count");

//2 add click event to generate button

generateButton.addEventListener("click", () => {
  const row = parseInt(rowsInput.value);
  const col = parseInt(colsInput.value);
  const blocked = parseInt(blockedInput.value);

  const totalSeats = row * col;
  if (blocked > totalSeats) {
    alert("Blocked seats can't be more than total seats!");
    return;
  }

  bookedCountDisplay.innerText = `Total Booked Seats: 0`;
  seatsGrid.innerHTML = "";
  seatsGrid.style.display = "grid";
  seatsGrid.style.gridTemplateColumns = `repeat(${col}, 1fr)`;

  // Step 1: Create seats
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      const seat = document.createElement("div");
      seat.classList.add("seat");
      seat.dataset.row = i;
      seat.dataset.col = j;
      seatsGrid.appendChild(seat);
    }
  }

  // Step 2: Block random seats
  const allSeats = Array.from(seatsGrid.querySelectorAll(".seat"));

  const blockedSeatsSet = new Set();
  while (blockedSeatsSet.size < blocked) {
    const randomIndex = Math.floor(Math.random() * allSeats.length);
    blockedSeatsSet.add(allSeats[randomIndex]);
  }

  blockedSeatsSet.forEach((seat) => {
    seat.classList.add("blocked");
    seat.style.pointerEvents = "none"; // prevent clicking
  });

  let bookedCount = 0;

  //step 3 handlee the seat booking / unbooking

  allSeats.forEach((seat) => {
    if (!seat.classList.contains("blocked")) {
      seat.addEventListener("click", () => {
        //unhook the seat if it is already booked

        if (seat.classList.contains("booked")) {
          //unbook the seat
          seat.classList.remove("booked");
          seat.style.backgroundColor = "limegreen";
          bookedCount++;
        } else {
          seat.classList.add("booked");
          seat.style.backgroundColor = "gray";
          bookedCount--;
        }

        //update the booked count display
        bookedCountDisplay.innerText = `Total Booked Seats: ${-bookedCount}`;
      });
    }
  });
});
