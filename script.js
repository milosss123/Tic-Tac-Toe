const board = document.getElementById('board');
const resetButton = document.getElementById('resetButton');
const aiModeButton = document.getElementById('aiModeButton');
const multiplayerModeButton = document.getElementById('multiplayerModeButton');
let currentPlayer = 'X'; // Player 'X' starts
let gameOver = false;
let boardState = ['', '', '', '', '', '', '', '', ''];
let playerType = ''; // 'human', 'ai', 'multiplayer'
let gameMode = 'ai'; // 'ai' or 'multiplayer'

// Initialize board cells
function createBoard() {
  board.innerHTML = '';
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.setAttribute('data-index', i);
    cell.addEventListener('click', handleCellClick);
    board.appendChild(cell);
  }
}

// Handle cell click
function handleCellClick(e) {
  const index = e.target.getAttribute('data-index');

  if (boardState[index] !== '' || gameOver) return;

  boardState[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWinner(currentPlayer)) {
    alert(currentPlayer + ' je pobedio!');
    gameOver = true;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // Switch player

  if (currentPlayer === 'O' && playerType === 'ai' && !gameOver) {
    aiMove();
  }
}

// Check if a player has won
function checkWinner(player) {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  return winPatterns.some(pattern => {
    return pattern.every(index => boardState[index] === player);
  });
}

// AI move (random placement)
function aiMove() {
  let availableMoves = boardState
    .map((cell, index) => (cell === '' ? index : null))
    .filter(index => index !== null);

  if (availableMoves.length === 0) return;

  let randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
  boardState[randomMove] = 'O';
  const aiCell = board.children[randomMove];
  aiCell.textContent = 'O';

  if (checkWinner('O')) {
    alert('Izgubio si!');
    gameOver = true;
  }

  currentPlayer = 'X'; // Switch back to human
}


// Start AI game mode
aiModeButton.addEventListener('click', () => {
  gameMode = 'ai';
  playerType = 'ai';
  currentPlayer = 'X';
  gameOver = false;
  createBoard();
});

// Reset game
resetButton.addEventListener('click', () => {
  boardState = ['', '', '', '', '', '', '', '', ''];
  gameOver = false;
  currentPlayer = 'X';
  Array.from(board.children).forEach(cell => {
    cell.textContent = '';
  });
});
