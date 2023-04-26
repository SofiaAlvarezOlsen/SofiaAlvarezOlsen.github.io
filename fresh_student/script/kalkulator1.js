/* let ADBtn = document.getElementById("AC")
let DEBtn = document.getElementById("DE")
let pointBtn = document.getElementById("point")
let divideBtn = document.getElementById("divide")
let sevenBtn = document.getElementById("seven")
let eightBtn = document.getElementById("eight")
let nineBtn = document.getElementById("nine")
let multBtn = document.getElementById("mult")
let fourBtn = document.getElementById("four")
let fiveBtn = document.getElementById("five")
let sixBtn = document.getElementById("six")
let minusBtn = document.getElementById("minus")
let oneBtn = document.getElementById("one")
let twoBtn = document.getElementById("two")
let threeBtn = document.getElementById("three")
let plusBtn = document.getElementById("plus")
let zeroBtn = document.getElementById("zero")
let threeBtn = document.getElementById("percent")
let plusBtn = document.getElementById("equal")
 */
//setter verdier, legger til lyttere og funksjoner
/* ADBtn.value="AC"
ADBtn.onclick = AC
function AC(e){
  display.value = ''
}
DEBtn.value="DE"
DEBtn.onclick = DE
function DE(e){
  display.value = display.value.toString().slice(0,-1)
}
pointBtn.value="."
pointBtn.onclick = point
function point(e){
  display.value += '.'
}
divideBtn.value="÷"
divideBtn.onclick = divide()
function divide(e){
  display.value += '/'
}
sevenBtn.value="7"
sevenBtn.onclick = seven()
function seven(e){
  display.value += '7'
}
eightBtn.value="8"
eightBtn.onclick = eight
function eight(e){
  display.value += '8'
}
nineBtn.value="9"
nineBtn.onclick = nine
function nine(e){
  display.value += '9'
}
multBtn.value="x"
multBtn.onclick = mult
function mult(e){
  display.value += '*'
}
fourBtn.value="4"
fourBtn.onclick = four
function four(e){
  display.value += '4'
}
fiveBtn.value="5"
fiveBtn.onclick = five
function five(e){
  display.value += '5'
}
sixBtn.value="6"
sixBtn.onclick = nine
function six(e){
  display.value += '6'
}
minusBtn.value="-"
minusBtn.onclick = minus
function minus(e){
  display.value += '-'
}
oneBtn.value="1"
oneBtn.onclick = one
function one(e){
  display.value += '1'
}
twoBtn.value="2"
twoBtn.onclick = two
function two(e){
  display.value += '2'
}
threeBtn.value="3"
threeBtn.onclick = three
function three(e){
  display.value += '3'
}
plusBtn.value="+"
plusBtn.onclick = plus
function plus(e){
  display.value += '+'
}
zeroBtn.value="0"
zeroBtn.onclick = zero
function zero(e){
  display.value += '0'
}
percentBtn.value="%"
percentBtn.onclick = percent
function percent(e){
  display.value += '*100'
  equal()
}
equalBtn.value="="
equalBtn.onclick = equal
function equal(e){
  display.value = eval(display.value)
}
 */
document.addEventListener("keydown", calculate)

let keys=["8", "190", /* "", */ "55", "56", "57", /* "", */ "52", "53", "54", "189", "49", "50", "51", /* "", */ "48", /* "", */ "13" ]
let actions=["''", 
             "display.value.toString().slice(0,-1)", 
             "display.value + '.'",
            /* += '/', */
            += '7',
            += '8',
            += '9',
            /* += '*', */
            += '4',
            += '5',
            += '6',
            += '-',
            += '1',
            += '2',
            += '3',
            += '+',
            += '0',
            += '*100',
            = eval(display.value)]


function calculate(e){
    e.preventDefault()
    if (e.keyCode == for (let k=0; k<keys.length; k++){
      keys[k]
      return k
    }
      {
        display.value = actions[k]

    }
}
