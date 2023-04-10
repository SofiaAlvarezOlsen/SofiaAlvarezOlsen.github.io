/* Henter hamburgerelement */
const burgerEl = document. querySelector('.fa-bars')

/* Henter navelement */
const navEl = document. querySelector('.nav')

burgerEl.addEventListener('click', showNav)

/* Skrur show av og på */
function showNav() {
    navEl.classList.toggle('show')
}



let newsInp = document.getElementById("news")
let registrateBtn = document.getElementById("registrate")
let thanksEl = document.getElementById("thanks")
let emails = []

if (localStorage.emails) {
  emails = localStorage.emails.split(",")
}

registrateBtn.addEventListener("click", email)

function email(){
  emails.push(newsInp.value)
  newsInp.value = ""
  thanksEl.innerHTML="Takk for at du registrerte deg!"
  console.log(emails)
  localStorage.emails=emails.join(",")
}
