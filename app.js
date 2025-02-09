// Select all boxes, buttons, and message container
let boxes = document.querySelectorAll(".box");
let resetGame = document.querySelector("#reset-game");
let newGame = document.querySelector("#new-game");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true; // 'O' will start first
let count = 0; // To track the number of moves

// Winning patterns (sets of three boxes that need to be in a line to win)
const winPatterns = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

// Function to reset the game
const resetGameFunc = () => {
  turnO = true; // Reset turn to 'O' first
  count = 0; // Reset move count
  enableBoxes(); // Enable all boxes again
  msgContainer.classList.add("hide"); // Hide the winner message
};

// Add click event to all boxes
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    // If it's 'O's turn, put 'O', otherwise put 'X'
    box.innerText = turnO ? "O" : "X";
    box.classList.add(turnO ? "o-marker" : "x-marker");
    turnO = !turnO; // Switch turn
    box.disabled = true; // Disable the box after it's clicked
    count++; // Increase move count
    
    let winner = checkWinner(); // Check if there's a winner
    if (count === 9 && !winner) {
      gameDraw(); // If all 9 moves are played and no winner, declare a draw
    }
  });
});

// Function to handle a draw
const gameDraw = () => {
  msg.innerText = "Match Draw!"; // Show draw message
  msgContainer.classList.remove("hide");
  disableBoxes(); // Disable all boxes
};

// Function to disable all boxes
const disableBoxes = () => {
  boxes.forEach(box => box.disabled = true);
};

// Function to enable all boxes again (for new game)
const enableBoxes = () => {
  boxes.forEach(box => {
    box.disabled = false;
    box.innerText = ""; // Clear the box content
    box.classList.remove("win"); // Remove winner highlight
  });
};

// Function to show the winner
const showWinner = (winner, pattern) => {
  msg.innerText = `🎉 ${winner} Wins! 🎉`; // Display winner message
  pattern.forEach(index => boxes[index].classList.add("win")); // Highlight winning boxes
  msgContainer.classList.remove("hide");
  disableBoxes(); // Disable all boxes
};

// Function to check for a winner
const checkWinner = () => {
  for (let pattern of winPatterns) {
    let [a, b, c] = pattern; // Get the three indices of a winning pattern
    let pos1 = boxes[a].innerText;
    let pos2 = boxes[b].innerText;
    let pos3 = boxes[c].innerText;

    // If all three boxes have the same non-empty value, declare the winner
    if (pos1 && pos1 === pos2 && pos2 === pos3) {
      showWinner(pos1, pattern);
      return true;
    }
  }
  return false; // No winner found
};

// Add event listeners to New Game and Reset buttons
newGame.addEventListener("click", resetGameFunc);
resetGame.addEventListener("click", resetGameFunc);
