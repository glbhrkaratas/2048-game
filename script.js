const board = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
];
const boardContainer = document.querySelector(".board");
let score = 0;

// Display function remains the same as you've previously implemented

// Function to assign random value to an empty cell
function assignRandom() {
    let row = Math.floor(Math.random() * 4);
    let col = Math.floor(Math.random() * 4);

    if (board[row][col] === 0) {
        board[row][col] = Math.random() < 0.9 ? 2 : 4;
    } else {
        assignRandom(); // If the cell is not empty, try again
    }
}

// Function to check for game over condition (if no empty cells or no possible moves)
function isGameOver() {
    // Check if there are any empty cells
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            if (board[row][col] === 0) {
                return false;
            }
        }
    }

    // Check if there are any possible moves (horizontal and vertical)
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            if (
                (col < 3 && board[row][col] === board[row][col + 1]) ||
                (row < 3 && board[row][col] === board[row + 1][col])
            ) {
                return false;
            }
        }
    }

    return true; // No empty cells and no possible moves
}

// Function to update the board display
function updateBoard() {
    let cellIndex = 0;
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            let cell = boardContainer.children[cellIndex];
            cell.innerText = board[row][col] !== 0 ? board[row][col] : '';
            cell.style.backgroundColor = changeColor(row, col);
            cellIndex++;
        }
    }
}
// Function to move tiles UP
function moveUp() {
    for (let col = 0; col < 4; col++) {
        for (let row = 1; row < 4; row++) {
            if (board[row][col] !== 0) {
                let currentRow = row;
                while (currentRow > 0) {
                    const prevRow = currentRow - 1;
                    if (board[prevRow][col] === 0) {
                        board[prevRow][col] = board[currentRow][col];
                        board[currentRow][col] = 0;
                        currentRow--;
                    } else if (board[prevRow][col] === board[currentRow][col]) {
                        board[prevRow][col] *= 2;
                        score += board[prevRow][col];
                        board[currentRow][col] = 0;
                        break;
                    } else {
                        break;
                    }
                }
            }
        }
    }
}
function moveDown() {
    for (let col = 0; col < 4; col++) {
        for (let row = 2; row >= 0; row--) {
            if (board[row][col] !== 0) {
                let currentRow = row;
                while (currentRow < 3) {
                    const nextRow = currentRow + 1;
                    if (board[nextRow][col] === 0) {
                        board[nextRow][col] = board[currentRow][col];
                        board[currentRow][col] = 0;
                        currentRow++;
                    } else if (board[nextRow][col] === board[currentRow][col]) {
                        board[nextRow][col] *= 2;
                        score += board[nextRow][col];
                        board[currentRow][col] = 0;
                        break;
                    } else {
                        break;
                    }
                }
            }
        }
    }
}

// Function to move tiles LEFT
function moveLeft() {
    for (let row = 0; row < 4; row++) {
        for (let col = 1; col < 4; col++) {
            if (board[row][col] !== 0) {
                let currentCol = col;
                while (currentCol > 0) {
                    const prevCol = currentCol - 1;
                    if (board[row][prevCol] === 0) {
                        board[row][prevCol] = board[row][currentCol];
                        board[row][currentCol] = 0;
                        currentCol--;
                    } else if (board[row][prevCol] === board[row][currentCol]) {
                        board[row][prevCol] *= 2;
                        score += board[row][prevCol];
                        board[row][currentCol] = 0;
                        break;
                    } else {
                        break;
                    }
                }
            }
        }
    }
}

// Function to move tiles RIGHT
function moveRight() {
    for (let row = 0; row < 4; row++) {
        for (let col = 2; col >= 0; col--) {
            if (board[row][col] !== 0) {
                let currentCol = col;
                while (currentCol < 3) {
                    const nextCol = currentCol + 1;
                    if (board[row][nextCol] === 0) {
                        board[row][nextCol] = board[row][currentCol];
                        board[row][currentCol] = 0;
                        currentCol++;
                    } else if (board[row][nextCol] === board[row][currentCol]) {
                        board[row][nextCol] *= 2;
                        score += board[row][nextCol];
                        board[row][currentCol] = 0;
                        break;
                    } else {
                        break;
                    }
                }
            }
        }
    }
}




// Event listener for keyboard arrow keys
document.addEventListener('keydown', (e) => {
    switch (e.key) {
        case "ArrowUp":
            moveUp();
            break;
        case "ArrowDown":
            moveDown();
            break;
        case "ArrowLeft":
            moveLeft();
            break;
        case "ArrowRight":
            moveRight();
            break;
        default:
            return;
    }
    
    if (!isGameOver()) {
        assignRandom(); // If the game is not over, assign a random cell
        updateBoard(); // Update the board after the move
    } else {
        console.log("Game Over!");
        // Perform actions for game over state
    }
});

// Your existing color change function
function changeColor(row, col) {
    let value = board[row][col];
    return `hsla(220, ${(100 / 12) * Math.log2(value)}%, ${100 - Math.log2(value) * 12}%,${100 - Math.log2(value) / 12}%)`;
}

// Initialize the game by assigning initial values and updating the board
function initializeGame() {
    assignRandom();
    assignRandom();
    updateBoard();
}

initializeGame(); // Start the game when the page loads
