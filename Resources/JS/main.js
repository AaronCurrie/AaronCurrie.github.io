
const menuButton = document.getElementById("mobile-menu");
const mobileMenu = document.getElementById("mobile-nav");

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