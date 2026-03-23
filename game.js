// Game Configuration
const CARS = {
    starter: {
        name: 'Starter Car',
        price: 0,
        speed: 3,
        acceleration: 0.2,
        driftPower: 0.5,
        maxSpeed: 8,
        color: '#ff0000'
    },
    sports: {
        name: 'Sports Car',
        price: 5000,
        speed: 5,
        acceleration: 0.35,
        driftPower: 0.8,
        maxSpeed: 12,
        color: '#0000ff'
    },
    supercar: {
        name: 'Supercar',
        price: 15000,
        speed: 7,
        acceleration: 0.5,
        driftPower: 1.2,
        maxSpeed: 15,
        color: '#ffff00'
    },
    legendary: {
        name: 'Legendary',
        price: 50000,
        speed: 10,
        acceleration: 0.7,
        driftPower: 1.8,
        maxSpeed: 20,
        color: '#ff00ff'
    }
};

// Game State
let gameState = {
    money: 0,
    currentCar: 'starter',
    ownedCars: ['starter'],
    isRunning: true,
    startTime: Date.now()
};

// Player Car Object
let player = {
    x: 600,
    y: 350,
    velocityX: 0,
    velocityY: 0,
    angle: 0,
    driftAngle: 0,
    isAccelerating: false,
    isBraking: false,
    isLeftTurning: false,
    isRightTurning: false,
    driftMultiplier: 0
};

// Canvas Setup
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Input Handling
const keys = {};
window.addEventListener('keydown', (e) => {
    keys[e.key.toLowerCase()] = true;
    if (e.key.toLowerCase() === 'm') {
        e.preventDefault();
        toggleShop();
    }
    if (e.key === ' ') {
        e.preventDefault();
        endGame();
    }
});

window.addEventListener('keyup', (e) => {
    keys[e.key.toLowerCase()] = false;
});

// Game Loop
function gameLoop() {
    if (!gameState.isRunning) return;

    updatePlayer();
    drawGame();
    updateHUD();
    requestAnimationFrame(gameLoop);
}

// Update Player Physics
function updatePlayer() {
    const carConfig = CARS[gameState.currentCar];

    // Input Processing
    player.isAccelerating = keys['arrowup'];
    player.isBraking = keys['arrowdown'];
    player.isLeftTurning = keys['arrowleft'];
    player.isRightTurning = keys['arrowright'];

    // Acceleration
    if (player.isAccelerating) {
        const maxVelocity = carConfig.maxSpeed;
        const acceleration = carConfig.acceleration;
        const currentSpeed = Math.sqrt(player.velocityX ** 2 + player.velocityY ** 2);
        
        if (currentSpeed < maxVelocity) {
            player.velocityX += Math.cos(player.angle) * acceleration;
            player.velocityY += Math.sin(player.angle) * acceleration;
        }
    }

    // Braking
    if (player.isBraking) {
        player.velocityX *= 0.92;
        player.velocityY *= 0.92;
    }

    // Natural Friction
    player.velocityX *= 0.98;
    player.velocityY *= 0.98;

    // Turning
    const speed = Math.sqrt(player.velocityX ** 2 + player.velocityY ** 2);
    if (speed > 0.5) {
        const turnSpeed = 0.08 * (speed / carConfig.maxSpeed);
        
        if (player.isLeftTurning) {
            player.angle -= turnSpeed;
            player.driftAngle = Math.min(player.driftAngle + 0.05, Math.PI / 3);
        } else if (player.isRightTurning) {
            player.angle += turnSpeed;
            player.driftAngle = Math.min(player.driftAngle + 0.05, Math.PI / 3);
        } else {
            player.driftAngle *= 0.92;
        }
    } else {
        player.driftAngle *= 0.95;
    }

    // Position Update
    player.x += player.velocityX;
    player.y += player.velocityY;

    // Wall Bouncing
    const carWidth = 40;
    const carHeight = 30;

    if (player.x - carWidth / 2 < 0) {
        player.x = carWidth / 2;
        player.velocityX *= -0.7;
    }
    if (player.x + carWidth / 2 > canvas.width) {
        player.x = canvas.width - carWidth / 2;
        player.velocityX *= -0.7;
    }
    if (player.y - carHeight / 2 < 0) {
        player.y = carHeight / 2;
        player.velocityY *= -0.7;
    }
    if (player.y + carHeight / 2 > canvas.height) {
        player.y = canvas.height - carHeight / 2;
        player.velocityY *= -0.7;
    }

    // Money Earning from Drift
    if (player.driftAngle > 0.1) {
        const driftIntensity = player.driftAngle / (Math.PI / 3);
        const speed = Math.sqrt(player.velocityX ** 2 + player.velocityY ** 2);
        const earnings = (driftIntensity * speed * carConfig.driftPower * 10);
        gameState.money += earnings;
        player.driftMultiplier = driftIntensity;
    } else {
        player.driftMultiplier = 0;
    }
}

// Draw Game
function drawGame() {
    // Clear Canvas
    ctx.fillStyle = '#87ceeb';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw Sky Gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#87ceeb');
    gradient.addColorStop(1, '#e0f6ff');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw Grid
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.lineWidth = 1;
    for (let i = 0; i < canvas.width; i += 50) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.stroke();
    }
    for (let i = 0; i < canvas.height; i += 50) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(canvas.width, i);
        ctx.stroke();
    }

    // Draw Drift Trail
    if (player.driftAngle > 0.1) {
        ctx.fillStyle = `rgba(255, 0, 0, ${player.driftAngle / (Math.PI / 3) * 0.5})`;
        ctx.beginPath();
        ctx.arc(player.x, player.y, 30 + player.driftAngle * 20, 0, Math.PI * 2);
        ctx.fill();
    }

    // Draw Player Car
    const carConfig = CARS[gameState.currentCar];
    ctx.save();
    ctx.translate(player.x, player.y);
    ctx.rotate(player.angle);

    // Car Body
    ctx.fillStyle = carConfig.color;
    ctx.fillRect(-20, -15, 40, 30);

    // Car Top
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.fillRect(-15, -10, 30, 15);

    // Windows
    ctx.fillStyle = 'rgba(100, 150, 255, 0.6)';
    ctx.fillRect(-12, -8, 12, 8);
    ctx.fillRect(0, -8, 12, 8);

    ctx.restore();

    // Draw Speed Lines (Drift Effect)
    if (player.driftMultiplier > 0.3) {
        ctx.strokeStyle = `rgba(255, 100, 0, ${player.driftMultiplier * 0.5})`;
        ctx.lineWidth = 2;
        for (let i = 0; i < 3; i++) {
            const offsetX = Math.random() * 100 - 50;
            const offsetY = Math.random() * 100 - 50;
            ctx.beginPath();
            ctx.moveTo(player.x + offsetX, player.y + offsetY);
            ctx.lineTo(player.x + offsetX - player.velocityX * 5, player.y + offsetY - player.velocityY * 5);
            ctx.stroke();
        }
    }
}

// Update HUD
function updateHUD() {
    document.getElementById('money').textContent = '$' + Math.floor(gameState.money).toLocaleString();
    document.getElementById('carName').textContent = CARS[gameState.currentCar].name;
    document.getElementById('driftMultiplier').textContent = (player.driftMultiplier * 100).toFixed(0) + 'x';
    
    const driftBonus = player.driftAngle > 0.1 ? 
        (player.driftAngle / (Math.PI / 3) * Math.sqrt(player.velocityX ** 2 + player.velocityY ** 2) * CARS[gameState.currentCar].driftPower * 10).toFixed(0) : 
        '0';
    document.getElementById('earningsPerSec').textContent = '$' + driftBonus + '/s';
}

// Shop Functionality
function toggleShop() {
    const modal = document.getElementById('shopModal');
    modal.classList.toggle('hidden');
    
    if (!modal.classList.contains('hidden')) {
        generateShopItems();
    }
}

function generateShopItems() {
    const shopItems = document.getElementById('shopItems');
    shopItems.innerHTML = '';
    document.getElementById('currentMoney').textContent = 'Current Money: $' + Math.floor(gameState.money).toLocaleString();

    Object.entries(CARS).forEach(([key, car]) => {
        const isOwned = gameState.ownedCars.includes(key);
        const isSelected = gameState.currentCar === key;
        
        const itemDiv = document.createElement('div');
        itemDiv.className = 'shop-item';
        
        let buttonText = '';
        let buttonDisabled = false;
        
        if (isSelected) {
            buttonText = 'SELECTED';
            buttonDisabled = true;
        } else if (isOwned) {
            buttonText = 'SELECT';
        } else {
            buttonText = 'BUY';
            if (gameState.money < car.price) {
                buttonDisabled = true;
            }
        }

        itemDiv.innerHTML = `
            <div class="shop-item-info">
                <h3>${car.name}</h3>
                <p>Speed: ${car.speed}/10 | Acceleration: ${(car.acceleration * 100).toFixed(0)}% | Drift: ${(car.driftPower).toFixed(1)}x</p>
                <p>Max Speed: ${car.maxSpeed}</p>
            </div>
            <div class="shop-item-price">$${car.price.toLocaleString()}</div>
            <button class="shop-btn" onclick="handleShopAction('${key}', ${car.price}, ${isOwned})" ${buttonDisabled ? 'disabled' : ''}>
                ${buttonText}
            </button>
        `;
        
        shopItems.appendChild(itemDiv);
    });
}

function handleShopAction(carKey, price, isOwned) {
    if (isOwned) {
        // Select the car
        gameState.currentCar = carKey;
        toggleShop();
    } else {
        // Buy the car
        if (gameState.money >= price) {
            gameState.money -= price;
            gameState.ownedCars.push(carKey);
            gameState.currentCar = carKey;
            generateShopItems();
            saveProgress();
        }
    }
}

// End Game
function endGame() {
    gameState.isRunning = false;
    const gameOverScreen = document.getElementById('gameOverScreen');
    gameOverScreen.classList.remove('hidden');
    
    const duration = Math.floor((Date.now() - gameState.startTime) / 1000);
    document.getElementById('totalMoneyEarned').textContent = '$' + Math.floor(gameState.money).toLocaleString();
    document.getElementById('finalCarName').textContent = CARS[gameState.currentCar].name;
    document.getElementById('carsOwned').textContent = gameState.ownedCars.length;
    document.getElementById('sessionDuration').textContent = duration + 's';
}

// Save/Load Progress
function saveProgress() {
    localStorage.setItem('driftingGameProgress', JSON.stringify(gameState));
}

function loadProgress() {
    const saved = localStorage.getItem('driftingGameProgress');
    if (saved) {
        gameState = JSON.parse(saved);
    }
}

// Initialize and Start Game
loadProgress();
gameLoop();

// Auto-save progress every 5 seconds
setInterval(saveProgress, 5000);
