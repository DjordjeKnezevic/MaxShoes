//STAMPANJE NAV MENIJA
const navMeni = ['MEN', 'WOMEN', 'KIDS', 'CONTACT'];
let navbarNav = document.getElementsByClassName("navbar-nav")[0];
for (let navLink of navMeni) {
    let li = document.createElement('li');
    li.classList.add('nav-item');
    let a = document.createElement('a');
    a.classList.add('nav-link', 'text-light');
    a.href = "#";
    a.textContent = navLink;
    li.appendChild(a);
    navbarNav.appendChild(li);
}

//  STAMPANJE BACKGROUND SLIKA
let welcomeScreen = document.getElementById("welcome-screen");
for (let i = 1; i < 6; i++) {
    let bgImg = document.createElement("img");
    bgImg.src = `Assets/img/bg-${i}.jpg`
    bgImg.alt = `bg-${i}`
    // bgImg.classList.add('img-fluid');
    welcomeScreen.appendChild(bgImg);
}

// FADEOUT ANIMACIJA WELCOME EKRANA
window.addEventListener("load", function (e) {
    let slike = welcomeScreen.getElementsByTagName("img");
    let fadeComplete = function (e) { welcomeScreen.appendChild(slike[0]); };
    for (let i = 0; i < slike.length; i++) {
        slike[i].addEventListener("animationend", fadeComplete, false);
    }
}, false);

// STAMPANJE CAROUSEL BUTTON-A
let carouselButtons = document.querySelector(".carousel-indicators");
for (let i = 1; i < 4; i++) {
    carouselButtons.innerHTML += `<button type="button" data-bs-target="#carouselExampleCaptions" 
    data-bs-slide-to="${i - 1}" class="active"
    aria - current="true" aria - label="Slide ${i}" ></button >`
}

// STAMPANJE CAROUSEL SLIKA I TEKSTA
let carouselSlajderi = document.querySelector(".carousel-inner");
const headerPatike = ["Asics", "Asics", "Nike"]
const pPatike = ["Lite Show", "Metaspeed Sky", "Pegasus Turbo Next Nature"]
const linkPatike = ["AsicsLiteShow", "AsicsMetaspeedSky", "NikePegasusTurboNextNature"]
for (let p in headerPatike) {
    carouselSlajderi.innerHTML += `<article class="carousel-item active"><a href=""><img src="Assets/img/${linkPatike[p]}.jpg"
    class="d-block w-100" alt="${linkPatike[p]}"></a><div class="carousel-caption"><h5>${headerPatike[p]}</h5>
    <p>${pPatike[p]}</p></div></article>`
}

// STAMPANJE KATEGORIJA
let kategorije = document.querySelector('.container .row');
const kategorijeSlike = ["MensShoes", "WomensShoes", "KidsShoes"]
for (let i = 0; i < 3; i++) {
    kategorije.innerHTML += `<a href="" class="nav-link col-md-3">
    <div class="hcontainer">
        <h3>${navMeni[i]}</h3>
    </div>
    <img src="Assets/img/${kategorijeSlike[i]}.jpg" alt="${kategorijeSlike[i]}">
</a>`;
}

// STAMPANJE LEVOG DELA FOOTERA
let footerSection = document.querySelectorAll("footer section");
const linkoviIkonica = ["https://www.instagram.com/", "https://www.facebook.com/", "rss.xml"];
const ikoniceKlase = ["bi bi-instagram", "bi bi-facebook", "bi bi-rss", "bi bi-telephone", "bi bi-envelope", "bi bi-geo-alt"];
const ikonicePath = [
    "M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z",
    "M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z",
    "M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z",
    "M5.5 12a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm-3-8.5a1 1 0 0 1 1-1c5.523 0 10 4.477 10 10a1 1 0 1 1-2 0 8 8 0 0 0-8-8 1 1 0 0 1-1-1zm0 4a1 1 0 0 1 1-1 6 6 0 0 1 6 6 1 1 0 1 1-2 0 4 4 0 0 0-4-4 1 1 0 0 1-1-1z",
    "M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z",
    "M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z",
    "M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z",
    "M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
];
for (let i = 0; i < 3; i++) {
    if (i != 2) {
        footerSection[0].innerHTML += `
        <a href="${linkoviIkonica[i]}" class="text-light nav-link">
        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor"
            class="${ikoniceKlase[i]}" viewBox="0 0 16 16">
            <path d="${ikonicePath[i]}"/>
        </svg></a>
        `;
    }
    else {
        footerSection[0].innerHTML += `
        <a href="${linkoviIkonica[i]}" class="text-light nav-link">
        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor"
            class="${ikoniceKlase[i]}" viewBox="0 0 16 16">
            <path d="${ikonicePath[i]}"/>
            <path d="${ikonicePath[i + 1]}"/>
        </svg></a>
        `;
    }
}

// STAMPANJE CENTRALNOG DELA FOOTERA
const ikoniceLabel = ["011/1234-567", "maxshoes@example.com", "Zdravka Celara 16, Belgrade"];
for (let i = 0; i < 3; i++) {
    if (i != 2) {
        footerSection[1].innerHTML += `<article>
        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor"
            class="${ikoniceKlase[i + 3]} text-light" viewBox="0 0 16 16">
            <path d="${ikonicePath[i + 4]}" />
        </svg>
        <p class="text-light">${ikoniceLabel[i]}</p>
    </article>`;
    }
    else {
        footerSection[1].innerHTML += `<article>
        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor"
            class="${ikoniceKlase[i + 3]} text-light" viewBox="0 0 16 16">
            <path d="${ikonicePath[i + 4]}" /><path d="${ikonicePath[i + 5]}" />
        </svg>
        <p class="text-light">${ikoniceLabel[i]}</p>
    </article>`;
    }
}

// STAMPANJE DESNOG DELA FOOTERA
const linkoviSajta = ["#", "#", "sitemap.xml"];
const tekstLinkoviSajta = ["Author", "Documentation"]
for (let i = 0; i < 3; i++) {
    if (i != 2) {
        footerSection[2].innerHTML += `<a href="${linkoviSajta[i]}" class="nav-link">
        <h5 class="text-light">${tekstLinkoviSajta[i]}</h5>
    </a>`;
    }
    else {
        footerSection[2].innerHTML += `<a href="sitemap.xml" class="text-light">
        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor"
            class="bi bi-diagram-3" viewBox="0 0 16 16">
            <path fill-rule="evenodd"
                d="M6 3.5A1.5 1.5 0 0 1 7.5 2h1A1.5 1.5 0 0 1 10 3.5v1A1.5 1.5 0 0 1 8.5 6v1H14a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0V8h-5v.5a.5.5 0 0 1-1 0V8h-5v.5a.5.5 0 0 1-1 0v-1A.5.5 0 0 1 2 7h5.5V6A1.5 1.5 0 0 1 6 4.5v-1zM8.5 5a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1zM0 11.5A1.5 1.5 0 0 1 1.5 10h1A1.5 1.5 0 0 1 4 11.5v1A1.5 1.5 0 0 1 2.5 14h-1A1.5 1.5 0 0 1 0 12.5v-1zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1zm4.5.5A1.5 1.5 0 0 1 7.5 10h1a1.5 1.5 0 0 1 1.5 1.5v1A1.5 1.5 0 0 1 8.5 14h-1A1.5 1.5 0 0 1 6 12.5v-1zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1zm4.5.5a1.5 1.5 0 0 1 1.5-1.5h1a1.5 1.5 0 0 1 1.5 1.5v1a1.5 1.5 0 0 1-1.5 1.5h-1a1.5 1.5 0 0 1-1.5-1.5v-1zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1z" />
        </svg>
    </a>`;
    }
}

// ANIMACIJA NAVBARA PRI SCROLL-U (POJAVLJIVANJE I NESTAJANJE)
const throttle = (func, time = 100) => {
    let lastTime = 0;
    return () => {
        const now = new Date();
        if (now - lastTime >= time) {
            func();
            time = now;
        }
    };
};
const navbar = document.querySelector('.navbar');
let lastScroll = 0;
const validateHeader = () => {
    const windowY = window.scrollY;
    const windowH = window.innerHeight;

    if (windowY > windowH - 1100) {
        navbar.classList.add('is-fixed');
    } else {
        navbar.classList.remove('is-fixed');
    }

    if (windowY < lastScroll) {
        navbar.classList.add('scroll-up');
    } else {
        navbar.classList.remove('scroll-up');
    }
    lastScroll = windowY;
};

window.addEventListener('scroll', throttle(validateHeader, 100));