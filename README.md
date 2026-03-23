# 🏎️ Drifting Game

A fun and addictive web-based drifting game where you earn money from drifting and can upgrade to better cars!

## 🎮 Game Features

- **Drift to Earn**: The more you drift and the bigger your drift angle, the more money you earn
- **Progressive Difficulty**: Better cars have improved stats and earn more money
- **Car Progression System**: 4 different cars with unique characteristics
  - Starter Car (Free) - Basic vehicle to get started
  - Sports Car ($5,000) - Better handling and drift capability
  - Supercar ($15,000) - High-performance machine
  - Legendary ($50,000) - Ultimate drifting machine
  
- **Persistent Progress**: Your money and owned cars are saved to browser storage
- **Real-time Stats**: Watch your drift multiplier and earnings in real-time
- **Smooth Physics**: Car acceleration, deceleration, and drift mechanics

## 🎮 How to Play

### Controls
- **⬆️** - Accelerate
- **⬇️** - Brake  
- **⬅️** - Turn Left
- **➡️** - Turn Right
- **M** - Open/Close Car Shop
- **Space** - End Game

### Gameplay
1. Drive around the arena and perform drifts
2. The greater the drift angle, the more money you earn per frame
3. Earn money to purchase better cars in the shop (Press M)
4. Better cars drift better and earn more money
5. Continue upgrading cars and unlocking all vehicles

## 📊 Car Stats

| Car | Price | Speed | Acceleration | Drift Power | Max Speed |
|-----|-------|-------|--------------|-------------|-----------| 
| Starter | Free | 3/10 | 20% | 0.5 | 8 |
| Sports | $5,000 | 5/10 | 35% | 0.8 | 12 |
| Supercar | $15,000 | 7/10 | 50% | 1.2 | 15 |
| Legendary | $50,000 | 10/10 | 70% | 1.8 | 20 |

## 🎯 Strategy Tips

1. **Start Simple**: Get comfortable with the controls using the Starter Car
2. **Build Capital**: Drift in the arena to accumulate money for your first upgrade
3. **Progressive Upgrades**: Buy the Sports Car first, then work toward Supercar and Legendary
4. **Tight Drifts**: Try to drift at higher speeds for maximum money per frame
5. **Use Wall Bounces**: Use arena walls strategically to change direction for complex drifts

## 💾 Data Persistence

Your game progress is automatically saved to your browser's localStorage. This includes:
- Total money earned
- Currently selected car
- List of owned cars

Your progress persists even after closing the browser!

## 🛠️ Technical Stack

- **Frontend**: Vanilla JavaScript, HTML5 Canvas
- **Physics**: Custom 2D physics engine for car dynamics
- **Storage**: Browser localStorage for progress persistence
- **Styling**: Pure CSS with animations

## 📦 Files

- `index.html` - Main game structure and UI
- `style.css` - Game styling and animations
- `game.js` - Complete game logic and physics

## 🚀 How to Run

1. Clone the repository
2. Open `index.html` in your web browser
3. Start drifting and earning money!

No server or build tools required - play directly in your browser!

## 🎨 Customization

You can easily customize the game by editing `game.js`:
- Modify car stats in the `CARS` object
- Adjust money earning rates
- Change car colors
- Add new vehicles
- Adjust game physics and controls

---

Enjoy your drifting experience! 🏁
