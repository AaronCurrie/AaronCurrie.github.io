
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

function leftReveal() {
    var reveals = document.querySelectorAll(".reveal-left");
  
    for (var i = 0; i < reveals.length; i++) {
      var windowHeight = window.innerHeight;
      var elementTop = reveals[i].getBoundingClientRect().top;
      var elementVisible = 200;
  
      if (elementTop < windowHeight - elementVisible) {
        reveals[i].classList.add("active");
      }
    }
  }


  function rightReveal() {
    var reveals = document.querySelectorAll(".reveal-right");
    
    for (var i = 0; i < reveals.length; i++) {
      var windowHeight = window.innerHeight;
      var elementTop = reveals[i].getBoundingClientRect().top;
      var elementVisible = 200;
  
      if (elementTop < windowHeight - elementVisible) {
        growBars()
        reveals[i].classList.add("active");
      }
    }
  }

  function growBars() {
    var bars = document.querySelectorAll(".bar-holder");
    bars.forEach(bar => {
        bar.classList.add('growBars')
    })
  }
  
  window.addEventListener("scroll", leftReveal);
  window.addEventListener("scroll", rightReveal);
  //window.addEventListener("scroll", growBars);

