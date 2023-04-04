const cardsAmount = 12

let clickAmount = 0;
let previousCard = null;
let guessBlocked = false

function initGame() {
    initializeCards()
}

function initializeCards() {
    const cardsContainer = document.querySelector(".cards");

    for (let i = 1; i <= cardsAmount / 2; i++) {
        const card = createCard(i)
        const cardCopy = card.cloneNode(true)

        cardsContainer.appendChild(card)
        cardsContainer.appendChild(cardCopy)
    }

    const cards = document.querySelectorAll('.card')

    cards.forEach(card => {
        initializeEvent(card)
        shuffleCards(card)
    })
}

function initializeEvent(card) {
    card.addEventListener('click', flipCard)
}

function flipCard(e) {
    const card = this

    if (card.classList.contains('guessed') || guessBlocked) {
        return
    }

    // this to jest to samo co e.currentTarget
    // console.log(this === e.currentTarget)

    card.classList.toggle('flip')

    if (card.classList.contains('flip')) {
        clickAmount++
    }
    else {
        clickAmount--
    }

    togglePicture(card)
    handleClick(card)
}

function handleClick(currentCard) {
    switch (clickAmount) {
        case 0:
            previousCard = null;
            break;
        case 1:
            previousCard = currentCard;
            break;
        case 2:
            handleGuess(currentCard)
            break;
    }
}

function handleGuess(currentCard) {
    if (isMatch(currentCard)) {
        previousCard.classList.add('guessed')
        currentCard.classList.add('guessed')

        checkWin()
    }
    else {
        guessBlocked = true

        setTimeout(() => {
            unFlipCards(currentCard)
            guessBlocked = false
        }, 1000)
    }

    //previousCard = null
    clickAmount = 0
}

function unFlipCards(currentCard) {
    previousCard.classList.remove('flip')
    currentCard.classList.remove('flip')

    togglePicture(previousCard)
    togglePicture(currentCard)
}

function isMatch(currentCard) {
    const previousCardBack = previousCard.querySelector('.back')
    const currentCardBack = currentCard.querySelector('.back')

    return previousCardBack.src === currentCardBack.src
}

function togglePicture(card) {
    const cardFront = card.querySelector('.front')
    const cardBack = card.querySelector('.back')

    cardFront.classList.toggle('hide')
    cardBack.classList.toggle('show')
}

function createCard(imageNumber) {
    const cardDiv = document.createElement('div')
    cardDiv.setAttribute('class', 'card')

    const frontImg = createImg('front', 'img/kaja.png')
    cardDiv.appendChild(frontImg)

    const backImg = createImg('back', `img/${imageNumber}.png`)
    cardDiv.appendChild(backImg)

    return cardDiv
}

function createImg(className, src) {
    const img = document.createElement('img')
    img.setAttribute('class', className)
    img.setAttribute('src', src)

    return img
}

function shuffleCards(card) {
    const order = Math.floor(Math.random() * cardsAmount)
    card.style.order = order
}

function checkWin() {
    const cards = document.querySelectorAll('.card')

    const playerWon = [...cards].every(card => card.classList.contains('guessed'))

    if (!playerWon) {
        return
    }

    setTimeout(() => {
        alert('Wygrałeś iPhone 64GB biały wpisz numer konta i hasło do banku, aby wykonać przelew iPhone na Twoje konto')
    }, 1000)
}

initGame()