const headerBurgerButton = document.querySelector('.header-burger-btn');
const headerResponsiveMobile = document.querySelector('.header-res-mob');

headerBurgerButton.addEventListener('click', () => {
    if (!headerResponsiveMobile.classList.contains('openNavList')) {
        headerResponsiveMobile.classList.add('openNavList');
        headerBurgerButton.style.color = '#fff';
        headerBurgerButton.classList.add('active');
    } else {
        headerResponsiveMobile.classList.remove('openNavList');
        headerBurgerButton.style.color = '#333';
        headerBurgerButton.classList.remove('active');
    }
});

// HIDE NAVBAR LIST IN MOBILE WHEN CLICK ON BACKDROP

headerResponsiveMobile.addEventListener('click', (e) => {
    if (e.target.classList.contains('navbar-backdrop-layer')) {
        headerResponsiveMobile.classList.remove('openNavList');
        headerBurgerButton.style.color = '#333';
        headerBurgerButton.classList.remove('active');
    }
});


// CUSTOMIZE AOS ANIMATION
AOS.init({
    // Global settings:
    disable: false,
    startEvent: 'DOMContentLoaded',
    initClassName: 'aos-init',
    animatedClassName: 'aos-animate',
    useClassNames: false,
    disableMutationObserver: false,
    debounceDelay: 50,
    throttleDelay: 99,

    // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
    offset: 170,
    delay: 0,
    duration: 800,
    easing: 'ease',
    once: true,
    mirror: false,
    anchorPlacement: 'top-bottom',
});

// SWIPER COMMENTS SLIDER

if (window.outerWidth > 1000) {
    new Swiper('.comments-slider-wrapper', {
        loop: true,
        slidesPerView: 3,
        spaceBetween: 100,
        centeredSlides: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        keyboard: true,
        speed: 700
    });
} else {
    new Swiper('.comments-slider-wrapper', {
        loop: true,
        slidesPerView: 1,
        spaceBetween: 100,
        centeredSlides: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        keyboard: true,
        speed: 700
    });
}

//-------------------------------- VALIDATION RESERVATION FORM
const reservationForm = document.querySelector('.reservation-form');
const reservationInputs = document.querySelectorAll('.reservation-input');
const reservationAlertText = document.querySelector('.reservation-alert-text');

// EVENTS
reservationForm.addEventListener('submit', reservationFormValidation);

reservationInputs.forEach(input => {
    input.addEventListener('input', (e) => {
        const dataInput = e.target.dataset.input;
        switch (dataInput) {
            case 'name':
                reserveNameValidation();
                break;
            case 'age':
                reserveAgeValidation();
                break;
            case 'phone':
                reservePhoneValidation();
                break;
            case 'email':
                reserveEmailValidation();
                break;
            case 'problem':
                reserveProblemValidation();
        }
    });
});

// VALIDATION NAME INPUT
function reserveNameValidation() {
    const input = [...reservationInputs].filter(input => {
        return input.dataset.input === 'name';
    });

    if (input[0].value.length < 3 || !isNaN(input[0].value)) {
        return false;
    } else {
        return true;
    }
}

// VALIDATION AGE INPUT
function reserveAgeValidation() {
    const input = [...reservationInputs].filter(input => {
        return input.dataset.input === 'age';
    });

    const numberRegex = /[۰۱۲۳۴۵۶۷۸۹0123456789\s]+$/;

    if (!numberRegex.test(input[0].value) || input[0].value.length > 3 || input[0].value.length <= 0) {
        return false;
    } else {
        return true;
    }
}

// VALIDATION PHONE INPUT
function reservePhoneValidation() {
    const input = [...reservationInputs].filter(input => {
        return input.dataset.input === 'phone';
    });

    const phoneRegex = /^(0|\+98)?([ ]|,|-|[()]){0,2}9[0|1|2|3|4]([ ]|,|-|[()]){0,3}(?:[0-9]([ ]|,|-|[()]){0,2}){8}$/;
    if (phoneRegex.test(input[0].value)) {
        return true;
    } else {
        return false;
    }
}

// VALIDATION EMAIL INPUT
function reserveEmailValidation() {
    const input = [...reservationInputs].filter(input => {
        return input.dataset.input === 'email';
    });

    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailRegex.test(input[0].value)) {
        return true;
    } else {
        return false;
    }
}

// VALIDATION PROBLEM TEXTAREA
function reserveProblemValidation() {
    const input = [...reservationInputs].filter(input => {
        return input.dataset.input === 'problem';
    });

    if (input[0].value.length < 10) {
        return false;
    } else {
        return true;
    }
}

// RESERVATION FORM VALIDATION (SUBMITATION)
function reservationFormValidation(e) {
    if (!reserveNameValidation()) {
        e.preventDefault();
        reservationAlertText.parentElement.classList.add('active');
        // ADD ANIMATION TO ALERT WRAPPER
        reservationAlertText.parentElement.classList.add('AlertAnimation');
        reservationAlertText.innerHTML = 'لطفا نام خود را به درستی وارد کنید!';

        // RESET ANIMATION FROM ALERT WRAPPER
        setTimeout(() => {
            reservationAlertText.parentElement.classList.remove('AlertAnimation');
        }, 300);
    } else if (!reserveAgeValidation()) {
        e.preventDefault();
        reservationAlertText.parentElement.classList.add('active');
        // ADD ANIMATION TO ALERT WRAPPER
        reservationAlertText.parentElement.classList.add('AlertAnimation');
        reservationAlertText.innerHTML = 'لطفا سن خود را به درستی وارد کنید!';

        // RESET ANIMATION FROM ALERT WRAPPER
        setTimeout(() => {
            reservationAlertText.parentElement.classList.remove('AlertAnimation');
        }, 300);
    } else if (!reservePhoneValidation()) {
        e.preventDefault();
        reservationAlertText.parentElement.classList.add('active');
        // ADD ANIMATION TO ALERT WRAPPER
        reservationAlertText.parentElement.classList.add('AlertAnimation');
        reservationAlertText.innerHTML = 'لطفا شماره تلفن معتبری را وارد کنید!';

        // RESET ANIMATION FROM ALERT WRAPPER
        setTimeout(() => {
            reservationAlertText.parentElement.classList.remove('AlertAnimation');
        }, 300);
    } else if (!reserveEmailValidation()) {
        e.preventDefault();
        reservationAlertText.parentElement.classList.add('active');
        // ADD ANIMATION TO ALERT WRAPPER
        reservationAlertText.parentElement.classList.add('AlertAnimation');
        reservationAlertText.innerHTML = 'لطفا ایمیل معتبری را وارد کنید!';

        // RESET ANIMATION FROM ALERT WRAPPER
        setTimeout(() => {
            reservationAlertText.parentElement.classList.remove('AlertAnimation');
        }, 300);
    } else if(!reserveProblemValidation()){
        e.preventDefault();
        reservationAlertText.parentElement.classList.add('active');
        // ADD ANIMATION TO ALERT WRAPPER
        reservationAlertText.parentElement.classList.add('AlertAnimation');
        reservationAlertText.innerHTML = 'لطفا بیشتر از مشکلت برامون بگو!!';

        // RESET ANIMATION FROM ALERT WRAPPER
        setTimeout(() => {
            reservationAlertText.parentElement.classList.remove('AlertAnimation');
        }, 300);
    }


}