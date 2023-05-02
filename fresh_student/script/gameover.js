document.addEventListener("DOMContentLoaded", ()=> {
    let score = sessionStorage.getItem("score")
    let begrunnelse = sessionStorage.getItem("begrunnelse")

    document.getElementById("begrunnelse").innerHTML = begrunnelse
    document.getElementById("score").innerHTML = "Din score ble "+ score +"!"
    
})
