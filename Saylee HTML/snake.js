const board = document.getElementById('game-board');
const scoreElement = document.getElementById('score');

// Game constants
const boardSize = 20;
const tileCount = boardSize;  // Number of tiles in one row or column (20x20 grid)
const tileSize = 400 / tileCount;  // Size of each tile based on the board size

// Game variables
let snake = [{ x: 10, y: 10 }];  // Initial snake
let food = { x: 5, y: 5 };  // Initial food position
let direction = { x: 0, y: 0 };  // Direction (right initially)
let score = 0;
let gameOver = false;

// Start game loop
function gameLoop() {
    if (gameOver) {
        alert("Game Over! Your score was: " + score);
        document.location.reload();
        return;
    }

    moveSnake();
    if (checkCollision()) {
        gameOver = true;
    } else {
        checkFoodCollision();
        drawGame();
        setTimeout(gameLoop, 100);  // Run game loop every 100ms
    }
}

// Function to move snake
function moveSnake() {
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    snake.unshift(head);
    snake.pop();
}

// Function to check for collision with wall or self
function checkCollision() {
    const head = snake[0];

    // Check wall collision
    if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
        return true;
    }

    // Check self-collision
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === head.x && snake[i].y === head.y) {
            return true;
        }
    }

    return false;
}

// Function to check if snake eats food
function checkFoodCollision() {
    const head = snake[0];

    if (head.x === food.x && head.y === food.y) {
        score++;
        scoreElement.innerText = score;
        snake.push({});  // Add a new segment to the snake
        placeFood();
    }
}

// Function to place food at a random position
function placeFood() {
    food.x = Math.floor(Math.random() * tileCount);
    food.y = Math.floor(Math.random() * tileCount);
}

// Function to draw the snake and food on the board
function drawGame() {
    board.innerHTML = '';  // Clear the board

    // Draw the snake
    snake.forEach(segment => {
        const snakeElement = document.createElement('div');
        snakeElement.style.left = segment.x * tileSize + 'px';
        snakeElement.style.top = segment.y * tileSize + 'px';
        snakeElement.classList.add('snake');
        board.appendChild(snakeElement);
    });

    // Draw the food
    const foodElement = document.createElement('div');
    foodElement.style.left = food.x * tileSize + 'px';
    foodElement.style.top = food.y * tileSize + 'px';
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}

// Handle keyboard input for snake movement
window.addEventListener('keydown', event => {
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
});

// Start the game
placeFood();
gameLoop();
