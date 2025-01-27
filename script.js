const board = document.getElementById('board');
const resetButton = document.getElementById('resetButton');
const multiplayerButton = document.getElementById('multiplayerButton');
let currentPlayer = 'X'; // Player 'X' starts
let gameOver = false;
let boardState = ['', '', '', '', '', '', '', '', ''];
let playerType = 'human'; // 'human' or 'ai'

// Initialize board cells
function createBoard() {
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

  if (boardState[index] !== '' || gameOver || playerType === 'ai' && currentPlayer === 'O') return;

  boardState[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWinner(currentPlayer)) {
    alert(currentPlayer + ' wins!');
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
    alert('AI wins!');
    gameOver = true;
  }

  currentPlayer = 'X'; // Switch back to human
}

// Multiplayer (simulated for now)
multiplayerButton.addEventListener('click', () => {
  alert('Simulacija povezivanja sa igračima na WiFi... Ovo zahteva backend!');
  // Ovdje bi išao kod za povezivanje sa drugim igračima
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

// Win patterns
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

// Start game
createBoard();
