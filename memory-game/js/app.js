document.addEventListener('DOMContentLoaded', () =>{
    
    //Listado de cartas
    const cardArray = [
        {
            name: 'cheseburger',
            img: 'images/cheeseburger.png'
        },
        {
            name: 'cheseburger',
            img: 'images/cheeseburger.png'
        },
        {
            name: 'fries',
            img: 'images/fries.png'
        },
        {
            name: 'fries',
            img: 'images/fries.png'
        },
        {
            name: 'hotdog',
            img: 'images/hotdog.png'
        },
        {
            name: 'hotdog',
            img: 'images/hotdog.png'
        },
        {
            name: 'ice-cream',
            img: 'images/ice-cream.png'
        },
        {
            name: 'ice-cream',
            img: 'images/ice-cream.png'
        },
        {
            name: 'milkshake',
            img: 'images/milkshake.png'
        },
        {
            name: 'milkshake',
            img: 'images/milkshake.png'
        },
        {
            name: 'pizza',
            img: 'images/pizza.png'
        },
        {
            name: 'pizza',
            img: 'images/pizza.png'
        },
    ]

    cardArray.sort(() => 0.5 - Math.random())

    const grid = document.querySelector('.grid')
    const spanRestart = document.querySelector('#restart')
    const resultDisplay = document.querySelector('#result')
    var cardsChosen = []
    var cardsChosenId = []
    var cardsWon = []


    //Crear el tablero
    function createBoard(){
        for(let i=0; i<cardArray.length; i++){
            var card = document.createElement('img');       //creo un elemento html img
            card.setAttribute('src','images/blank.png');    //atributo src es la ruta de la imagen
            card.setAttribute('data-id',i);                 //atributo data-id es el numero de indice
            card.addEventListener('click', flipcard);
            grid.appendChild(card);
        }
    }

    //Elimino el tablero cuando se completen los pares
    function destroyBoard(){
        for(let i=0; i<cardArray.length; i++){
            var card = document.querySelector('img')
            grid.removeChild(card)
        }
    }

    //check for matches
    function checkForMatch(){
        var cards = document.querySelectorAll('img')
        const optionOneId = cardsChosenId[0]
        const optionTwoId = cardsChosenId[1]
        
        if(cardsChosen[0] === cardsChosen[1]){
            alert('Encontraste un par!')
            cards[optionOneId].setAttribute('src', 'images/white.png')
            cards[optionTwoId].setAttribute('src', 'images/white.png')
            cardsWon.push(cardsChosen)
        }
        else{
            cards[optionOneId].setAttribute('src', 'images/blank.png')
            cards[optionTwoId].setAttribute('src', 'images/blank.png')
            alert('Lo siento, intenta otra vez')
        }

        cardsChosen = []
        cardsChosenId = []
        resultDisplay.textContent = cardsWon.length

        if(cardsWon.length == cardArray.length/2){
            resultDisplay.textContent = 'Felicidades! encontraste todos los pares'
            destroyBoard()
            restart()
        }
    }

    //flip card
    function flipcard(){
        var cardId = this.getAttribute('data-id');
        var cardSrc = this.getAttribute('src')
        var white = 'images/white.png'
        
        if (cardId != cardsChosenId[0] && cardSrc != white) {
            cardsChosen.push(cardArray[cardId].name);
            cardsChosenId.push(cardId);
            this.setAttribute('src', cardArray[cardId].img);

        }
        if(cardsChosen.length == 2){
            setTimeout(checkForMatch, 200);
        }
    }

    //Reiniciar
    function restart(){
        var boton = document.createElement('button')

        boton.textContent = 'Reiniciar'
        boton.setAttribute('id','restartBtn')
        boton.addEventListener('click', createBoard)

        spanRestart.appendChild(boton)
    }


    createBoard();
})