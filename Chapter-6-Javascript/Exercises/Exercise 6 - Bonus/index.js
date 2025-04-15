// Game variables
let score = 0;
let highScore = 0;
let lives = 3;
let correctColor = null;
let gameActive = true;

// DOM elements
const rgbDisplay = document.getElementById('rgb-display');
const colorOptions = document.getElementById('color-options');
const messageDisplay = document.getElementById('message');
const scoreDisplay = document.getElementById('score');
const highScoreDisplay = document.getElementById('high-score');
const livesContainer = document.getElementById('lives-container');
const gameOverScreen = document.getElementById('game-over');
const finalScoreDisplay = document.getElementById('final-score');
const playAgainBtn = document.getElementById('play-again');
const newColorsBtn = document.getElementById('new-colors');

// Start the game
function init() {
    // Reset game state
    score = 0;
    lives = 3;
    gameActive = true;
    
    // Update UI
    scoreDisplay.textContent = score;
    updateLives();
    
    // Hides game over screen
    gameOverScreen.style.display = 'none';
    
    // Sets up new colors
    setupNewColors();
}

// Sets up new colors for the game
function setupNewColors() {
    // Clears message
    messageDisplay.textContent = '';
    
    // Generates colors
    const colors = [];
    for (let i = 0; i < 6; i++) {
        colors.push(generateRandomColor());
    }
    
    // Pick a random color to be the correct answer
    const correctIndex = Math.floor(Math.random() * colors.length);
    correctColor = colors[correctIndex];
    
    // Update sRGB display
    rgbDisplay.textContent = `RGB(${correctColor.r}, ${correctColor.g}, ${correctColor.b})`;
    
    // Creates color squares
    colorOptions.innerHTML = '';
    colors.forEach((color, index) => {
        // Creates div for the color
        const square = document.createElement('div');
        square.className = 'color-square';
        square.style.backgroundColor = `rgb(${color.r}, ${color.g}, ${color.b})`;
        
        // Adds click event
        square.addEventListener('click', function() {
            if (!gameActive) return;
            
            if (index === correctIndex) {
                // Correct guess
                messageDisplay.textContent = 'Correct!';
                messageDisplay.style.color = 'green';
                
                // Updates score
                score += 100;
                scoreDisplay.textContent = score;
                
                // Updates high score if needed
                if (score > highScore) {
                    highScore = score;
                    highScoreDisplay.textContent = highScore;
                    localStorage.setItem('rgbGameHighScore', highScore);
                }
                
                // Sets up new colors after a delay
                setTimeout(setupNewColors, 1500);
            } else {
                // Wrong guess
                messageDisplay.textContent = 'Try Again!';
                messageDisplay.style.color = 'red';
                
                // Makes this square fade
                this.style.opacity = '0.3';
                
                // Reduce lives
                lives--;
                updateLives();
                
                // Checks if game over
                if (lives <= 0) {
                    endGame();
                }
            }
        });
        
        colorOptions.appendChild(square);
    });
}

// Generates a random RGB color
function generateRandomColor() {
    return {
        r: Math.floor(Math.random() * 256),
        g: Math.floor(Math.random() * 256),
        b: Math.floor(Math.random() * 256)
    };
}

// Updates the lives display
function updateLives() {
    livesContainer.innerHTML = '';
    
    for (let i = 0; i < lives; i++) {
        const life = document.createElement('div');
        life.className = 'life';
        life.textContent = '❤️';
        livesContainer.appendChild(life);
    }
}

// Ends the game
function endGame() {
    gameActive = false;
    
    // Shows all correct colors
    const squares = document.querySelectorAll('.color-square');
    squares.forEach(square => {
        square.style.backgroundColor = `rgb(${correctColor.r}, ${correctColor.g}, ${correctColor.b})`;
        square.style.opacity = '1';
    });
    
    messageDisplay.textContent = 'Game Over!';
    messageDisplay.style.color = 'black';
    
    // Shows game over screen
    finalScoreDisplay.textContent = score;
    gameOverScreen.style.display = 'block';
}

// Event listeners
playAgainBtn.addEventListener('click', init);
newColorsBtn.addEventListener('click', setupNewColors);

// Loads high score from local storage
if (localStorage.getItem('rgbGameHighScore')) {
    highScore = parseInt(localStorage.getItem('rgbGameHighScore'));
    highScoreDisplay.textContent = highScore;
}

// Initializes the game
init();