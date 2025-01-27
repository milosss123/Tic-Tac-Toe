const board = document.getElementById('board');
const resetButton = document.getElementById('resetButton');
let currentPlayer = 'X'; // Player 'X' starts
let gameOver = false;
let boardState = ['', '', '', '', '', '', '', '', ''];

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
  
  if (boardState[index] !== '' || gameOver) return;

  boardState[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWinner(currentPlayer)) {
    alert(currentPlayer + ' wins!');
    gameOver = true;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // Switch player
  if (currentPlayer === 'O' && !gameOver) aiMove();
}

// Check if a player has won
function checkWinner(player) {
  return winPatterns.some(pattern => {
    return pattern.every(index => boardState[index] === player);
  });
}

// AI move
function aiMove() {
  let bestMove = minimax(boardState, 'O');
  boardState[bestMove] = 'O';
  const aiCell = board.children[bestMove];
  aiCell.textContent = 'O';

  if (checkWinner('O')) {
    alert('AI wins!');
    gameOver = true;
  }

  currentPlayer = 'X'; // Switch back to human
}

// Minimax algorithm for AI
function minimax(board, player) {
  const availableMoves = board
    .map((cell, index) => (cell === '' ? index : null))
    .filter(index => index !== null);

  if (checkWinner('X')) return -1;
  if (checkWinner('O')) return 1;
  if (availableMoves.length === 0) return 0;

  let bestMove = null;
  let bestScore = player === 'O' ? -Infinity : Infinity;

  availableMoves.forEach(move => {
    board[move] = player;
    const score = minimax(board, player === 'O' ? 'X' : 'O');
    board[move] = '';

    if (player === 'O' && score > bestScore) {
      bestScore = score;
      bestMove = move;
    } else if (player === 'X' && score < bestScore) {
      bestScore = score;
      bestMove = move;
    }
  });

  return bestMove;
}

// Reset game
resetButton.addEventListener('click', () => {
  boardState = ['', '', '', '', '', '', '', '', ''];
  gameOver = false;
  currentPlayer = 'X';
  Array.from(board.children).forEach(cell => {
    cell.textContent = '';
  });
});

// Start game
createBoard();
