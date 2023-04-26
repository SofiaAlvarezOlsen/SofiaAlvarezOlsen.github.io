/* Henter hamburgerelement */
let burgerEl = document.querySelector('.fa-bars')

/* Henter navelement */
let navEl = document.querySelector('.nav')

burgerEl.addEventListener('click', showNav)

/* Skrur show av og på */
function showNav() {
    navEl.classList.toggle('show')
}



//henter elementer fra DOM
let registrateBtn = document.getElementById("registrate")
let thanksEl = document.getElementById("thanks")

registrateBtn.addEventListener("click", email)

function email(){
  thanksEl.innerHTML="Takk for at du registrerte deg!"
}
