# drifting-game
A fun web-based drifting game where you earn money and upgrade cars
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Drifting Game</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="game-container">
        <canvas id="gameCanvas" width="1200" height="700"></canvas>
        
        <div class="hud">
            <div class="hud-section">
                <h3>💰 Money</h3>
                <p id="money">$0</p>
            </div>
            <div class="hud-section">
                <h3>🚗 Car</h3>
                <p id="carName">Starter Car</p>
            </div>
            <div class="hud-section">
                <h3>📈 Drift</h3>
                <p id="driftMultiplier">0x</p>
            </div>
            <div class="hud-section">
                <h3>💵 Earnings/s</h3>
                <p id="earningsPerSec">$0</p>
            </div>
        </div>

        <div class="controls-info">
            <p>⬆️⬇️⬅️➡️ Drive | <span class="highlight">M</span> Shop | <span class="highlight">Space</span> End Game</p>
        </div>

        <div id="shopModal" class="modal hidden">
            <div class="modal-content">
                <div class="modal-header">
                    <h2>🏪 Car Shop</h2>
                    <button class="close-btn" onclick="toggleShop()">&times;</button>
                </div>
                <div class="modal-body">
                    <div id="shopItems" class="shop-items"></div>
                </div>
                <div class="modal-footer">
                    <p id="currentMoney" class="current-money">Current Money: $0</p>
                </div>
            </div>
        </div>

        <div id="gameOverScreen" class="game-over-screen hidden">
            <div class="game-over-content">
                <h1>GAME OVER</h1>
                <div class="stats">
                    <p>Total Money Earned: <span id="totalMoneyEarned">$0</span></p>
                    <p>Current Car: <span id="finalCarName">Starter Car</span></p>
                    <p>Cars Owned: <span id="carsOwned">1</span></p>
                    <p>Session Duration: <span id="sessionDuration">0s</span></p>
                </div>
                <button class="restart-btn" onclick="location.reload()">Play Again</button>
            </div>
        </div>
    </div>

    <script src="game.js"></script>
</body>
</html>
