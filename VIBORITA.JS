const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gridSize = 20;
const canvasSize = 600;
let snake = [{ x: 240, y: 240 }];
let direction = { x: gridSize, y: 0 };
let apple = { x: 0, y: 0 };
let obstacles = [];
let score = 0;
let level = 1;
let gameSpeed = 100;
let gameInterval;
let gameOver = false;

// Función para reiniciar el juego
function restartGame() {
    snake = [{ x: 240, y: 240 }];
    direction = { x: gridSize, y: 0 };
    apple = { x: 0, y: 0 };
    obstacles = [];
    score = 0;
    level = 1;
    gameSpeed = 100;
    gameOver = false;
    document.getElementById("message").style.display = "none";
    document.getElementById("restartBtn").style.display = "none";
    generateApple();
    gameInterval = setInterval(updateGame, gameSpeed);
    showInfo();
}

// Mostrar la información en la parte superior derecha
function showInfo() {
    document.getElementById("score").textContent = "Manzanas: " + score;
    document.getElementById("level").textContent = "Nivel: " + level;
}

// Generar una manzana en una posición aleatoria
function generateApple() {
    apple.x = Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize;
    apple.y = Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize;
}

// Generar un obstáculo en una posición aleatoria
function generateObstacle() {
    if (level <= 10) {
        let obstacle = {
            x: Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize,
            y: Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize,
        };
        obstacles.push(obstacle);
    }
}

// Actualizar la posición de la serpiente
function updateSnake() {
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

    // Verificar colisiones con el borde
    if (head.x < 0 || head.x >= canvasSize || head.y < 0 || head.y >= canvasSize) {
        gameOver = true;
        showRestartButton();
    }

    // Verificar colisiones con el cuerpo de la serpiente
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            gameOver = true;
            showRestartButton();
        }
    }

    // Verificar colisiones con los obstáculos
    for (let obstacle of obstacles) {
        if (head.x === obstacle.x && head.y === obstacle.y) {
            gameOver = true;
            showRestartButton();
        }
    }

    snake.unshift(head);
}

// Comprobar si la serpiente comió la manzana
function checkAppleCollision() {
    if (snake[0].x === apple.x && snake[0].y === apple.y) {
        score++;
        if (score % 10 === 0) {
            level++;
            if (level <= 10) {
                gameSpeed -= 10; // Aumentar la velocidad
            }
            generateObstacle(); // Añadir un obstáculo
        }
        generateApple();
    } else {
        snake.pop();
    }
}

// Dibuja la serpiente
function drawSnake() {
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = "green";
        ctx.fillRect(snake[i].x, snake[i].y, gridSize, gridSize);
    }
}

// Dibuja la manzana
function drawApple() {
    ctx.fillStyle = "red";
    ctx.fillRect(apple.x, apple.y, gridSize, gridSize);
}

// Dibuja los obstáculos
function drawObstacles() {
    ctx.fillStyle = "brown";
    for (let obstacle of obstacles) {
        ctx.fillRect(obstacle.x, obstacle.y, gridSize, gridSize);
    }
}

// Mostrar el mensaje de fin de juego
function drawGameOver() {
    document.getElementById("message").innerText = "¡Felicidades! Has completado el juego.";
    document.getElementById("message").style.display = "block";
}

// Mostrar el botón de reinicio
function showRestartButton() {
    document.getElementById("restartBtn").style.display = "inline-block";
}

// Función principal para actualizar el juego
function updateGame() {
    if (gameOver || level > 10) {
        clearInterval(gameInterval);
        if (level > 10) {
            drawGameOver();
        }
        return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    updateSnake();
    checkAppleCollision();
    drawSnake();
    drawApple();
    drawObstacles();
    showInfo();
}

// Mover la serpiente con las teclas de dirección
document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowUp" && direction.y === 0) {
        direction = { x: 0, y: -gridSize };
    } else if (e.key === "ArrowDown" && direction.y === 0) {
        direction = { x: 0, y: gridSize };
    } else if (e.key === "ArrowLeft" && direction.x === 0) {
        direction = { x: -gridSize, y: 0 };
    } else if (e.key === "ArrowRight" && direction.x === 0) {
        direction = { x: gridSize, y: 0 };
    }
});

// Iniciar el juego
function startGame() {
    generateApple();
    gameInterval = setInterval(updateGame, gameSpeed);
}

startGame();

// Lógica para reiniciar el juego cuando se hace clic en el botón
document.getElementById("restartBtn").addEventListener("click", function() {
    restartGame();
});
