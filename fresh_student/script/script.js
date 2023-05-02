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
let mailInp = document.getElementById("mail")

registrateBtn.addEventListener("click", email)

function email(){
  if (mailInp.value == ''){
  }
  else{
  thanksEl.innerHTML="Takk for at du registrerte deg!"
  }
}