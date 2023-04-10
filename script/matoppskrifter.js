let heartEls = document.querySelectorAll('.fa-heart')

for(let i=0; i<heartEls.length; i++){
    heartEls[i].addEventListener("click", changeHeart)
}
function changeHeart(e){
    e.target.classList.toggle("fa-solid")
    e.target.classList.toggle("fa-regular")
}
