var tmpGreska = false;
window.onload = function () {

    //* * * * * * * * * * * * * * * * * * * * * ZAJEDNICKI DEO ZA SVE STRANICE * * * * * * * * * * * * * * * * * * * * * * * *
    //STAMPANJE NAV MENIJA
    const navMeni = ['MEN', 'WOMEN', 'KIDS', 'CONTACT'];
    const navLinkovi = [
        "/MaxShoes/products.html?category=Men",
        "/MaxShoes/products.html?category=Women",
        "/MaxShoes/products.html?category=Kids",
        "#footer"]
    let navbarNav = document.getElementsByClassName("navbar-nav")[0];
    for (let i in navMeni) {
        let li = document.createElement('li');
        li.classList.add('nav-item');
        let a = document.createElement('a');
        a.classList.add('nav-link', 'text-light');
        a.href = navLinkovi[i];
        a.textContent = navMeni[i];
        li.appendChild(a);
        navbarNav.appendChild(li);
    }

    // ANIMACIJA NAVBARA PRI SCROLL-U (POJAVLJIVANJE I NESTAJANJE)
    const navbar = document.querySelector('.navbar-meni');
    let lastScroll = 0;
    const validateHeader = () => {
        const windowY = window.scrollY;
        const windowH = window.innerHeight;
        if (windowY > windowH - 1200) {
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
    window.addEventListener('scroll', validateHeader);

    // IZBACIVANJE GREKSE LOGIN FORME
    let logovanjeForma = document.querySelector('#logovanje-forma');
    let invalidUserText = document.querySelector('#logovanje-forma .form-text');
    logovanjeForma.addEventListener('submit', () => {
        event.preventDefault();
        invalidUserText.classList.remove('hide')
    })

    // OBRADA SIGNUP FORME
    let signupForma = document.querySelector('#signup-forma');
    signupForma.addEventListener('submit', () => {
        event.preventDefault();
    })

    // PROVERA ISPRAVNOSTI USERNAME-A
    let reUsername1 = /^[\w\d!@#$%^&*._]{5,20}$/;
    let reUsername2 = /^[A-Z][\w\d!@#$%^&*._]{4,19}$/;
    const reUsername = [reUsername1, reUsername2];
    const porukaUsername = [
        'Username must be between 5 and 20 characters long and must not contain spaces',
        'Username must start with a capital letter'
    ];
    let signupUsername = document.getElementById('signup-username');
    let usernameError = document.getElementById('username-error');
    signupUsername.addEventListener('blur', () => {
        regexProvera(signupUsername, usernameError, reUsername, porukaUsername);
    })

    // PROVERA ISPRAVNOSTI PASSWORD-A
    let rePassword1 = /^[\w\d!@#$%^&*._]{8,20}$/;
    let rePassword2 = /^([\w!@#$%^&*._]{7,19}[\d]+)|([\d]+[\w!@#$%^&*._]{7,19})$/;
    let rePassword3 = /^([\w\d]{7,19}[!@#$%^&*._]+)|([!@#$%^&*._]+[\w\d]{7,19})$/;
    let rePassword4 = /^[A-Z][\w\d!@#$%^&*._]{7,19}$/;
    const rePassword = [rePassword1, rePassword2, rePassword3, rePassword4];
    const porukaPassword = [
        'Password must be between 8 and 20 characters long and must not contain spaces',
        'Password must contain at least 1 number',
        'Password must contain at least 1 of the characters: "!@#$%^&*._"',
        'Password must start with a capital letter'
    ];
    let passwordError = document.getElementById('password-error');
    let signupPassword = document.getElementById('signup-password');
    signupPassword.addEventListener('blur', () => {
        regexProvera(signupPassword, passwordError, rePassword, porukaPassword);
    })

    // PROVERA ISPRAVNOSTI IMENA I PREZIMENA
    let reFirstLastName1 = /^[\w\dŽĐŠĆČćđčžš]{3,20}$/;
    let reFirstLastName2 = /^[A-Z][\w\dŽĐŠĆČćđčžšшђжћчЂШЖЋЧ]{2,19}$/;
    let reFirstLastName3 = /^[A-Z]([\w\dŽĐŠĆČćđčžšшђжћчЂШЖЋЧ]{2,19}[\d!@#$%^&*._]+)|([\d!@#$%^&*._]+[\w\dŽĐŠĆČćđčžšшђжћчЂШЖЋЧ]{2,19})$/;
    const reFirstLastName = [reFirstLastName1, reFirstLastName2];
    const porukaFirstLastName = [
        'Name (First and Last) must be between 3 and 20 characters long and must not contain spaces',
        'Name (First and Last) must start with a capital letter'
    ];
    let dodatnaPorukaFirstLastName = 'Name (First and Last) must not contain any numbers or characters: "!@#$%^&*._"';
    let firstNameError = document.getElementById('firstname-error');
    let signupFirstName = document.getElementById('signup-firstname');
    let lastNameError = document.getElementById('lastname-error');
    let signupLastName = document.getElementById('signup-lastname');
    signupFirstName.addEventListener('blur', () => {
        regexProvera(signupFirstName, firstNameError, reFirstLastName, porukaFirstLastName, reFirstLastName3, dodatnaPorukaFirstLastName);
    })
    signupLastName.addEventListener('blur', () => {
        regexProvera(signupLastName, lastNameError, reFirstLastName, porukaFirstLastName, reFirstLastName3, dodatnaPorukaFirstLastName);
    })

    // PROVERA ISPRAVNOSTI MAIL-A
    let reEmail1 = /^[\w\d\.]+@[\w]+\.[\w\.]+$/
    const reEmail = [reEmail1]
    const porukaEmail = [
        'Invalid email format (Email must contain "@" and end with a domain name (Ex. ".com")))'
    ];
    let emailError = document.getElementById('email-error');
    let signupEmail = document.getElementById('signup-email');
    signupEmail.addEventListener('blur', () => {
        regexProvera(signupEmail, emailError, reEmail, porukaEmail);
    })

    // PROVERA ISPRAVNOSTI ADRESE
    let reAddress1 = /^(([A-Z][\w\d\.\-]+)|([\d]+\.?))(\s{1}[\w\d\.\-\/]+)+$/
    let reAddress2 = /^(([A-Z][\w\d\.\-]+)|([\d]+\.?))(\s{1}[\w\d\.\-]+){0,7}$/
    let reAddress3 = /^(([A-Z][\w\d\.\-]+)|([\d]+\.?))(\s{1}[\w\d\.\-]+){0,7}\s(([\d]{1,3}((\/(([\d]{1,2}[\w]?)|([\w]{1,2}))))?)|((BB)|(bb)))$/
    const reAddress = [reAddress1, reAddress2, reAddress3];
    const porukaAddress = [
        'Address must start with either a capital letter, or a number',
        'Address must have a maximum of 8 words',
        'Address must include a number (Ex. 2, 6/a, 30/4b, BB)'
    ]
    let addressError = document.getElementById('address-error');
    let signupAddress = document.getElementById('signup-address');
    signupAddress.addEventListener('blur', () => {
        regexProvera(signupAddress, addressError, reAddress, porukaAddress);
    });

    // PROVERA ISPRAVNOSTI FORME PRITISKOM NA DUGME 'SUBMIT'
    let tacCheckbox = document.getElementById('termsAndConditions');
    let submitButton = document.getElementById('submit-button');
    const objektiPoljeNiz = [signupUsername, signupPassword, signupFirstName, signupLastName, signupEmail, signupAddress];
    const objektiErrorNiz = [usernameError, passwordError, firstNameError, lastNameError, emailError, addressError];
    const regexIzrazi = [reUsername, rePassword, reFirstLastName, reFirstLastName, reEmail, reAddress];
    const porukeNiz = [porukaUsername, porukaPassword, porukaFirstLastName, porukaFirstLastName, porukaEmail, porukaAddress]
    let greska = false;
    submitButton.addEventListener('click', () => {
        if (!tacCheckbox.checked) {
            tacCheckbox.classList.add('error-border');
            greska = true;
        }
        else {
            greska = false;
            tacCheckbox.classList.remove('error-border');
        }
        for (let i = 0; i < 6; i++) {
            if (i == 2 || i == 3) {
                regexProvera(objektiPoljeNiz[i], objektiErrorNiz[i], regexIzrazi[i], porukeNiz[i], reFirstLastName3, dodatnaPorukaFirstLastName)
                if (tmpGreska) {
                    greska = true;
                }
            }
            else {
                regexProvera(objektiPoljeNiz[i], objektiErrorNiz[i], regexIzrazi[i], porukeNiz[i])
                if (tmpGreska) {
                    greska = true;
                }
            }
        }
        if (!greska) {
            document.getElementById('success-signup').classList.remove('hide');
        }
    });

    //* * * * * * * * * * * * * * * * * * * * * * * * * * PRVA STRANICA * * * * * * * * * * * * * * * * * * * * * * * * * * *
    let url = document.location.pathname;
    // if (url == "/MaxShoes/"
    //     || url == "/MaxShoes/index.html"
    //     || url == "/MaxShoes/#") {
    if (url == "/"
        || url == "/index.html"
        || url == "/#") {

        //  STAMPANJE BACKGROUND SLIKA
        let welcomeScreen = document.getElementById("welcome-screen");
        for (let i = 1; i < 6; i++) {
            let bgImg = document.createElement("img");
            bgImg.src = `Assets/img/bg-${i}.jpg`
            bgImg.alt = `bg-${i}`
            welcomeScreen.appendChild(bgImg);
        }

        // FADEOUT ANIMACIJA WELCOME EKRANA
        let bgSlike = welcomeScreen.getElementsByTagName("img");
        for (let i = 0; i < bgSlike.length; i++) {
            bgSlike[i].addEventListener("animationend", () => {
                welcomeScreen.appendChild(bgSlike[0]);
            });
        }

        // STAMPANJE CAROUSEL SLIKA I TEKSTA
        let carouselSlajderi = document.querySelector(".carousel-inner");
        const headerPatike = ["Asics", "Asics", "Nike"]
        const pPatike = ["Lite Show", "Metaspeed Sky", "Pegasus Turbo Next Nature"]
        const linkSlikePatike = ["AsicsLiteShow", "AsicsMetaspeedSky", "NikePegasusTurboNextNature"]
        const linkPatike = ["/MaxShoes/products.html?brand=Asics&model=Lite Show",
            "/MaxShoes/products.html?brand=Asics&model=Metaspeed Sky",
            "/MaxShoes/products.html?brand=Nike&model=Pegasus Turbo Next Nature"]
        for (let p in headerPatike) {
            carouselSlajderi.innerHTML += `<article class="carousel-item active"><a href="${linkPatike[p]}"><img src="Assets/img/${linkSlikePatike[p]}.jpg"
        class="d-block w-100" alt="${linkSlikePatike[p]}"></a><div class="carousel-caption"><h5>${headerPatike[p]}</h5>
        <p>${pPatike[p]}</p></div></article>`
        }

        // STAMPANJE CAROUSEL BUTTON-A
        let carouselButtons = document.querySelector(".carousel-indicators");
        for (let i = 1; i < 4; i++) {
            carouselButtons.innerHTML += `<button type="button" data-bs-target="#carouselExampleCaptions" 
                data-bs-slide-to="${i - 1}" class="active"
                aria - current="true" aria - label="Slide ${i}" ></button >`
        }

        // STAMPANJE KATEGORIJA
        let kategorije = document.querySelector('.container .row');
        const kategorijeSlike = ["MensShoes", "WomensShoes", "KidsShoes"]
        const kategorijeLinkovi = [
            "/MaxShoes/products.html?category=Men",
            "/MaxShoes/products.html?category=Women",
            "/MaxShoes/products.html?category=Kids"]
        for (let i = 0; i < 3; i++) {
            kategorije.innerHTML += `<a href="${kategorijeLinkovi[i]}" class="nav-link col-md-3">
        <div class="hcontainer">
            <h3>${navMeni[i]}</h3>
        </div>
        <img src="Assets/img/${kategorijeSlike[i]}.jpg" alt="${kategorijeSlike[i]}">
    </a>`;
        }
    }

    //* * * * * * * * * * * * * * * * * * * * * * * * * * DRUGA STRANICA * * * * * * * * * * * * * * * * * * * * * * * * * * *
    // else if (url == "/MaxShoes/products.html") {
    else if (url == "/products.html") {

        const queryString = window.location.search;
        console.log(queryString);
        const urlParams = new URLSearchParams(queryString);
        const categoryUrl = urlParams.get('category')
        const brandUrl = urlParams.get('brand')
        const modelUrl = urlParams.get('model')
        // ENABLE-OVANJE BOOTSTRAPOVOG TOOLTIP-A ZA KORPE
        $(document).ready(function () {
            $('body').tooltip({
                selector: '#patike-display article a'
            });
        });
        // STAMPANJE, POSTAVLJANJE INICIJALNIH VREDNOSTI I UPDATE-OVANJE VREDNOSTI DUPLOG SLAJDERA
        let prvaCenaGranica = 0, drugaCenaGranica = 300;
        let stampajCene = true;
        $(document).ready(function () {
            let $slider = $("#slider-range");
            let priceMin = $slider.attr("data-price-min"),
                priceMax = $slider.attr("data-price-max");

            $slider.slider({
                range: true,
                min: priceMin,
                max: priceMax,
                step: 5,
                values: [priceMin, priceMax],
                slide: function (event, ui) {
                    let opseg = "$" + ui.values[0] + " - $" + ui.values[1];
                    $("#amount").text("Price range: " + opseg);
                    if (stampajCene) {
                        dugmadFilter = $('.filter-dugme');
                        StampajDugme(opseg, dugmadFilter, "Price range")
                    }
                    stampajCene = false;
                    let dugme = $('.filter-dugme:contains("Price range")')
                    if (dugme.length != 0) {
                        dugme.contents()[0].textContent = "Price range: " + opseg
                    }
                    prvaCenaGranica = ui.values[0]
                    drugaCenaGranica = ui.values[1]
                    Filtar()
                }
            });
            $("#amount").text("Price range: $" + $slider.slider("values", 0) + " - $" + $slider.slider("values", 1));
        });


        const kategorijeTekst = ['Men', 'Women', 'Kids'];
        const brendoviTekst = ['Asics', 'Nike', 'Inov8', 'New Balance', 'Nike', 'Puma', 'Reebok', 'Adidas'];
        let filterDisplay = document.getElementById('filter-display')
        let ukloniFiltre = document.getElementById('ukloni-filtre');
        var dugmadFilter = document.querySelectorAll('.filter-dugme');

        // ANIMACIJA DROPDOWN LISTE ZA FILTRE
        $(document).ready(function () {
            let $dropdowns = $('#filter .nav-link')
            $dropdowns.click(function () {
                $(this).next().slideToggle('fast');
                $dropdowns.not(this).next().slideUp('fast');
            })
            $(document).click(function () {
                $('#filter .padajuci-meni').slideUp('fast');
            })
            $("#filter .nav-link, #dropdown-cena").click(function (e) {
                e.stopPropagation();
            })
        })

        // FUNKCIJA ZA RESETOVANJE RANGE-A
        function ResetRange() {
            $(document).ready(function () {
                stampajCene = true;
                let $slider = $("#slider-range");
                $slider.slider({
                    values: [0, 300]
                })
                $("#amount").text("Price range: $0 - $300");
            })
        }

        // FUNKCIJA ZA UKLANJANJE FILTER DUGMETA
        let patikeDisplay = document.getElementById('patike-display')
        function UkloniRoditelja(dugme) {
            dugmadFilter = document.querySelectorAll('.filter-dugme');
            if (dugme.parentElement.textContent.split(' ')[0] == "Price") { ResetRange() }
            dugme.parentElement.remove();
            if (dugmadFilter.length == 2) {
                SakrijCistac();
            }
            Filtar()
        }

        // FUNKCIJA ZA SAKRIVANJE CISTAC DUGMETA I UKLANJANJE OSTALIH (PREKO POZIVANJA UkloniRoditelja() FUNKCIJE)
        function SakrijCistac(nizFilterDugmadi = null) {
            ukloniFiltre.classList.add('hide');
            if (nizFilterDugmadi) {
                ResetRange()
                while (filterDisplay.childNodes.length > 2) {
                    filterDisplay.removeChild(filterDisplay.firstChild);
                }
                Filtar()
            }
            patikeDisplay.style.height = "93%"
        }

        // FUNKCIJA ZA STAMPANJE FILTER DUGMETA
        function StampajDugme(opcija, nizFilterDugmadi, key) {
            let filterDugme = document.createElement('button');
            filterDugme.classList.add('btn', 'dark-blue-bg', 'text-light', 'ms-3', 'filter-dugme');
            filterDugme.textContent = `${key}: ${opcija}`
            let closeDugme = document.createElement('button');
            closeDugme.classList.add('btn-close', 'ms-2', 'ukloni-dugme');
            closeDugme.addEventListener('click', function () {
                UkloniRoditelja(closeDugme, nizFilterDugmadi);
            })
            filterDugme.appendChild(closeDugme);
            filterDisplay.insertBefore(filterDugme, nizFilterDugmadi[0])
            ukloniFiltre.classList.remove('hide');
            patikeDisplay.style.height = "85%"
        }

        // SELEKTOVANJE I DODAVANJE EVENT-A CISTAC DUGMETU
        let dugmeSakrijCistaca = document.querySelector('#ukloni-filtre button');
        dugmeSakrijCistaca.addEventListener('click', function () {
            SakrijCistac(dugmadFilter)
        })

        // DODAVANJE EVENT-A ZA SVAKI ELEMENT "KATEGORIJE" DROPDOWN LISTE ZA, ILI STAMPANJE, ILI EDIT-OVANJE POSTOJECEG DUGMETA
        const listaKategorija = document.querySelectorAll('#kategorije-opcije .dropdown-item');
        for (let i = 0; i < listaKategorija.length; i++) {
            listaKategorija[i].addEventListener('click', function () {
                dugmadFilter = document.querySelectorAll('.filter-dugme');
                let opcija = listaKategorija[i].textContent;
                let stampaj = true;
                for (let i = 0; i < dugmadFilter.length; i++) {
                    if (kategorijeTekst.includes(dugmadFilter[i].textContent.split(': ')[1])) {
                        dugmadFilter[i].firstChild.textContent = `Category: ${opcija}`
                        stampaj = false;
                        break;
                    }
                }
                if (stampaj) {
                    StampajDugme(opcija, dugmadFilter, "Category");
                }
                Filtar();
            })
        }

        // DODAVANJE EVENT-A ZA SVAKI ELEMENT "BREND" DROPDOWN LISTE ZA, ILI STAMPANJE, ILI EDIT-OVANJE POSTOJECEG DUGMETA
        const listaBrendova = document.querySelectorAll('#brendovi .dropdown-item');
        for (let i = 0; i < listaBrendova.length; i++) {
            listaBrendova[i].addEventListener('click', function () {
                dugmadFilter = document.querySelectorAll('.filter-dugme');
                let opcija = listaBrendova[i].textContent;
                let stampaj = true;
                for (let i = 0; i < dugmadFilter.length; i++) {
                    if (brendoviTekst.includes(dugmadFilter[i].textContent.split(': ')[1])) {
                        dugmadFilter[i].firstChild.textContent = `Brand: ${opcija}`
                        stampaj = false;
                        break;
                    }
                }
                if (stampaj) {
                    StampajDugme(opcija, dugmadFilter, "Brand");
                }
                Filtar();
            })
        }

        // PRAVLJENJE LISTA OBJEKATA PATIKA
        const shoeBrands = [
            'Asics', 'Asics', 'Nike', 'Adidas', 'Asics', 'New Balance', 'New Balance', 'Asics', 'Asics', 'Adidas', 'Adidas',
            'Adidas', 'Adidas', 'Nike', 'Nike', 'Nike', 'Nike', 'New Balance', 'New Balance', 'New Balance', 'New Balance',
            'Inov8', 'Asics', 'Puma', 'Puma', 'Reebok', 'Reebok', 'Reebok', 'Reebok', 'Adidas'
        ]
        const shoeModels = [
            'Metaspeed Sky', 'Lite Show', 'Pegasus Turbo Next Nature', 'Adistar', 'Jolt 3 GS Junior', 'Fresh Foam X 860 v13',
            'Fresh Foam Tempo', 'Gel-Kinsei Blast', 'Kinsei Blast', 'SolarBOOST 19', 'Solar Glide 3', 'Terrex Speed Ultra',
            'SolarBOOST 3', 'Air Zoom Pegasus 38 Shield', 'Rival D 10', 'ZoomX Streakfly', 'React Infinity Run Flyknit 3',
            'Fresh Foam Hierro v7', 'FuelCell Rebel v3', 'XCR7 v4', 'Fresh Foam 880 v11', 'X-Talon 212', 'Gel-Noosa Tri 13 GS',
            'Liberate Nitro', 'Velocity Nitro', 'Nanoflex TR', 'Nano X2', 'Floatride Run Fast 3.0', 'Forever Floatride Energy 2.0',
            'Terrex Agravic Flow Junior'
        ]
        const shoeCategories = [
            'Men', 'Men', 'Men', 'Women', 'Kids', 'Kids', 'Kids', 'Kids', 'Kids', 'Women', 'Women', 'Women', 'Women', 'Men',
            'Men', 'Women', 'Women', 'Women', 'Women', 'Men', 'Men', 'Kids', 'Kids', 'Men', 'Men', 'Men', 'Men', 'Women', 'Women',
            'Kids'
        ]
        const shoePrices = [
            250, 120, 180, 130, 40, 80, 70, 180, 180, 160, 140, 160, 160, 97, 65, 160, 160, 140, 130, 70, 101, 80, 55, 110, 120,
            90, 135, 140, 100, 50
        ]
        let shoeList = [];

        function praviNizPatikaObjekata() {
            for (i = 0; i < shoeBrands.length; i++) {
                shoeList.push({
                    brand: shoeBrands[i],
                    model: shoeModels[i],
                    imgSrc: `Assets/img/shoes/Shoe${i + 1}.jpg`,
                    category: shoeCategories[i],
                    price: shoePrices[i]
                })
            }
            shuffle(shoeList)
        }
        // FUNKCIJA ZA SHUFFLE-OVANJE ELEMENATA NIZA
        function shuffle(niz) {
            let trenutniIndex = niz.length, randomIndex;
            while (trenutniIndex != 0) {
                randomIndex = Math.floor(Math.random() * trenutniIndex);
                trenutniIndex--;
                [niz[trenutniIndex], niz[randomIndex]] = [
                    niz[randomIndex], niz[trenutniIndex]];
            }
            return niz;
        }

        // FUNKCIJA ZA FILTRIRANJE PATIKA KOJE SE STAMPAJU
        function Filtar() {
            shoeList = [];
            praviNizPatikaObjekata();
            dugmadFilter = document.querySelectorAll('.filter-dugme');
            if (dugmadFilter.length < 1) { return }
            dugmadFilter.forEach(dugme => {
                let filtar = dugme.textContent.split(': ')[1]
                if (filtar != undefined) {
                    if (filtar.substring(0, 1) == "$") {
                        shoeList = shoeList.filter(shoe => {
                            return (prvaCenaGranica <= shoe.price && shoe.price <= drugaCenaGranica)
                        })
                    }
                    else {
                        shoeList = shoeList.filter(shoe => {
                            return (shoe.brand == filtar ||
                                shoe.category == filtar ||
                                shoe.model == filtar)
                        })
                    }
                }
            })
            stampajPatike(shoeList);
        }

        // STAMPANJE PATIKA
        let cartIkonica = `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor"
        class="bi bi-cart3" viewBox="0 0 16 16">
        <path
            d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" /></svg>`

        function stampajPatike(shoeList) {
            let svePatike = document.querySelectorAll('.shoe')
            svePatike.forEach(patika => { patika.remove() })
            for (let shoe of shoeList) {
                let patikaOkvir = document.createElement('article');
                patikaOkvir.classList.add('shoe', 'mt-4', 'container');
                let patikaImg = document.createElement('img');
                patikaImg.src = shoe.imgSrc;
                patikaImg.alt = shoe.imgSrc.slice(shoe.imgSrc.length - 9, shoe.imgSrc.length - 4);
                let strong = document.createElement('strong');
                strong.textContent = shoe.brand + " " + shoe.model;
                let iTag = document.createElement('i');
                iTag.textContent = shoe.category;
                let p = document.createElement('p');
                p.textContent = "$" + shoe.price;
                let a = document.createElement('a');
                a.setAttribute('data-bs-toggle', 'tooltip');
                a.setAttribute('data-bs-placement', 'top');
                a.setAttribute('data-bs-title', 'Add to cart');
                a.innerHTML = cartIkonica;
                patikaOkvir.append(patikaImg, strong, iTag, p, a);
                patikeDisplay.append(patikaOkvir);
            }
        }
        // INICIJALNO POKRETANJE STAMPANJA
        if (categoryUrl) {
            StampajDugme(categoryUrl, dugmadFilter, 'Category')
        }
        else if (modelUrl) {
            StampajDugme(brandUrl, dugmadFilter, 'Brand')
            StampajDugme(modelUrl, dugmadFilter, 'Model')
        }
        else if (brandUrl) {
            StampajDugme(brandUrl, dugmadFilter, 'Brand')
        }
        Filtar();
        stampajPatike(shoeList);
    }
    //* * * * * * * * * * * * * * * * * * * * * ZAJEDNICKI DEO ZA SVE STRANICE * * * * * * * * * * * * * * * * * * * * * * * *
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
    const linkoviSajta = ["https://djordjeknezevic.github.io/", "Dokumentacija.pdf", "sitemap.xml"];
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
}


// FUNKCIJA ZA PROVERU ISPRAVNOSTI UNETOG TEKSTA POMOCU REGULARNIH IZRAZA
function regexProvera(objekatPolje, errorTekst, regexNiz, porukaNiz, dodatanRegex = null, dodatnaPoruka = null) {
    for (let i = 0; i < porukaNiz.length; i++) {
        if (!objekatPolje.value) {
            errorTekst.classList.add('hide');
            objekatPolje.classList.add('error-border');
            tmpGreska = true;
            break;
        }
        else if (dodatanRegex && dodatanRegex.test(objekatPolje.value)) {
            objekatPolje.classList.add('error-border');
            errorTekst.textContent = dodatnaPoruka;
            errorTekst.classList.remove('hide');
            tmpGreska = true;
            break;
        }
        else if (!regexNiz[i].test(objekatPolje.value)) {
            objekatPolje.classList.add('error-border');
            errorTekst.textContent = porukaNiz[i];
            errorTekst.classList.remove('hide');
            tmpGreska = true;
            break;
        }
        else {
            objekatPolje.classList.remove('error-border');
            errorTekst.classList.add('hide');
            tmpGreska = false;
        }
    }
}