const boardSize = 20;
const gameBoard = document.getElementById('game-board');
const scoreElement = document.getElementById('score');
const highScoreElement = document.getElementById('high-score');
const highScoreBadge = document.getElementById('high-score-badge');
let snake = [{ x: 15, y: 15 }];
let direction = { x: 0, y: 0 };
let food = { x: 20, y: 20 };
let gameInterval;
let score = 0;
let highScore = localStorage.getItem('highScore') || 0;

highScoreElement.textContent = `High Score: ${highScore}`;

function createBoard() {
    gameBoard.innerHTML = '';
    snake.forEach(segment => {
        const snakeElement = document.createElement('div');
        snakeElement.style.left = `${segment.x * boardSize}px`;
        snakeElement.style.top = `${segment.y * boardSize}px`;
        snakeElement.classList.add('snake');
        gameBoard.appendChild(snakeElement);
    });

    const foodElement = document.createElement('div');
    foodElement.style.left = `${food.x * boardSize}px`;
    foodElement.style.top = `${food.y * boardSize}px`;
    foodElement.classList.add('food');
    gameBoard.appendChild(foodElement);
}

function moveSnake() {
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        placeFood();
        score++;
        if (score > highScore) {
            highScore = score;
            localStorage.setItem('highScore', highScore);
            scoreElement.textContent = `Score: ${score}`;
            highScoreElement.textContent = `High Score: ${highScore}`;
            highScoreBadge.classList.remove('hidden');
        } else {
            scoreElement.textContent = `Score: ${score}`;
        }
    } else {
        snake.pop();
    }

    if (head.x < 0 || head.x >= gameBoard.clientWidth / boardSize || head.y < 0 || head.y >= gameBoard.clientHeight / boardSize || snakeCollision(head)) {
        clearInterval(gameInterval);
        alert('Game Over');
        resetGame();
    }
}

function snakeCollision(head) {
    return snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y);
}

function placeFood() {
    food = {
        x: Math.floor(Math.random() * gameBoard.clientWidth / boardSize),
        y: Math.floor(Math.random() * gameBoard.clientHeight / boardSize)
    };
}

function changeDirection(event) {
    switch (event.key) {
        case 'ArrowUp':
            if (direction.y === 0) direction = { x: 0, y: -1 };
            break;
        case 'ArrowDown':
            if (direction.y === 0) direction = { x: 0, y: 1 };
            break;
        case 'ArrowLeft':
            if (direction.x === 0) direction = { x: -1, y: 0 };
            break;
        case 'ArrowRight':
            if (direction.x === 0) direction = { x: 1, y: 0 };
            break;
    }
}

document.addEventListener('keydown', changeDirection);

function gameLoop() {
    moveSnake();
    createBoard();
}

function resetGame() {
    snake = [{ x: 15, y: 15 }];
    direction = { x: 0, y: 0 };
    food = { x: 20, y: 20 };
    score = 0;
    scoreElement.textContent = `Score: ${score}`;
    highScoreBadge.classList.add('hidden');
    gameInterval = setInterval(gameLoop, 100);
}

gameInterval = setInterval(gameLoop, 100);

document.addEventListener('DOMContentLoaded', function () {
    const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#000000', '#FF5733', '#FF8C00', '#FFD700', '#ADFF2F', '#00FF7F', '#00CED1', '#1E90FF', '#9370DB', '#FF1493', '#000000'];
    let colorIndex = 0;

    setInterval(() => {
        document.body.style.backgroundColor = colors[colorIndex];
        colorIndex = (colorIndex + 1) % colors.length;
    }, 5000);
});