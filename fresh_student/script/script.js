//Navbar
//Henter hamburgerelement
let burgerEl = document.querySelector('.fa-bars')

//Henter navelement
let navEl = document.querySelector('.nav')

burgerEl.addEventListener('click', showNav)

//Skrur show av og på
function showNav() {
    navEl.classList.toggle('show')
}


//Footer
//henter elementer fra DOM
let registrateBtn = document.getElementById("registrate")
let thanksEl = document.getElementById("thanks")
let mailInp = document.getElementById("mail")

//legger til en lytter
registrateBtn.addEventListener("click", email)

function email(){
  //sjekker om inputelementet et fylt
  if (mailInp.value == '') {
  }
  else {
    thanksEl.innerHTML="Takk for at du registrerte deg!"
  }
}