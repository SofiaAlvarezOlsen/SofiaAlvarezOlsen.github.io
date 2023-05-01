// Henter elementer fra DOM
var game = document.querySelector(".game")
var basket = document.querySelector(".basket")
var foods = document.querySelector(".foods")

//Henter style

let foodWidth = 50
let foodHeight = 50

    /* analyserer verdien og returnerer et heltall */
let basketLeft = parseInt(window.getComputedStyle(basket).getPropertyValue("left"))
let basketBottom = parseInt(window.getComputedStyle(basket).getPropertyValue("bottom"))
let basketWidth = parseInt(window.getComputedStyle(basket).getPropertyValue("width"))
let basketHeight = parseInt(window.getComputedStyle(basket).getPropertyValue("height"))
let gameWidth = parseInt(window.getComputedStyle(game).getPropertyValue("width"))
let gameHeight = parseInt(window.getComputedStyle(game).getPropertyValue("height"))

/* console.log("foodWidth" +  foodWidth)
console.log("foodHeight" +  foodHeight)
console.log("basketBottom" + basketBottom)
console.log("basketWidth" +  basketWidth)
console.log("basketHeight" +  basketHeight)
console.log("gameWidth" +  gameWidth)
console.log("gameHeight" +  gameHeight) */


//Definerer 
var score = 0
var pixelsPrMove = 25

// Array for bilder av dyr og billig mat
let filePathToPictureCheapFood = ["../bilder/pepsi.PNG", "../bilder/banan.png", "../bilder/norwegia.PNG", "../bilder/idun.PNG", "../bilder/oldelpaso.PNG", "../bilder/grandiosa.JPG", "../bilder/sørlandschips.PNG", "../bilder/ovnsbakt.PNG", "../bilder/oreo.PNG", "../bilder/agurk.PNG", "../bilder/torsk.PNG", "../bilder/gulrot.PNG", "../bilder/nordfjord.PNG", "../bilder/sopps.PNG", "../bilder/nidar.PNG"]
let filePathToPictureExpensiveFood = ["../bilder/cola.PNG",  "../bilder/eple.PNG", "../bilder/jarlsberg.PNG", "../bilder/heinz.PNG", "../bilder/santamaria.PNG", "../bilder/bigone.PNG", "../bilder/maarud.PNG", "../bilder/stabburet.PNG", "../bilder/safari.PNG", "../bilder/paprika.PNG", "../bilder/laks.PNG", "../bilder/sukkererter.PNG", "../bilder/gilde.PNG", "../bilder/barilla.PNG", "../bilder/freia.PNG"]

// Hvis avstanden mellom kurven og vestre-veggen er større enn null skal kurven flyttes mot venstre
function moveBasketLeft() {
    if (basketLeft > 0) {
        // Hvis avstanden mellom kurven og vestre-veggen er større enn "pixelsPrMove" skal kurven flyttes mot venstre "pixelsPrMove"
        if(basketLeft > pixelsPrMove)
            basketLeft -= pixelsPrMove
        // Hvis avstanden mellom kurven og vestre-veggen er mindre enn "pixelsPrMove" skal kurven flyttes mot venstre så avstanden er 0
        else
            basketLeft = 0
        basket.style.left = basketLeft + 'px'
    }
    
}

// Hvis avstanden mellom kurven og vestre-veggen er mindre enn spill-bredden minus bredden til kurven skal kurven flyttes mot høyre
function moveBasketRight() {
    if (basketLeft < (gameWidth-basketWidth)) {
        // Hvis avstanden mellom kurven og høyre-veggen er større enn "pixelsPrMove" skal kurven flyttes mot høyre "pixelsPrMove"
        if(basketLeft < ((gameWidth-basketWidth)-pixelsPrMove))
            basketLeft += pixelsPrMove
        // Hvis avstanden mellom kurven og høyre-veggen er mindre enn "pixelsPrMove" skal kurven flyttes mot høyre så avstanden er 0
        else
            basketLeft = (gameWidth-basketWidth)
        basket.style.left = basketLeft + 'px'
    }
}

// Henter knapper som flytter kurven mot høyre og venstre
let leftArrowBtn = document.getElementById("left")
let rightArrowBtn = document.getElementById("right")

// Setter en lytter til høyre- og venstre-pil-tastene til tastaturet
leftArrowBtn.addEventListener('click', moveBasketLeft)
rightArrowBtn.addEventListener('click', moveBasketRight)

// Funksjon som kaller på funksjoner som flytter kurven når man bruker piltastene til tastaturet
function control(e){
    if (e.key == "ArrowLeft") {
        moveBasketLeft()
    }
    if (e.key == "ArrowRight") {
        moveBasketRight()
    } 
}

// Klasse ....
class Food {
    constructor(bottom, left, filePathToPicture, isCheapFood) {
      this.bottom = bottom;

      this.left = left;

      var bilde = document.createElement('img')
      bilde.setAttribute("src", filePathToPicture)
      this.div = document.createElement('div');
      this.div.setAttribute("class", "food")
      this.div.appendChild(bilde)

      this.isCheapFood = isCheapFood /* boolean */
    }
}

function createFood(){
    // Setter random lengde fra venstresiden
    var leftCheapFood = Math.floor(Math.random()*(gameWidth-foodWidth))
    var leftExpensiveFood = Math.floor(Math.random()*(gameWidth-foodWidth))

    // Sikrer at maten ikke kommer for tett inntil hverandre
    var minimumSeparationBetweenFoods = 100
    while (Math.abs(leftCheapFood - leftExpensiveFood) < minimumSeparationBetweenFoods ){
        // Setter ny random lengde fra venstresiden til mellomrommet mellom er mer enn "minimumSeparationBetweenFoods"
        leftCheapFood = Math.floor(Math.random()*(gameWidth-foodWidth))
        leftExpensiveFood = Math.floor(Math.random()*(gameWidth-foodWidth))
    }

    // Velger en random index i "filePathToPictureCheapFood" og "filePathToPictureExpensiveFood"
    var pictureIndex = Math.floor(Math.random()*filePathToPictureCheapFood.length)

    // Oppretter to objekter av klassen Food
    const cheapFood = new Food(gameHeight-basketHeight, leftCheapFood, filePathToPictureCheapFood[pictureIndex], true)
    const expensiveFood = new Food(gameHeight-basketHeight, leftExpensiveFood, filePathToPictureExpensiveFood[pictureIndex], false) 

    // Plasserer objektene inni foods-elementet
    foods.appendChild(cheapFood.div)
    foods.appendChild(expensiveFood.div)

    // food = cheapFood/expensiveFood??
    function fallDownFood(food) {
        if (food.bottom < basketBottom + basketHeight && food.bottom > basketBottom && food.left > basketLeft - foodWidth && food.left < basketLeft + basketWidth) {
            foods.removeChild(food.div)
            if(food.isCheapFood){
                clearInterval(fallIntervalCheap)
                score++
            } else {
                sessionStorage.setItem("score", score)
                sessionStorage.setItem("begrunnelse", "Du valgte dyr mat")
                window.location.href = "gameover.html"
            }
           
        }
        if (food.bottom < basketBottom) {
            if(food.isCheapFood){
                sessionStorage.setItem("score", score)
                sessionStorage.setItem("begrunnelse", "Du plukket ikke den billige maten")
                window.location.href = "gameover.html"
            } else {
                foods.removeChild(food.div)
                clearInterval(fallIntervalExpensive)
            }
        }
        food.bottom -= 10;
        food.div.style.bottom = food.bottom + 'px'
        food.div.style.left = food.left + 'px'
    }
    
    var fallIntervalCheap = setInterval(fallDownFood, 100, cheapFood)
    var fallIntervalExpensive = setInterval(fallDownFood, 100, expensiveFood)
    setTimeout(createFood, 2000)
    
} 
createFood()


// Setter en lytter til tastaturet som kaller på funksjonen control
document.addEventListener("keydown", control)