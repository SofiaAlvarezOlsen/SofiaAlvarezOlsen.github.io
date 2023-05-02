//Legger til en lytter
document.addEventListener("keydown", calculate)

//funksjonen som kjøres hvis en key presses ned
function calculate(e){

    //forhindrer en default
    e.preventDefault()

    //sjekker om keyen som er presset == enter
    if (e.keyCode == 13){
        display.value = eval(display.value)
    }
}
