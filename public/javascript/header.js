const btnMenu = document.querySelector(".btnMenu");
const menu = document.querySelector("#menu");
var x = 0;

btnMenu.addEventListener("click", () => {
    
    if (x!=0) {
        menu.style.display = "none";
        x--;
    } else {
        menu.style.display = "inline-block";
        x++
    }
    


})