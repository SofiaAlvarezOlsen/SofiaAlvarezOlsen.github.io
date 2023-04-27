// Henter elementer fra DOM
var game = document.querySelector(".game")
var basket = document.querySelector(".basket")
var foods = document.querySelector(".foods")

//Henter style
var basketBottom = 15
let basketWidth = 100
let basketHeight = 90
let gameWidth = 700
let gameHeight = 500
let foodWidth = 50
let foodHeight = 50
var basketLeft = parseInt(window.getComputedStyle(basket).getPropertyValue("left"))
/* var basketBottom = parseInt(window.getComputedStyle(basket).getPropertyValue("bottom"))
let basketWidth = parseInt(window.getComputedStyle(basket).getPropertyValue("width"))
let basketHeight = parseInt(window.getComputedStyle(basket).getPropertyValue("height"))
let gameWidth = parseInt(window.getComputedStyle(game).getPropertyValue("width"))
let gameHeight = parseInt(window.getComputedStyle(game).getPropertyValue("height")) */
/* let foodWidth = parseInt(window.getComputedStyle(food).getPropertyValue("width"))
let foodHeight = parseInt(window.getComputedStyle(food).getPropertyValue("height")) */

//Definerer .....
var score = 0
var pixelsPrMove = 25

// Array for bilder av dyr og billig mat
let filePathToPictureCheapFood = ["../bilder/pepsi.PNG", "../bilder/banan.png", "../bilder/norwegia.PNG", "../bilder/idun.PNG", "../bilder/oldelpaso20.jpg", "../bilder/grandiosa.jpg", "../bilder/sørlandschips.PNG", "../bilder/ovnsbakt.PNG", "../bilder/oreo.PNG", "../bilder/agurk.PNG", "../bilder/torsk.PNG", "../bilder/gulrot.png", "../bilder/nordfjord.PNG", "../bilder/sopps.PNG", "../bilder/nidar.PNG"]
let filePathToPictureExpensiveFood =    ["../bilder/cola.PNG",  "../bilder/eple.PNG", "../bilder/jarlsberg.PNG", "../bilder/heinz.PNG", "../bilder/santamaria.PNG", "../bilder/bigone.PNG", "../bilder/maarud.png", "../bilder/stabburet.PNG", "../bilder/safari.PNG", "../bilder/paprika.PNG", "../bilder/laks.PNG", "../bilder/sukkererter.png", "../bilder/gilde.PNG", "../bilder/barilla.PNG", "../bilder/freia.PNG"]

function moveBasketLeft() {
    if (basketLeft > 0) {
        if(basketLeft > pixelsPrMove)
            basketLeft -= pixelsPrMove
        else
            basketLeft = 0
        basket.style.left = basketLeft + 'px'
    }
    
}

function moveBasketRight() {
    if (basketLeft < (gameWidth-basketWidth)) {
        if(basketLeft < ((gameWidth-basketWidth)-pixelsPrMove))
            basketLeft += pixelsPrMove
        else
            basketLeft = (gameWidth-basketWidth)
        basket.style.left = basketLeft + 'px'
    }
}

function control(e){
    if (e.key == "ArrowLeft") {
        moveBasketLeft()
    }
    if (e.key == "ArrowRight") {
        moveBasketRight()
    } 
}


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
    /* Setter random horisontal plass for maten */
    var leftCheapFood = Math.floor(Math.random()*(gameWidth-foodWidth))
    var leftExpensiveFood = Math.floor(Math.random()*(gameWidth-foodWidth))
    var minimumSeparationBetweenFoods = 100

    /* sikrer at maten ikke kommer for tett inntil hverandre */
    while (Math.abs(leftCheapFood - leftExpensiveFood) < minimumSeparationBetweenFoods ){
        leftCheapFood = Math.floor(Math.random()*670)
        leftExpensiveFood = Math.floor(Math.random()*670)
    }

    var pictureIndex = Math.floor(Math.random()*filePathToPictureCheapFood.length)
    const cheapFood = new Food(gameHeight-basketHeight, leftCheapFood, filePathToPictureCheapFood[pictureIndex], true)
    const expensiveFood = new Food(gameHeight-basketHeight, leftExpensiveFood, filePathToPictureExpensiveFood[pictureIndex], false) 


    foods.appendChild(cheapFood.div)
    foods.appendChild(expensiveFood.div)

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
    var foodSpawner = setTimeout(createFood, 2000)
    
} 
createFood()



document.addEventListener("keydown", control)