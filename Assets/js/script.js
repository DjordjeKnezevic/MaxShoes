var tmpGreska = false;
const BASEURL = "Assets/data/";
window.onload = async function () {

    //* * * * * * * * * * * * * * * * * * * * * ZAJEDNICKI DEO ZA SVE STRANICE * * * * * * * * * * * * * * * * * * * * * * * *
    //STAMPANJE NAV MENIJA
    let navObjekti
    navObjekti = await getData('navigacija');
    let navbarNav = document.getElementsByClassName("navbar-nav")[0];
    for (let o of navObjekti) {
        let li = document.createElement('li');
        li.classList.add('nav-item');
        let a = document.createElement('a');
        a.classList.add('nav-link', 'text-light');
        a.href = o.link;
        a.textContent = o.naziv;
        li.appendChild(a);
        navbarNav.appendChild(li);
    }
    if (window.innerWidth < 650) {
        let logoIme = document.getElementById('logo-ime')
        logoIme.textContent = 'MS';
        logoIme.classList.remove('text-light');
        logoIme.classList.add('lgreen-lg');
        console.log(logoIme)
    }

    // ANIMACIJA NAVBARA PRI SCROLL-U (POJAVLJIVANJE I NESTAJANJE)
    let lastScroll = 0;
    navbar = document.querySelector('.navbar-meni');
    const validateHeader = () => {
        const windowY = window.scrollY;
        const windowH = window.innerHeight;
        if (windowY > windowH - 1400) {
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
    const reUsername = [
        /^[\w\d!@#$%^&*._]{5,20}$/,
        /^[A-Z][\w\d!@#$%^&*._]{4,19}$/
    ];
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
    const rePassword = [
        /^[\w\d!@#$%^&*._]{8,20}$/,
        /^([\w!@#$%^&*._]{7,19}[\d]+)|([\d]+[\w!@#$%^&*._]{7,19})$/,
        /^([\w\d]{7,19}[!@#$%^&*._]+)|([!@#$%^&*._]+[\w\d]{7,19})$/,
        /^[A-Z][\w\d!@#$%^&*._]{7,19}$/
    ];
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
    let dodatanReFirstLastName = /^[A-Z]([\w\dŽĐŠĆČćđčžšшђжћчЂШЖЋЧ]{2,19}[\d!@#$%^&*._]+)|([\d!@#$%^&*._]+[\w\dŽĐŠĆČćđčžšшђжћчЂШЖЋЧ]{2,19})$/;
    const reFirstLastName = [
        /^[\w\dŽĐŠĆČćđčžš]{3,20}$/,
        /^[A-Z][\w\dŽĐŠĆČćđčžšшђжћчЂШЖЋЧ]{2,19}$/
    ];
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
        regexProvera(signupFirstName, firstNameError, reFirstLastName, porukaFirstLastName, dodatanReFirstLastName, dodatnaPorukaFirstLastName);
    })
    signupLastName.addEventListener('blur', () => {
        regexProvera(signupLastName, lastNameError, reFirstLastName, porukaFirstLastName, dodatanReFirstLastName, dodatnaPorukaFirstLastName);
    })

    // PROVERA ISPRAVNOSTI MAIL-A
    const reEmail = [/^[a-z\d\._]{3,19}@[a-z]{3,10}(\.[a-z]{2,5}$){1,4}/];
    const porukaEmail = [
        'Invalid email format (Email must contain "@" and end with a domain name (Ex. ".com")))'
    ];
    let emailError = document.getElementById('email-error');
    let signupEmail = document.getElementById('signup-email');
    signupEmail.addEventListener('blur', () => {
        regexProvera(signupEmail, emailError, reEmail, porukaEmail);
    })

    // PROVERA ISPRAVNOSTI ADRESE
    const reAddress = [
        /^(([A-Z][\w\d\.\-]+)|([\d]+\.?))(\s{1}[\w\d\.\-\/]+)+$/,
        /^(([A-Z][\w\d\.\-]+)|([\d]+\.?))(\s{1}[\w\d\/\.\-]+){0,7}$/,
        /^(([A-Z][\w\d\.\-]+)|([\d]+\.?))(\s{1}[\w\d\/\.\-]+){0,7}\s(([\d]{1,3}((\/(([\d]{1,2}[\w]?)|([\w]{1,2}))|([\w])))?)|((BB)|(bb)))$/
    ];
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
        } else {
            greska = false;
            tacCheckbox.classList.remove('error-border');
        }
        for (let i = 0; i < 6; i++) {
            if (i == 2 || i == 3) {
                regexProvera(objektiPoljeNiz[i], objektiErrorNiz[i], regexIzrazi[i], porukeNiz[i], reFirstLastName3, dodatnaPorukaFirstLastName)
                if (tmpGreska) {
                    greska = true;
                }
            } else {
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


    // FUNKCIJA ZA SHUFFLE-OVANJE ELEMENATA NIZA
    function shuffle(niz) {
        let trenutniIndex = niz.length,
            randomIndex;
        while (trenutniIndex != 0) {
            randomIndex = Math.floor(Math.random() * trenutniIndex);
            trenutniIndex--;
            [niz[trenutniIndex], niz[randomIndex]] = [
                niz[randomIndex], niz[trenutniIndex]
            ];
        }
        return niz;
    }

    var shoeList = await getData('proizvodi');
    shuffle(shoeList);

    //* * * * * * * * * * * * * * * * * * * * * * * * * * INDEX STRANICA * * * * * * * * * * * * * * * * * * * * * * * * * * *
    let url = document.location.pathname;
    if (url == "/MaxShoes/" ||
        url == "/MaxShoes/index.html" ||
        url == "/MaxShoes/#") {
        // if (url == "/" ||
        //     url == "/index.html" ||
        //     url == "/#") {

        // FADEOUT ANIMACIJA WELCOME EKRANA
        let bgSlike = welcomeScreen.getElementsByTagName("img");
        for (let i = 0; i < bgSlike.length; i++) {
            bgSlike[i].addEventListener("animationend", () => {
                welcomeScreen.appendChild(bgSlike[0]);
            });
        }

        // STAMPANJE CAROUSEL STRELICA BUTTON-A
        let carouselSlajderi = document.querySelector(".carousel-inner");
        const carouselKontrole = ["prev", "next"]
        const carouselKontroleTekst = ["Previous", "Next"]
        for (let i = 0; i < carouselKontrole.length; i++) {
            carouselSlajderi.innerHTML += `
                <button class="carousel-control-${carouselKontrole[i]}" type="button" data-bs-target="#menjaj-sliku"
                data-bs-slide="${carouselKontrole[i]}">
                <span class="carousel-control-${carouselKontrole[i]}-icon" aria-hidden="true"></span>
                <span class="visually-hidden">${carouselKontroleTekst[i]}</span>
            </button>
            `
        }

        // STAMPANJE CAROUSEL PRAVOUGAONIH BUTTON-A
        let carouselButtons = document.querySelector(".carousel-indicators");
        for (let i = 1; i < 4; i++) {
            carouselButtons.innerHTML += `<button type="button" data-bs-target="#menjaj-sliku" 
                data-bs-slide-to="${i - 1}" class="active"
                aria - current="true" aria - label="Slide ${i}" ></button >`
        }

        // STAMPANJE KATEGORIJA
        let kategorije = document.querySelector('.container .row');
        for (let i = 0; i < 3; i++) {
            kategorije.innerHTML += `<a href="${navObjekti[i].link}" class="nav-link col-md-3">
        <div class="hcontainer ${navObjekti[i].klasa}">
            <h3>${navObjekti[i].naziv}</h3>
        </div>
        <img src="${navObjekti[i].slika.src}" alt="${navObjekti[i].slika.alt}">
    </a>`;
        }
    }

    //* * * * * * * * * * * * * * * * * * * * * * * * * * PRODUCTS STRANICA * * * * * * * * * * * * * * * * * * * * * * * * * * *
    else if (url == "/MaxShoes/products.html") {
        // else if (url == "/products.html") {

        // ENABLE-OVANJE BOOTSTRAPOVOG TOOLTIP-A ZA KORPE
        $(document).ready(function () {
            $('body').tooltip({
                selector: '#patike-display article a'
            });
        });

        // STAMPANJE, POSTAVLJANJE INICIJALNIH VREDNOSTI I UPDATE-OVANJE VREDNOSTI DUPLOG SLAJDERA
        let prvaCenaGranica = 0,
            drugaCenaGranica = 300;
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
                    glavniFiltar()
                }
            });
            $("#amount").text("Price range: $" + $slider.slider("values", 0) + " - $" + $slider.slider("values", 1));
        });

        let kategorije = await getData('kategorije');
        let brendovi = await getData('brendovi');
        let opcijeZaSortiranje = await getData('sortiranje');


        let kategorijeTekst = kategorije.map(kategorija => kategorija.naziv)
        let brendoviTekst = brendovi.map(brend => brend.naziv)
        let sortirajTekst = opcijeZaSortiranje.map(opcija => opcija.naziv)


        let kategorijeOpcije = document.getElementById('kategorije-opcije')
        let brendoviOpcije = document.getElementById('brendovi')
        let sortirajOpcije = document.getElementById('sortiraj-po')

        let filterDisplay = document.getElementById('filter-display')
        let ukloniFiltre = document.getElementById('ukloni-filtre');
        var dugmadFilter = document.querySelectorAll('.filter-dugme');

        // DINAMICKO STAMPANJE DROPDOWN LISTA
        for (let k of kategorije) {
            kategorijeOpcije.innerHTML += `
            <li class="dropdown-item text-light">${k.naziv}</li>
            `
        }
        for (let b of brendovi) {
            brendoviOpcije.innerHTML += `
            <li class="dropdown-item text-light">${b.naziv}</li>
            `
        }
        for (let o of opcijeZaSortiranje) {
            sortirajOpcije.innerHTML += `
            <li class="dropdown-item text-light">${o.naziv}</li>
            `
        }

        // DODAVANJE EVENT-OVA DROPDOWN LISTAMA ZA STAMPANJE I UPDATE-OVANJE DUGMADI
        const listaBrendova = document.querySelectorAll('#brendovi .dropdown-item');
        const listaSortiranja = document.querySelectorAll('#sortiraj-po .dropdown-item');
        const listaKategorija = document.querySelectorAll('#kategorije-opcije .dropdown-item');
        const listaDodatnihFiltra = document.querySelectorAll('#ostali-filtri input');

        document.querySelector('#ostali-filtri').addEventListener('click', function (e) {
            e.stopPropagation();
        })
        listaDodatnihFiltra.forEach(function (filtar) {
            filtar.addEventListener('change', function () {
                let imeFiltra = filtar.dataset.name;
                if (filtar.checked) {
                    dugmadFilter = document.querySelectorAll('.filter-dugme');
                    StampajDugme(imeFiltra, dugmadFilter);
                    glavniFiltar();
                } else {
                    $(`.filter-dugme:contains(${imeFiltra})`).remove();
                    glavniFiltar();
                }
            });
        })

        function dodajEventDdListama(listaOpcija, listaTekstova, key) {
            for (let i = 0; i < listaOpcija.length; i++) {
                listaOpcija[i].addEventListener('click', function () {
                    dugmadFilter = document.querySelectorAll('.filter-dugme');
                    let opcija = listaOpcija[i].textContent;
                    let stampaj = true;
                    for (let i = 0; i < dugmadFilter.length; i++) {
                        if (listaTekstova.includes(dugmadFilter[i].textContent.split(': ')[1])) {
                            dugmadFilter[i].firstChild.textContent = `${key}: ${opcija}`
                            stampaj = false;
                            break;
                        }
                    }
                    if (stampaj) {
                        StampajDugme(opcija, dugmadFilter, key);
                    }
                    glavniFiltar();
                })
            }
        }

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

        // FUNKCIJA ZA RESETOVANJE SLAJDER-A
        function ResetSlider() {
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
            if (dugme.parentElement.textContent.split(' ')[0] == "Price") ResetSlider();
            if (dugme.parentElement.textContent == "Free shipping") $('#free-shipping').prop('checked', false);
            if (dugme.parentElement.textContent == "On Discount") $('#on-discount').prop('checked', false);
            dugme.parentElement.remove();
            if (dugmadFilter.length == 2) {
                SakrijCistac();
            }
            glavniFiltar()
        }

        // FUNKCIJA ZA SAKRIVANJE CISTAC DUGMETA I UKLANJANJE OSTALIH (PREKO POZIVANJA UkloniRoditelja() FUNKCIJE)
        function SakrijCistac(nizFilterDugmadi = null) {
            ukloniFiltre.classList.add('hide');
            if (nizFilterDugmadi) {
                ResetSlider()
                $('#free-shipping').prop('checked', false);
                $('#on-discount').prop('checked', false);
                while (filterDisplay.childNodes.length > 2) {
                    filterDisplay.removeChild(filterDisplay.firstChild);
                }
                glavniFiltar()
            }
            patikeDisplay.style.height = "92%"
        }

        // FUNKCIJA ZA STAMPANJE FILTER DUGMETA
        function StampajDugme(opcija, nizFilterDugmadi, key = null) {
            let filterDugme = document.createElement('button');
            filterDugme.classList.add('btn', 'dark-blue-bg', 'text-light', 'ms-3', 'filter-dugme');
            filterDugme.textContent = key ? `${key}: ${opcija}` : `${opcija}`
            let closeDugme = document.createElement('button');
            closeDugme.classList.add('btn-close', 'ms-2', 'ukloni-dugme');
            closeDugme.addEventListener('click', function () {
                UkloniRoditelja(closeDugme, nizFilterDugmadi);
            })
            filterDugme.appendChild(closeDugme);
            filterDisplay.insertBefore(filterDugme, nizFilterDugmadi[0])
            ukloniFiltre.classList.remove('hide');
            if (window.innerWidth < 531) {
                patikeDisplay.style.height = "75%"
            } else if (window.innerWidth < 869) {
                patikeDisplay.style.height = "80%"
            } else if (window.innerWidth < 1000) {
                patikeDisplay.style.height = "85%"
            } else {
                patikeDisplay.style.height = "87%"
            }
        }

        // SELEKTOVANJE I DODAVANJE EVENT-A CISTAC DUGMETU
        let dugmeSakrijCistaca = document.querySelector('#ukloni-filtre');
        dugmeSakrijCistaca.addEventListener('click', function () {
            SakrijCistac(dugmadFilter)
        })

        // FUNKCIJA ZA SORTIRANJE ELEMENATA NIZA
        function sort(shoeList, type) {
            switch (type) {
                case "price-ascending":
                    shoeList.sort(function (a, b) {
                        if (a.price.discount && b.price.discount) return a.price.discount * a.price.basePrice - b.price.discount * b.price.basePrice;
                        if (a.price.discount && !b.price.discount) return a.price.discount * a.price.basePrice - b.price.basePrice;
                        if (!a.price.discount && b.price.discount) return a.price.basePrice - b.price.discount * b.price.basePrice;
                        if (!a.price.discount && !b.price.discount) return a.price.basePrice - b.price.basePrice;
                    })
                    break;
                case "price-descending":
                    shoeList.sort(function (a, b) {
                        if (a.price.discount && b.price.discount) return b.price.discount * b.price.basePrice - a.price.discount * a.price.basePrice;
                        if (a.price.discount && !b.price.discount) return b.price.basePrice - a.price.basePrice * a.price.discount;
                        if (!a.price.discount && b.price.discount) return b.price.basePrice * b.price.discount - a.price.basePrice;
                        if (!a.price.discount && !b.price.discount) return b.price.basePrice - a.price.basePrice;
                    })
                    break;
                case "name-ascending":
                    shoeList.sort(function (a, b) {
                        return ((a.brand + a.model) > (b.brand + b.model) ? 1 : -1)
                    })
                    break;
                case "name-descending":
                    shoeList.sort(function (a, b) {
                        return ((a.brand + a.model) > (b.brand + b.model) ? -1 : 1)
                    })
                    break;
            }
        }

        // FUNKCIJA ZA FILTRIRANJE PATIKA
        async function glavniFiltar() {
            shoeList = await getData('proizvodi');
            dugmadFilter = document.querySelectorAll('.filter-dugme');
            if (dugmadFilter.length < 1) return
            dugmadFilter.forEach(dugme => {
                let filtar = dugme.textContent.split(': ')[1]
                if (filtar == undefined) {
                    let filtar2 = dugme.textContent.split(': ')[0]
                    if (filtar2 == 'Free shipping') {
                        shoeList = shoeList.filter(shoe => {
                            return shoe.price.shipping == null
                        })
                    } else if (filtar2 == 'On Discount') {
                        shoeList = shoeList.filter(shoe => {
                            return shoe.price.discount != null
                        })
                    }
                } else {
                    if (filtar.substring(0, 1) == "$") {
                        shoeList = shoeList.filter(shoe => {
                            if (shoe.price.discount) return (prvaCenaGranica <= shoe.price.basePrice * shoe.price.discount && shoe.price.basePrice * shoe.price.discount <= drugaCenaGranica)
                            return (prvaCenaGranica <= shoe.price.basePrice && shoe.price.basePrice <= drugaCenaGranica)
                        })
                    } else if (filtar.split(' ')[0] == "Price") {
                        if (filtar.split(' ')[1] == "Ascending") {
                            sort(shoeList, "price-ascending")
                        } else {
                            sort(shoeList, "price-descending")
                        }
                    } else if (filtar.split(' ')[0] == "Name") {
                        if (filtar.split(' ')[1] == "Ascending") {
                            sort(shoeList, "name-ascending")
                        } else {
                            sort(shoeList, "name-descending")
                        }
                    } else {
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
        let idUKorpi = cartArr.map(obj => obj.id)
        async function stampajPatike(shoeList) {
            let svePatike = document.querySelectorAll('.shoe')
            svePatike.forEach(patika => {
                patika.remove()
            })
            if (shoeList.length == 0) {
                patikeDisplay.innerHTML =
                    `<div class="alert alert-danger mt-3 p-4 rounded-pill d-flex align-items-center justify-content-center text-center" id="no-shoes">
                <h2>Sorry, no shoes matching your filters</h2></div>`;
                return;
            }
            patikeDisplay.innerHTML = '';
            for (let shoe of shoeList) {
                let bgColor;
                if (shoe.category == 'Men') bgColor = 'dark-blue-bg text-white';
                if (shoe.category == 'Women') bgColor = 'pink-bg text-dark';
                if (shoe.category == 'Kids') bgColor = 'lgreen-bg text-dark';
                patikeDisplay.innerHTML += `
                <article class="shoe mt-4 container">
                <img src="${shoe.img.src}" alt="${shoe.img.alt}" class="img-fluid">
                <strong class="d-block">${shoe.brand} ${shoe.model}</strong>
                <i class="d-inline-block ${bgColor} w-75 rounded">${shoe.category}</i>
                <div id="shoe-price">
                ${shoe.price.discount ? 
                    "<p class='text-decoration-line-through d-inline mx-2 text-danger fst-italic'>$" + shoe.price.basePrice + 
                    "</p>" + "<p class='d-inline text-success fw-bold'>$" + Math.round(shoe.price.basePrice * shoe.price.discount, 1) + 
                    "<strong class='d-inline text-black fst-italic'>(" + Math.round((1 - shoe.price.discount) * 100) + "% off!)</strong>" :
                    "<p>$" + shoe.price.basePrice + "</p>"
                }
                </div>
                ${shoe.price.shipping ? "<i id='text-shipping' class='bg-dark d-inline-block text-white p-2 rounded-pill'>Shipping: $" + shoe.price.shipping + "</i>" : 
                '<img src="Assets/img/free-shipping.png" alt="free shipping" class="img-fluid" id="free-shipping-img">'}
                
                <a data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Add to cart">
                <svg data-id="${shoe.id}" xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-cart3 korpa ${idUKorpi.includes(shoe.id) ? 'crvena' : 'plava'}" viewBox="0 0 16 16" data-bs-title="Remove from cart">
        <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"></path></svg></a></article>
                `
            }
            dodajEventKorpama()
        }


        // INICIJALNO POKRETANJE STAMPANJA
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const categoryUrl = urlParams.get('category');
        const brandUrl = urlParams.get('brand');
        const modelUrl = urlParams.get('model');
        const discountUrl = urlParams.get('discount');
        if (categoryUrl) {
            StampajDugme(categoryUrl, dugmadFilter, 'Category');
        }
        if (modelUrl) {
            StampajDugme(brandUrl, dugmadFilter, 'Brand');
            StampajDugme(modelUrl, dugmadFilter, 'Model');
        }
        if (brandUrl) {
            StampajDugme(brandUrl, dugmadFilter, 'Brand');
        }
        if (discountUrl) {
            $('#on-discount').prop('checked', true);
            StampajDugme(discountUrl, dugmadFilter);
        }
        dodajEventDdListama(listaBrendova, brendoviTekst, 'Brand');
        dodajEventDdListama(listaKategorija, kategorijeTekst, 'Category');
        dodajEventDdListama(listaSortiranja, sortirajTekst, 'Sort By');
        glavniFiltar();
    }

    //* * * * * * * * * * * * * * * * * * * * * * * * * * CART STRANICA * * * * * * * * * * * * * * * * * * * * * * * * * * *
    else if (url == "/MaxShoes/cart.html") {
        // else if (url == "/cart.html") {
        document.querySelector('#clear').addEventListener('click', function () {
            localStorage.removeItem("korpa");
            stampajKorpu();
        })

        let stavkeUKorpi;

        function stampajKorpu() {
            let korpaDrzac = document.querySelector('#korpa-drzac');
            let totalText = document.getElementById('total');
            if (!localStorage.getItem("korpa")) {
                korpaDrzac.innerHTML = `<div class="alert alert-danger mt-3 p-4 rounded-pill d-flex align-items-center justify-content-center text-center" id="no-shoes">
                <h2>You don't have any items in your cart</h2></div>`;
                totalText.innerHTML = `Total: $0.00`
                document.querySelectorAll('#korpa-info button').forEach(button => {
                    button.enabled = false;
                })
                return;
            }
            document.querySelectorAll('#korpa-info button').forEach(button => {
                button.enabled = true;
            })
            stavkeUKorpi = JSON.parse(localStorage.getItem("korpa"));
            let html = '';
            let total = 0;
            for (let stavka of stavkeUKorpi) {
                stavka.price.discount ? total += stavka.price.discount * stavka.price.basePrice + stavka.price.shipping :
                    total += stavka.price.basePrice + stavka.price.shipping
                let bgColor;
                if (stavka.category == 'Men') bgColor = 'dark-blue-bg text-white';
                if (stavka.category == 'Women') bgColor = 'pink-bg text-dark';
                if (stavka.category == 'Kids') bgColor = 'lgreen-bg text-dark';
                html += `
                <div class="row border border-dark stavka my-2 d-flex">
                <i class="fa-solid fa-trash obrisi-stavku" data-id="${stavka.id}"></i>

                <div class="col-md-5 d-flex flex-column border-bottom p-2">
                <hgroup>
                <h2 class="text-decoration-underline">${stavka.brand} ${stavka.model}</h2>
                <i class="${bgColor} p-2 my-1 d-inline-block rounded">${stavka.category}</i>
                </hgroup>
                </div>
                <div class="col-md-3 d-flex flex-column border-bottom p-2">
                <h2 class="text-decoration-underline">Price:</h2>
                ${stavka.price.discount ? 
                    "<hgroup><h5 class='text-decoration-line-through d-inline text-danger fst-italic'>$" + stavka.price.basePrice + 
                    "</h5>" + "<h5 class='d-inline text-success fw-bold mx-2'>$" + Math.round(stavka.price.basePrice * stavka.price.discount, 1) + "</h5></hgroup>":
                    "<h5>$" + stavka.price.basePrice + "</h5>"
                }
                <p>+$${stavka.price.shipping ? stavka.price.shipping : '0.00'} shipping</p>
                
                </div>
    
                
                <div class="col-md-4 d-flex border-bottom">
                <img class="img-fluid p-2" src="${stavka.img.src}">
                </div>
                
                
                </div>
                `
            }
            totalText.innerHTML = `Total: $${total}`
            html += ``
            korpaDrzac.innerHTML = html;
        }
        stampajKorpu()
        document.querySelectorAll('.obrisi-stavku').forEach(dugme => {
            dugme.addEventListener('click', function () {
                console.log("wt")
                let indexZaBrisanje = stavkeUKorpi.indexOf(stavkeUKorpi.find(stavka => stavka.id == dugme.dataset.id))
                stavkeUKorpi.splice(indexZaBrisanje, 1)
                setLs('korpa', stavkeUKorpi)
                stampajKorpu();
            })
        })

    }

    //* * * * * * * * * * * * * * * * * * * * * ZAJEDNICKI DEO ZA SVE STRANICE * * * * * * * * * * * * * * * * * * * * * * * *
    // STAMPANJE LEVOG DELA FOOTERA
    let footerSection = document.querySelectorAll("footer section");
    let ikoniceObjekti = await getData('ikonice');

    for (let i = 0; i < 3; i++) {
        footerSection[0].innerHTML += `
                <a href="${ikoniceObjekti[i].link}" class="text-light nav-link">
                <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor"
                    class="${ikoniceObjekti[i].klasa}" viewBox="0 0 16 16">
                    ${ikoniceObjekti[i].path[1] ? 
                        '<path d="' + ikoniceObjekti[i].path[0] + '"/>' + '<path d="' + ikoniceObjekti[i].path[1] + '"/>' : 
                        '<path d="' + ikoniceObjekti[i].path[0] + '"/>'}
                </svg></a>
                `;
    }

    // STAMPANJE CENTRALNOG DELA FOOTERA
    for (let i = 3; i < 6; i++) {
        footerSection[1].innerHTML += `<article>
                <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor"
                    class="${ikoniceObjekti[i].klasa} text-light" viewBox="0 0 16 16">
                    ${ikoniceObjekti[i].path[1] ? 
                        '<path d="' + ikoniceObjekti[i].path[0] + '"/>' + '<path d="' + ikoniceObjekti[i].path[1] + '"/>' : 
                        '<path d="' + ikoniceObjekti[i].path[0] + '"/>'}
                </svg>
                <p class="text-light">${ikoniceObjekti[i].label}</p>
            </article>`;
    }


    // STAMPANJE DESNOG DELA FOOTERA
    for (let i = 6; i < 9; i++) {
        if (i != 8) {
            footerSection[2].innerHTML += `<a href="${ikoniceObjekti[i].link}" class="nav-link">
                <h5 class="text-light">${ikoniceObjekti[i].label}</h5>
            </a>`;
        } else {
            footerSection[2].innerHTML += `<a href="sitemap.xml" class="text-light">
                <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor"
                    class="${ikoniceObjekti[i].klasa}" viewBox="0 0 16 16">
                    <path fill-rule="evenodd"
                        d="${ikoniceObjekti[i].path[0]}" />
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
        } else if (dodatanRegex && dodatanRegex.test(objekatPolje.value)) {
            objekatPolje.classList.add('error-border');
            errorTekst.textContent = dodatnaPoruka;
            errorTekst.classList.remove('hide');
            tmpGreska = true;
            break;
        } else if (!regexNiz[i].test(objekatPolje.value)) {
            objekatPolje.classList.add('error-border');
            errorTekst.textContent = porukaNiz[i];
            errorTekst.classList.remove('hide');
            tmpGreska = true;
            break;
        } else {
            objekatPolje.classList.remove('error-border');
            errorTekst.classList.add('hide');
            tmpGreska = false;
        }
    }
}

function ajaxCall(fajl) {
    return $.ajax({
        url: BASEURL + fajl,
        method: "get",
        dataType: "text",
        success: function (rezultat) {
            return rezultat;
        },
        error: function (jqXHR, exception) {
            // console.log(jqXHR);
            var msg = '';
            if (jqXHR.status === 0) {
                msg = 'Not connect.\n Verify Network.';
            } else if (jqXHR.status == 404) {
                msg = 'Requested page not found. [404]';
            } else if (jqXHR.status == 500) {
                msg = 'Internal Server Error [500].';
            } else if (exception === 'parsererror') {
                msg = 'Requested JSON parse failed.';
            } else if (exception === 'timeout') {
                msg = 'Time out error.';
            } else if (exception === 'abort') {
                msg = 'Ajax request aborted.';
            } else {
                msg = 'Uncaught Error.\n' + jqXHR.responseText;
            }
            return msg;
        }
    })
}

function setLs(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

async function getData(keyName) {
    if (!localStorage.getItem(keyName)) {
        let tmpData = JSON.parse(await ajaxCall(keyName + ".json"));
        setLs(keyName, tmpData);
        return tmpData;
    } else {
        return JSON.parse(localStorage.getItem(keyName));
    }
}

// FUNKCIJA ZA STAMPANJE BROJA ARTIKLA U KORPI
let ikonice = document.querySelectorAll('.icons a svg')
let brojacOkvir = document.getElementById('brojac');
let navbar = document.querySelector('.navbar-meni');

function stampajBrojac(brojac, promena) {
    if (brojac > 1 || (brojac == 1 && promena == -1)) {
        brojacOkvir.classList.remove('hide')
        brojacOkvir.textContent = brojac
    } else if (brojac == 0) {
        if (window.innerWidth < 456) {
            navbar.style.padding = '5px 0 0 0'
        }
        brojacOkvir.classList.add('hide')
        ikonice.forEach(ikonica => {
            ikonica.style.marginTop = '0px'
        })
    } else if (brojac == 1 && promena == 1) {
        if (window.innerWidth < 456) {
            navbar.style.padding = '0 0 0 0'
        }
        brojacOkvir.classList.remove('hide')
        brojacOkvir.textContent = brojac
    }
}



// INICIJALNO STAMPANJE BROJA ARTIKLA U KORPI
let cartArr = JSON.parse(localStorage.getItem('korpa'));
if (cartArr == null) cartArr = [];
stampajBrojac(cartArr.length, 1);

// FUNKCIJA ZA DODAVANJE I IZBACIVANJE IZ KORPE ZA SVAKI PRODUKT
async function dodajEventKorpama() {
    shoeList = await getData('proizvodi');
    $(document).ready(function () {
        $(this).attr('data-bs-title', 'Remove from cart')
        $('.korpa').click(function () {
            if ($(this).hasClass('plava')) {
                $(this).removeClass('plava');
                $(this).addClass('crvena');
                $(this).parent().tooltip('disable');
                $(this).tooltip('enable');
                $('#uspesno-dodato')
                    .animate({
                        bottom: '4%',
                        opacity: '100'
                    }, 500)
                    .animate({
                        opacity: '0'
                    }, {
                        duration: 1500
                    })
                    .animate({
                        bottom: '-12%'
                    }, {
                        duration: 0
                    });
                cartArr.push(shoeList.find(shoe => shoe.id == this.dataset.id));
                setLs('korpa', cartArr);
                stampajBrojac(cartArr.length, 1);
            } else {
                $(this).removeClass('crvena');
                $(this).addClass('plava');
                $(this).tooltip('disable');
                $(this).parent().tooltip('enable');
                $('#uspesno-skinuto')
                    .animate({
                        bottom: '4%',
                        opacity: '100'
                    }, 500)
                    .animate({
                        opacity: '0'
                    }, {
                        duration: 1500
                    })
                    .animate({
                        bottom: '-12%'
                    }, {
                        duration: 0
                    });
                let objZaBrisanje = shoeList.find(shoe => shoe.id == this.dataset.id);
                let indexObj = cartArr.indexOf(objZaBrisanje);
                cartArr.splice(indexObj, 1);
                setLs('korpa', cartArr);
                stampajBrojac(cartArr.length, -1)
            }
        })
    })
}