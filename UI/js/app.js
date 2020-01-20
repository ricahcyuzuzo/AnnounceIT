const openNav = document.querySelector('#openNav');
const closeNav = document.querySelector('#closeNav');
const mobileMenu = document.querySelector('#mobileMenu');
const joinUs = document.querySelector('#join-button');
const createN = document.querySelector('#createNew');
const form = document.querySelector('#form');
// const email = document.querySelector('#email');
// const password = document.querySelector('#password');

// Creating event listeners

openNav.addEventListener('click', openNavi);
closeNav.addEventListener('click', closeNavi);
joinUs.addEventListener('click', signup);
createN.addEventListener('click',createNewAnnouncement);



function openNavi() {
    mobileMenu.style.width = "100%";
}

function closeNavi() {
    mobileMenu.style.width = "0%";
}

function signup() {
    window.location.href = '../html/signup.html';
}


function createNewAnnouncement(){
    window.location.href = '../html/create-announcement.html';
}

function checkUser() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const users = [
        {
            email: 'admin@admin.com',
            password: 'admin'
        },
        {
            email: 'ricah@ricah.com',
            password: 'ricah'
        }
    ];

    for (let i = 0; i < users.length; i++) {
        
        if (email == users[i].email && password == users[i].password) {
            window.location.href = '../html/admin-dashboard.html';
        }else{
            window.location.href = '../html/ad-dashboard.html';
        }
    }
}