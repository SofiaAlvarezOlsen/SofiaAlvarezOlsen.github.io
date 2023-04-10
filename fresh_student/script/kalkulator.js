let displayEl = document.getElementById('#display')
document.addEventListener("keydown", calculate)

function calculate(e){
    e.preventDefault()
    if (e.key == 13){
        display.value = eval(display.value)
    }
}
/* function calculate(e){
if(e.key == "Enter") {
        equals()}
} */
/* let displayEl = document.getElementById('#display')
document.addEventListener("keydown", calculate)

function calculate(e){
    e.preventDefault()
    if (e.keyCode == "Enter"){
        display.value = eval(display.value)
    }
} */