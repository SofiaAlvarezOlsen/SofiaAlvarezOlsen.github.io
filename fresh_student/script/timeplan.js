// funskjon som kalles når "DOMContentLoaded"
window.addEventListener("DOMContentLoaded", () => {
    loadStoredValues()
    markDuplicateText()
    // for hvert td element i html-dokumentet legges på en ondbleclick event som gjør td-elementet editerbart.
    for (let cell of document.querySelectorAll(".editable td")) {
        cell.ondblclick = () => editable.edit(cell)
    }
}
)


// Laster opp lagrede verdier fra localStorage
function loadStoredValues() {
    if (localStorage.getItem("tableData") !== null) {
        // JSON - måte å lagre data som er forståelig for mennesker og datamaskiner
        // parse - gjør om JSON til array (objekt)
        let tableData = JSON.parse(localStorage.getItem("tableData"))
        let cells = document.querySelectorAll(".editable td")
        for (let i = 0; i < cells.length; i++) {
            cells[i].innerHTML = tableData[i]
        }
    } else {
        console.log("storage is null")
    }
}

// Lagrer verdier i localStorage
function saveStoredValues() {
    let tableData = []
    for (let cell of document.querySelectorAll(".editable td")) {
        if (cell.innerHTML == null) {
            tableData.push("")
        } else {
            tableData.push(cell.innerHTML)
        }

    }
    // stringify / gjør om til JSON
    localStorage.setItem("tableData", JSON.stringify(tableData))
}

// Funksjon som markerer data som repreteres to eller flere ganger OG som gir farge på spesifike fag
function markDuplicateText() {
    let cells = document.querySelectorAll(".editable td")
    for (let cell of cells) {
        if (cell.innerHTML > "") {
            let count = 0
            for (let otherCell of cells) {
                if (cell.innerHTML == otherCell.innerHTML) {
                    count++
                }
            }
            if (cell.innerHTML.toLowerCase() == "matte") {
                cell.classList.add("duplicate1")
            } else if (cell.innerHTML.toLowerCase() == "naturfag") {
                cell.classList.add("duplicate2")
            } else if (cell.innerHTML.toLowerCase() == "kjemi") {
                cell.classList.add("duplicate3")
            } else if (cell.innerHTML.toLowerCase() == "norsk") {
                cell.classList.add("duplicate4")
            } else if (cell.innerHTML.toLowerCase() == "jobb") {
                cell.classList.add("duplicate5")
            } else if (cell.innerHTML.toLowerCase() == "informasjonsteknologi" || cell.innerHTML.toLowerCase() == "it") {
                cell.classList.add("duplicate6")
            } else if (count > 1) {
                cell.classList.add("duplicate")
            } else {
                cell.classList.remove("duplicate")
            }
        } else {
            cell.classList.remove("duplicate")
            cell.classList.remove("duplicate1")
            cell.classList.remove("duplicate2")
            cell.classList.remove("duplicate3")
            cell.classList.remove("duplicate4")
            cell.classList.remove("duplicate5")
            cell.classList.remove("duplicate6")
        }
    }
}

// Kilde til inspirasjon for tabell: https://code-boxx.com/editable-html-table/

// objekt for tabellen
var editable = {
    selected: null,  // definerer valgt celle
    value: "", // definerer verdien til cellen som er valgt

    // Funksjon som gjør cellen editerbar
    edit (cell) {
        // fjerner at man kan dobbelklikke for å editere
        cell.ondblclick = ""

        // gjør cellen editerbar
        cell.contentEditable = true
        cell.focus() // funksjon som legger cellen i fokus

        // markerer cellen som er i bruk
        cell.classList.add("edit")
        editable.selected = cell // en peker til cellen som er i bruk, slik at man kan slå av editering senere 
        editable.value = cell.innerHTML

        // gjør at man kan trykke enter/escape eller trykke utenfor for å avslutte editeringen
        window.addEventListener("click", editable.close)
        cell.onkeydown = (evt) => {
            // enter blir true og escape blir false
            if (evt.key == "Enter" || evt.key == "Escape") {
                editable.close(evt.key == "Enter" ? true : false)
            }
        }
    },

    // avslutter editeringen
    close (evt) {
        // sammenlikner stedet som klikkes på
        if (evt.target != editable.selected) {
            // kanselerer - gjenoppretter tidligere verdi
            if (evt === false) {
                editable.selected.innerHTML = editable.value
            }

            // fjerner "editerbar"
            window.getSelection().removeAllRanges() // fjerner det som er valgt 
            editable.selected.contentEditable = false // endrer kode så det ikke er editerbart

            // gjenoppretter dobbeltklikk-lytter
            window.removeEventListener("click", editable.close) // fjerner muligheten for å lukke når editable lukkes
            let cell = editable.selected 
            cell.ondblclick = () => editable.edit(cell)

            // fjerner markering/design på cellen
            editable.selected.classList.remove("edit")
            editable.selected = null
            editable.value = ""

            // kaller på funksjoner for localStorage og farger på tekst
            if (evt == true) {
                markDuplicateText()
                saveStoredValues()
            }
        }
    }
}


// Responsivitet

let phoneSize

if (window.innerWidth < 500) {
    phoneSize = document.getElementById("phoneSize")
    phoneSize.innerHTML = "Tilt mobilen 90 grader for å bruke på mobil."

    document.getElementById("tid").innerHTML = "tid"
    document.getElementById("man").innerHTML = "man"
    document.getElementById("tir").innerHTML = "tir"
    document.getElementById("ons").innerHTML = "ons"
    document.getElementById("tor").innerHTML = "tor"
    document.getElementById("fre").innerHTML = "fre"
    document.getElementById("lor").innerHTML = "lør"
    document.getElementById("son").innerHTML = "søn"
}
