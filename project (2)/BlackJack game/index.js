//Player object with name and initial chips
let player = {
    name: "Ika",
    chips: 300
}

// Array to store player's cards
let cards = []
let sum = 0 // sum of the value of player's cards
let hasBlackJack = false // flag indicating whether the player has Blackjack
let isAlive = false // Flag indicating whether the player is still in the game
let message = "" // Message displayed to the player

////Get references to HTML elements using their IDs
let messageEl = document.getElementById("message-el") 
let sumEl = document.getElementById("sum-el")
let cardsEl = document.getElementById("cards-el")
let playerEl = document.getElementById("player-el")

//Display player's name and initial chips in the HTML
playerEl.textContent = player.name + ": $" + player.chips

//Function to get a random card value(1 to 11 or 10)
function getRandomCard() {
    let randomNumber = Math.floor( Math.random()*13) + 1
    if (randomNumber > 10) {
        return 10
    } else if (randomNumber === 1) {
        return 11
    } else {
        return randomNumber
    }
}

// Function to start the game by dealing two initial cards
function startGame() {
    isAlive = true
    let firstCard = getRandomCard()
    let secondCard = getRandomCard()
    cards = [firstCard, secondCard]
    sum = firstCard + secondCard
    renderGame()
    updatePlayerInfo();
}

//Function to update the display of cards, sum, and game message
function renderGame() {
    cardsEl.textContent = "Cards: " 
    for (let i = 0; i < cards.length; i++) {
        cardsEl.textContent += cards[i] + " "
    }
    sumEl.textContent = "sum: " + sum
    if (sum <= 20) {
    message = "Do you want to draw  a new card?"
} else if (sum === 21) {
   message = "Wohoo! You got a blackjack"
    hasBlackJack = true
    updatePlayerInfo(true)
} else {
   message = "You are out of game!"
    isAlive = false
   }

   messageEl.textContent = message
}

function updatePlayerInfo(add=false) {
    let betAmount = 10;
    if(add === false){
        player.chips -= betAmount
    }
    else if(add === true){
        player.chips += betAmount
    }
    playerEl.textContent = player.name + ": $" + player.chips;
}

//Function to draw a new card and update the game
function newCard() {
    if (isAlive === true && hasBlackJack === false) {
        let card =  getRandomCard()
        sum += card
        cards.push(card)
        renderGame()
    }
}

