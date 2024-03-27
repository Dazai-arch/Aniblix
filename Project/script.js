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
function toggleContent(id) {
    var content = document.getElementById(id);
    content.classList.toggle('show');
    if (content.classList.contains('show')) {

      var dynamicContent = document.createElement('p');
      dynamicContent.textContent = 'Dynamically created content for ' + id;

      document.querySelector('.dynamic-content').appendChild(dynamicContent);
    } else {
  
      document.querySelector('.dynamic-content').innerHTML = '';
    }
  }
  function showDetails(itemId) {
    var detailsContainer = document.getElementById("itemDetails");
    var itemDetails = "";

    if(itemId === 'item5'){
        itemDetails = "<img src='./iMAGES/AniBlix (2).png' alt='Item 5' class='itemm'>";
    } else if (itemId === 'item1') {
        itemDetails = "<img src='./iMAGES/project (4).jpg' alt='Item 1' class='itemm'><p>Anime history spans generations, evolving from post-World War II works like <b>Astro Boy (1963)</b>, pioneering the medium. The '70s witnessed the rise of mecha with <b>Mobile Suit Gundam (1979)</b>, while the '80s birthed iconic franchises like <b>Dragon Ball (1986)</b> and <b>Akira (1988)</b>, shaping global perceptions. The '90s saw a surge in diverse genres from <b>Neon Genesis Evangelion (1995)</b> to <b>Pokémon (1997)</b>, cementing anime's global appeal. The 2000s ushered in digital animation and storytelling innovations with <b>Spirited Away (2001)</b> and <b>Naruto (2002)</b>, while the 2010s introduced broader international recognition through streaming platforms and cross-cultural collaborations, setting the stage for anime's continued evolution.</p>";
    } else if (itemId === 'item2') {
        itemDetails = "<img src='./iMAGES/1328866.png' alt='Item 2' class='itemm'><p>Anime is a form of animation that originates from Japan, characterized by its distinctive art style, storytelling, and thematic range. It encompasses a wide variety of genres, including comedy, drama, sci-fi, action-adventure, horror, and more, catering to a broad audience. Anime is produced through both hand-drawn and computer-generated animation techniques, with a focus on detail, character design, and the use of camera effects such as panning, zooming, and angle shots. Unlike Western animation,which often emphasizes movement, anime places more emphasis on the setting and character expressions.</p>";
    } else if (itemId === 'item3') {
        itemDetails = "<img src='./iMAGES/736462.png' alt='Item 3' class='itemm'><p>Anime tracking refers to the process of keeping track of anime series and manga that you have watched or are currently watching. This can involve logging episodes watched, rating them, and sharing your progress with others. Anime tracking can be done through various platforms and apps, which allow users to manage their anime and manga lists, view details about their favorite series, and discover new content.</p>";
    } else if (itemId === 'item4') {
        itemDetails = "<img src='./iMAGES/606667.jpg' alt='Item 4' class='itemm'><p>Fans often book tickets in advance for events such as anime conventions, film screenings, or live performances featuring voice actors or creators. These bookings allow fans to secure their attendance and sometimes gain access to exclusive perks or early bird discounts. If anime booking refers to something else, please provide more context for clarification.</p>";
    } 
   
    detailsContainer.innerHTML = itemDetails;
}
showDetails('item5')