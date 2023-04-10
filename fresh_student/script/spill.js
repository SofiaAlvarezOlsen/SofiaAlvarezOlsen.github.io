var game = document.querySelector(".game")
var basket = document.querySelector(".basket")
var foods = document.querySelector(".foods")
var basketLeft = parseInt(window.getComputedStyle(basket).getPropertyValue("left"))
var basketBottom = parseInt(window.getComputedStyle(basket).getPropertyValue("bottom"))
var score = 0
var pixelsPrMove = 25
let filstiTilBildeBilligMatArray = ["../bilder/pepsi.PNG", "../bilder/banan.png", "../bilder/norwegia.PNG", "../bilder/idun.PNG", "../bilder/oldelpaso.webp", "./bilder/grandiosa.jpg", "./bilder/sørlandschips.PNG", "./bilder/ovnsbakt.PNG", "./bilder/oreo.PNG", "./bilder/agurk.PNG", "./bilder/torsk.PNG"]
let filstiTilBildeDyrMatArray =    ["./bilder/cola.PNG",  "./bilder/eple.webp", "./bilder/jarlsberg.PNG", "./bilder/heinz.PNG", "./bilder/santamaria.PNG", "./bilder/bigone.PNG", "./bilder/maarud.webp", "./bilder/stabburet.PNG", "./bilder/safari.PNG", "./bilder/paprika.PNG", "./bilder/laks.PNG"]

/* husk!!!! hent verdiene fra javascript */
let foodWidth = 50
let foodHeight = 50
let basketWidth = 100
let basketHeight = 70

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
    if (basketLeft < (700-basketWidth)) {
        if(basketLeft < ((700-basketWidth)-pixelsPrMove))
            basketLeft += pixelsPrMove
        else
            basketLeft = (700-basketWidth)
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
    constructor(bottom, left, filstiTilBilde, erBilligMat) {
      this.bottom = bottom;
      this.left = left;

      var bilde = document.createElement('img')
      bilde.setAttribute("src", filstiTilBilde)

      this.div = document.createElement('div');
      this.div.setAttribute("class", "food")
      this.div.appendChild(bilde)

      this.erBilligMat = erBilligMat /* boolean */
    }
}


function createFood(){
    /* Setter random horisontal plass for maten */
    var leftCheapFood = Math.floor(Math.random()*(700-foodWidth))
    var leftExpensiveFood = Math.floor(Math.random()*(700-foodWidth))
    var minimumSeparationBetweenFoods = 100

    /* sikrer at maten ikke kommer for tett inntil hverandre */
    while (Math.abs(leftCheapFood - leftExpensiveFood) < minimumSeparationBetweenFoods ){
        leftCheapFood = Math.floor(Math.random()*670)
        leftExpensiveFood = Math.floor(Math.random()*670)
    }

    var bildeIndeks = Math.floor(Math.random()*filstiTilBildeBilligMatArray.length)
    const cheapFood = new Food(500-basketHeight, leftCheapFood, filstiTilBildeBilligMatArray[bildeIndeks], true)
    const expensiveFood = new Food(500-basketHeight, leftExpensiveFood, filstiTilBildeDyrMatArray[bildeIndeks], false) 


    foods.appendChild(cheapFood.div)
    foods.appendChild(expensiveFood.div)

    function fallDownFood(food) {
        if (food.bottom < basketBottom + basketHeight && food.bottom > basketBottom && food.left > basketLeft - foodWidth && food.left < basketLeft + basketWidth) {
            foods.removeChild(food.div)
            if(food.erBilligMat){
                clearInterval(fallIntervalCheap)
                score++
            } else {
                /* alert("Game over! You picked an expensive food. Your score is: " + score) */
                /* clearInterval(fallIntervalCheap)
                clearInterval(fallIntervalExpensive)
                clearTimeout(foodSpawner)
                location.reload() */
                sessionStorage.setItem("score", score)
                sessionStorage.setItem("begrunnelse", "Du valgte dyr mat")
                window.location.href = "gameover.html"
            }
           
        }
        if (food.bottom < basketBottom) {
            if(food.erBilligMat){
                /* alert("Game over! You did not pick the cheap food. Your score is: " + score) */
                /* clearInterval(fallIntervalCheap)
                clearInterval(fallIntervalExpensive)
                clearTimeout(foodSpawner)
                location.reload() */
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