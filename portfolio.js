const toggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.header__menu');

toggle.addEventListener('click', () => {
    menu.classList.toggle('active');
});