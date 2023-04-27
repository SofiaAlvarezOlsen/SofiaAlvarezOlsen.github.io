/* let heartEls = document.querySelectorAll('.fa-heart')

for(let i=0; i<heartEls.length; i++){
    heartEls[i].addEventListener("click", changeHeart)
}


function changeHeart(e){
    e.target.classList.toggle("fa-solid")
    e.target.classList.toggle("fa-regular")

    let heart1 = document.getElementById('heart1')
    let heart2 = document.getElementById('heart2')
    let hearts = [heart1, heart2]
    console.log(hearts)
    saveStoredValues(hearts)
}

  
window.addEventListener("DOMContentLoaded", () => {
    loadStoredValues()
}
)



function loadStoredValues() {
    if (localStorage.getItem("savedHearts") !== null) {
        let lodedHearts = JSON.parse(localStorage.getItem("savedHearts"));
        console.log(lodedHearts)
        let heart1 = document.getElementById('heart1')
        let heart2 = document.getElementById('heart2')
        let hearts = [heart1, heart2]
        for (let i = 0; i < hearts.length; i++) {
          if (lodedHearts[i] == "fa-solid") {
            hearts[i].classList.remove('fa-regular')
            hearts[i].classList.add('fa-solid')
          }
            
          if (lodedHearts[i] == "fa-regular") {
            hearts[i].classList.remove('fa-solid')
            hearts[i].classList.add('fa-regular')
          }
        }
    } else {
        console.log("storage is null")
    }
}

function saveStoredValues(hearts) {
    console.log("hallo")
    let savedHearts = []
    for (let i = 0; i < hearts.length; i++) {
        console.log("hi")
        if (hearts[i].classList.contains('fa-regular')) {
            console.log("hei")
            savedHearts.push("")
        } else {
            savedHearts.push(".fa-solid")
            console.log("hola")
        }
      console.log(savedHearts)

    }

    // stringify - gjør om til JSON
    localStorage.setItem("savedHearts", JSON.stringify(savedHearts))
    console.log("json stored " + JSON.parse(localStorage.getItem("savedHearts")));
}
 */

// Hent hjerter fra DOM
let heartEls = document.querySelectorAll(".fa-heart")
heartEls.forEach(function(heartEl) {
  
heartEl.addEventListener("click", function() {

  // Sjekk hvilken klasse hjertet har
  if (heartEl.classList.contains("fa-regular")) {
      heartEl.classList.remove("fa-regular")
      heartEl.classList.add("fa-solid")
      localStorage.setItem(hearts, "solid")
      } 
  else {
      heartEl.classList.remove("fa-solid")
      heartEl.classList.add("fa-regular")
      localStorage.removeItem(hearts)
      }
  })
  })

// Sjekker om det er lagret klasser i localstorage
for (let i = 0; i < heartEls.length; i++) {
  if (localStorage.getItem("heart" + i) == "solid") {
  document.getElementById("heart" + i).classList.remove("fa-regular")
  document.getElementById("heart" + i).classList.add("fa-solid")
  }
}
