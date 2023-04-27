// Hent hjerter fra DOM
let heartEls = document.querySelectorAll(".fa-heart")
heartEls.forEach(function(heartEl) {
  
heartEl.addEventListener("click", function() {

  // Sjekk hvilken klasse hjertet har
  if (heartEl.classList.contains("fa-regular")) {
      heartEl.classList.remove("fa-regular")
      heartEl.classList.add("fa-solid")
      localStorage.setItem(heartEl.id, "solid")
      } 
  else {
      heartEl.classList.remove("fa-solid")
      heartEl.classList.add("fa-regular")
      localStorage.removeItem(heartEl.id)
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
