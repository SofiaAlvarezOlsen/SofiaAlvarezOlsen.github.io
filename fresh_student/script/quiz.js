//henter elementer fra DOM
let quizContainerEl = document.querySelector('.quizContainer')
let checkAnswearBtn = document.querySelector('#checkAnswear')
let resultEL = document.querySelector('#result')
let commentEL = document.querySelector('#comment')
let tryAgainBtn = document.querySelector('#tryAgain')
let nextBtn = document.querySelector("#next")
let startBtn = document.querySelector("#start")
let outcomeEl = document.querySelector(".outcome")
let bigBoxStartEl = document.querySelector("#bigBoxStart")

let question1 = {
    question: "Hvor mange universiteter og høyskoler finnes det til sammen i Norge?",
    options: ["9", "12", "23", "37"],
    solution: "37"
}
let question2 = {
    question: "Hva er det vanskeligste studiet å komme inn på i Norge?",
    options: ["Indøk ved NTNU", "Psykologi ved UIO", "Medisin ved UIO", "Medisin ved NTNU"],
    solution: "Medisin ved UIO"
}
let question3 = {
    question: "Hvor mye penger bruker i gjennomsnitt en student på mat i uka?",
    options: ["830kr", "1520kr", "650kr", "1890kr"],
    solution: "830kr"
}
let question4 = {
    question: "Hva går det ikke ann å studere?",
    options: ["David Beckham", "Stunt-skuespill", "Cannabis-kultivasjon", "Gjenkjenning av falske merker"],
    solution: "Gjenkjenning av falske merker"
}
let question5 = {
    question: "Hvilket universitet er størst i verden?",
    options: ["Johns Hopkins University", "Indira Gandhi National Open University", "University of Phoenix", "Stanford University"],
    solution: "Indira Gandhi National Open University"
}
let question6 = {
    question: "Når åpnet Norges første universitet?",
    options: ["1813", "1757", "1902", "1894"],
    solution: "1813"
}
let question7 = {
    question: "Ifølge <i>The center of world rankings</i> hvilket universitet regnes som det beste i verdenen?",
    options: ["University of Oxford", "Harvard University", "Stanford University", "Yale University"],
    solution: "Harvard University"
}
let question8 = {
    question: "Hva er den høyeste utdanningen i Norge?",
    options: ["Doktorgrad", "Professor", "Mastergrad", "Amanuensis"],
    solution: "Doktorgrad"
}
let question9 = {
    question: "Hvilken av appene ble utviklet av studenter?",
    options: ["Jodel", "Snapchat", "Twitter", "TikTok"],
    solution: "Snapchat"
}
let question10 = {
    question: "Hvilket studie dropper flest ut av?",
    options: ["Økonomi og administrasjonsfag", "Humanistiske og estetiske fag", "Sykepleie", "Ingeniørfag"],
    solution: "Økonomi og administrasjonsfag"
}

let quiz = [question1, question2, question3, question4, question5, question6, question7, question8, question9, question10]

startBtn.addEventListener('click', startQuiz)
nextBtn.addEventListener('click', nextQuestion)

function startQuiz(){
    nextQuestion()
    nextBtn.classList.remove("hidden")
    startBtn.classList.add("hidden")
    bigBoxStartEl.classList.add("hidden")
}

//Går gjennom spørsmålene
let i=0
function nextQuestion(){

    //Henter spørsmålet
    let question = quiz[i].question

    //Henter svaralternativene
    let options = quiz[i].options

    //Henter fasiten
    let solution = quiz[i].solution

    //Fyller quiz-containeren med spørsmålene
    quizContainerEl.innerHTML = `
    <article id="question${i+1}">
    <h3>${question}</h3>
    </article>
    `
    //Henter elementet alternativene skal skrives i
    let quizQOS = document.querySelector(`#question${i+1}`)

    //Går gjennom alternativene
    for(let j = 0; j < options.length; j++){

        //lager label-element
        let labelEL = document.createElement("label")

        //lager et input-element
        let radioEl = document.createElement("input")

        //setter typen til input elementet til radio
        radioEl.type = "radio"

        //Sørger for at alle alternativene til spørsmålet er i samme gruppe
        radioEl.name = `q${i + 1}`

        if (options[j] == solution){
        radioEl.value = "candy" //correct
        }
        else{
            radioEl.value = "worm" //wrong
        }

        //Legger input-elementet med type radio i label elementet
        labelEL.appendChild(radioEl)

        //Skriver alternativene til HTML
        labelEL.innerHTML += options[j]

        //legger label elementet inni question elementet
        quizQOS.appendChild(labelEL)
    }
    checkPoints()
    i = i+1
    if (i>=quiz.length){
        tryAgainBtn.classList.remove("hidden")
        checkAnswearBtn.classList.remove("hidden")
        nextBtn.classList.add("hidden")
    }
}

let points = 0

//sjekker antall riktige poeng
function checkPoints(){
    //henter radio-elemtene
    let radioEls = document.querySelectorAll('input[type="radio"]')

    //går gjennom alle radio-elementene
    for (let i = 0; i<radioEls.length; i++){
        //sjekker om et alternativ er krysset av
        if(radioEls[i].checked){
            if(radioEls[i].value == "candy"){
                //øker antall poeng
                points++
            }
        }
    }
}

//Legger en lytter til knappen som sjekker svar
checkAnswearBtn.addEventListener('click', findPoints)

//finner hvor mange poeng resultatene fører til
function findPoints (){

    //legger til en klasse for å bedre utseende på nettsiden
    outcomeEl.classList.add("resAndCom")
  
    //sjekket om et alternativ er trykket av
    resultEL.innerHTML= `Du fikk ${points}/${quiz.length} poeng.`

    if ((points/quiz.length) >= 0.8){
        commentEL.innerHTML = `Du er flink og kan mye!`
    }
    else if ((points/quiz.length) >= 0.4){
        commentEL.innerHTML = `Du får til noe! Jobb litt mer så har du det!`
    }
    else{
        commentEL.innerHTML = `Dette så ikke veldig lyst ut, men det gjør hvertfall fremtiden din:)`
    } 
}

tryAgainBtn.addEventListener('click', refresh)

function refresh(){
    location.reload()
}


