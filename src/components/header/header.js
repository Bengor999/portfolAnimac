
export default function shouMenuBurger () {
    let iconBurger = document.querySelector('.header__burger');
    if(iconBurger) {
        let menuBurger = document.querySelector('.header__nav');
        iconBurger.addEventListener("click", function () {
            document.body.classList.toggle('js-lock-scroll')
            iconBurger.classList.toggle('js-cross');
            menuBurger.classList.toggle('js-active');
        })
    }
    
}


