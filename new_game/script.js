let symbols = ["🍎","🍌","🍇","🍒","🍉","🍍","🥝","🍑"];
let cards = [];
let firstCard = null;
let secondCard = null;
let lock = false;
let moves = 0;

const game = document.getElementById("game");
const movesText = document.getElementById("moves");

function startGame() {
    cards = [...symbols, ...symbols];
    cards.sort(() => Math.random() - 0.5);

    game.innerHTML = "";
    moves = 0;
    movesText.innerText = moves;

    cards.forEach((symbol, index) => {
        let div = document.createElement("div");
        div.classList.add("card");
        div.dataset.symbol = symbol;
        div.dataset.index = index;

        div.onclick = () => flipCard(div);

        game.appendChild(div);
    });
}

function flipCard(card) {
    if (lock || card.classList.contains("flipped")) return;

    card.innerText = card.dataset.symbol;
    card.classList.add("flipped");

    if (!firstCard) {
        firstCard = card;
    } else {
        secondCard = card;
        lock = true;
        moves++;
        movesText.innerText = moves;

        if (firstCard.dataset.symbol === secondCard.dataset.symbol) {
            resetTurn();
        } else {
            setTimeout(() => {
                firstCard.innerText = "";
                secondCard.innerText = "";
                firstCard.classList.remove("flipped");
                secondCard.classList.remove("flipped");
                resetTurn();
            }, 800);
        }
    }
}

function resetTurn() {
    firstCard = null;
    secondCard = null;
    lock = false;
}

startGame();