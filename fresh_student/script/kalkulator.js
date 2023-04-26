/* let displayEl = document.getElementById('#display') */
document.addEventListener("keydown", calculate)
function calculate(e){
    e.preventDefault()
    if (e.keyCode == 13){
        display.value = eval(display.value)

    }
}
