// lambda expression - funskjon uten navn som kalles når "DOMContentLoaded" (som automatisk funksjon)
window.addEventListener("DOMContentLoaded", () => {
    loadStoredValues()
    markDuplicateText()
    // henter alle td-elementer og plasserer de i et array. 
    // hver gang for-løkken kjøres puttes et og et element inni hver sin celle
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
            cells[i].innerHTML = tableData[i];
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
            tableData.push("");
        } else {
            tableData.push(cell.innerHTML);
        }

    }
    // stringify - gjør om til JSON
    localStorage.setItem("tableData", JSON.stringify(tableData))
}

// Funksjon som markerer data som repreteres to eller flere ganger OG som gir farge på spesifike fag
function markDuplicateText() {
    let cells = document.querySelectorAll(".editable td")
    for (let cell of cells) {
        if (cell.innerHTML > "") {
            let count = 0;
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

// objekt - kolon brukes til å definere variabler 
var editable = {
    // (B) PROPERTIES
    selected: null,  // current selected cell
    value: "", // current selected cell value

    // (C) "CONVERT" TO EDITABLE CELL
    edit (cell) {
        // (C1) REMOVE "DOUBLE CLICK TO EDIT"
        cell.ondblclick = "";

        // (C2) EDITABLE CONTENT
        cell.contentEditable = true;
        cell.focus();

        // (C3) "MARK" CURRENT SELECTED CELL
        cell.classList.add("edit");
        editable.selected = cell;
        editable.value = cell.innerHTML;

        // (C4) PRESS ENTER/ESC OR CLICK OUTSIDE TO END EDIT
        // if(evt.key == "Enter"){editable.close("true"} else {editable.close("false")}
        window.addEventListener("click", editable.close);
        cell.onkeydown = (evt) => {
            if (evt.key == "Enter" || evt.key == "Escape") {
                editable.close(evt.key == "Enter" ? true : false);
                return false;
            }
        };
    },

    // (D) END "EDIT MODE"
    close (evt) {
        if (evt.target != editable.selected) {
            // (D1) CANCEL - RESTORE PREVIOUS VALUE
            if (evt === false) {
                editable.selected.innerHTML = editable.value;
            }

            // (D2) REMOVE "EDITABLE"
            window.getSelection().removeAllRanges();     //vet ikke :)
            editable.selected.contentEditable = false;

            // (D3) RESTORE CLICK LISTENERS
            window.removeEventListener("click", editable.close);
            let cell = editable.selected;
            cell.ondblclick = () => editable.edit(cell);

            // (D4) "UNMARK" CURRENT SELECTED CELL
            editable.selected.classList.remove("edit");
            editable.selected = null;
            editable.value = "";

            // (D5) DO WHATEVER YOU NEED
            if (evt == true) {
                markDuplicateText();
                saveStoredValues();
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
