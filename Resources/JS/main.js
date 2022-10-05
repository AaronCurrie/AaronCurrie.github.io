
const menuButton = document.getElementById("mobile-menu");
const mobileMenu = document.getElementById("mobile-nav");

const mobileLinks = [...document.querySelectorAll('.mobileLink')]

mobileLinks.forEach(mobileLink => {
    mobileLink.addEventListener('click', (e) => {
        mobileMenu.classList.remove('active');
        mobileMenu.classList.add('hidden');
        menuButton.innerHTML = "Menu"   
    })
})

menuButton.addEventListener("click", (e) => {
    if(mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.remove('hidden');
        mobileMenu.classList.add('active');
        menuButton.innerHTML = "X";
    } else {
        mobileMenu.classList.remove('active');
        mobileMenu.classList.add('hidden');     
        menuButton.innerHTML = "Menu"; 
    }   
})

