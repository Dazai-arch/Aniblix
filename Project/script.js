document.addEventListener('scroll',() => {
    const header =document.querySelector('header');
    if(window.scrollY >0){
        header.classList.add('scrolled');

    }else{
        header.classList.remove('scrolled');    
    }
})

let slideIndex = 0;

function showSlides() {
    const slides = document.querySelectorAll('.slides img');
    if (slideIndex >= slides.length) {
        slideIndex = 0;
    } else if (slideIndex < 0) {
        slideIndex = slides.length - 1;
    }
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.transform = `translateX(-${slideIndex * 100}%)`;
    }
}

function nextSlide() {
    slideIndex++;
    showSlides();
}

function prevSlide() {
    slideIndex--;
    showSlides();
}
setInterval(nextSlide, 4000);
showSlides();

