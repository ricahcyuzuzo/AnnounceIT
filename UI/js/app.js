const openNav = document.querySelector('#openNav');
const closeNav = document.querySelector('#closeNav');
const mobileMenu = document.querySelector('#mobileMenu');
const joinUs = document.querySelector('#join-button');


// Creating event listeners

openNav.addEventListener('click', openNavi);
closeNav.addEventListener('click', closeNavi);
joinUs.addEventListener('click', signup);

function openNavi() {
    mobileMenu.style.width = "100%";
}

function closeNavi() {
    mobileMenu.style.width = "0%";
}

function signup() {
    window.location.href = '../html/signup.html';
}




