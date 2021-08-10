//
// CКРИПТ ПРОКРУТКИ
//

// Показ кнопки

window.onscroll = () => {
    if(window.scrollY > 500) {
        scrollBtn.classList.remove('scroll-top--hide')
    } else if (window.scrollY < 500) {
        scrollBtn.classList.add('scroll-top--hide')
    }
}

const scrollBtn = document.querySelector('.scroll-top')

// Запуск скрипта при клике
scrollBtn.onclick = () => {
    scrollToElem('#top');
}

//
// Кроссбраузерный скрипт прокрутки
//

const nativeSmoothScrollTo = elem => {
    window.scroll({
        behavior: 'smooth',
        left: 0,
        top: elem.getBoundingClientRect().top + window.pageYOffset
    });
};

// polyfilled smooth scrolling for IE, Edge & Safari
const smoothScrollTo = (to, duration) => {
    const element = document.scrollingElement || document.documentElement,
        start = element.scrollTop,
        change = to - start,
        startDate = +new Date();

    // t = current time
    // b = start value
    // c = change in value
    // d = duration
    const easeInOutQuad = (t, b, c, d) => {
        t /= d/2;
        if (t < 1) return c/2*t*t + b;
        t--;
        return -c/2 * (t*(t-2) - 1) + b;
    };

    const animateScroll = _ => {
        const currentDate = +new Date();
        const currentTime = currentDate - startDate;
        element.scrollTop = parseInt(easeInOutQuad(currentTime, start, change, duration));
        if(currentTime < duration) {
            requestAnimationFrame(animateScroll);
        }
        else {
            element.scrollTop = to;
        }
    };
    animateScroll();
};

// detect support for the behavior property in ScrollOptions
const supportsNativeSmoothScroll = 'scrollBehavior' in document.documentElement.style;

// smooth scrolling stub
const scrollToElem = elemSelector => {
    if (!elemSelector) {
        return;
    }

    const elem = document.querySelector(elemSelector);
    if (elem) {
        if (supportsNativeSmoothScroll) {
            nativeSmoothScrollTo(elem);
        } else {
            smoothScrollTo(elem.offsetTop, 600);
        }
    }
};