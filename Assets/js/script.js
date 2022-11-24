//STAMPANJE NAV MENIJA
const navMeni = ['MEN','WOMEN','KIDS','CONTACT'];
let navbarNav = document.getElementsByClassName("navbar-nav")[0];
console.log(navbarNav)
for(let navLink of navMeni){
    let li = document.createElement('li');
    li.classList.add('nav-item');
    let a = document.createElement('a');
    a.classList.add('nav-link','text-light');
    a.href = "#"
    a.textContent = navLink
    li.appendChild(a);
    navbarNav.appendChild(li);
}
//  STAMPANJE BACKGROUND SLIKA
let welcomeScreen = document.getElementById("welcome-screen");
for(let i = 1;i < 6; i++) {
    let bgImg = document.createElement("img");
    bgImg.src = `Assets/img/bg-${i}.jpg`
    bgImg.alt = `bg-${i}`
    welcomeScreen.appendChild(bgImg);
}









// FADEOUT ANIMACIJA POZADINSKIH SLIKA
window.addEventListener("DOMContentLoaded", function(e) {
    let slike = welcomeScreen.getElementsByTagName("img");
    let fadeComplete = function(e) { welcomeScreen.appendChild(slike[0]); };
    for(let i=0; i < slike.length; i++) {
        slike[i].addEventListener("animationend", fadeComplete, false);
    }
}, false);