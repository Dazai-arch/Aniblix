function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }
  
  // Get the movie_id from the URL
  const movie_id = getParameterByName('movie_id');
  
  // Use the movie_id to fetch movie details from the server using POST
  fetch('http://localhost:3000/movie-details3', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ movie_id: movie_id })
  })
    .then(response => response.json())
    .then(data => {
      // Update the HTML elements with the movie details
      document.querySelector('.hea').href = data.youtube_link;
      document.querySelector('.movie1').src = data.movie_img;
      document.querySelector('.name').innerHTML = `${data.title}<br><span class="sp1">${data.subtitle}</span>`;
      document.querySelector('.desc').textContent = data.description;
      document.querySelector('.time').innerHTML = `Time: ${data.time}`;
      document.querySelector('.poster').src = data.movieback_img;
    })
    .catch(error => console.error('Error:', error));
  
  
      fetch('http://localhost:3000/movie-details4', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({ movie_id: movie_id })
        })
        .then(response => response.json())
        .then(data => {
          console.log(data); // Log the received data to inspect it
  
    // Update the HTML elements with the cast details
          const castListItems = document.querySelectorAll('.ca li');
  
    // Loop through the cast data and update the list items
          data.forEach((castMember, index) => {
          if (index < castListItems.length) {
            const listItem = castListItems[index];
            listItem.querySelector('span').textContent = castMember.name;
            listItem.querySelector('img').src = castMember.cast_img; // Set the src attribute
            listItem.querySelector('img').alt = castMember.name; // Set the alt attribute
          }
    });
  
    // Update other details accordingly
  })
  .catch(error => console.error('Error:', error));

  document.addEventListener('DOMContentLoaded', function () {
    var button = document.querySelector('.booktickets');
    var movieId = getParameterByName('movie_id');
    
    // Make an AJAX request to fetch the movie details based on the movie ID
    fetch('http://localhost:3000/fetch-movie-details/' + movieId)
        .then(response => response.json())
        .then(data => {
            var movieName = data.movieName;
            var movieSubtitle = data.movieSubtitle;
            var fullMovieName = movieName + ': ' + movieSubtitle;
            button.setAttribute('data-movie', fullMovieName);
        })
        .catch(error => console.error('Error:', error));
    
    button.addEventListener('click', function (event) {
        if (event.target.tagName === 'A') {
            event.preventDefault(); // Prevent the default anchor tag behavior
            
            var movieTitle = this.dataset.movie;
            localStorage.setItem('selectedMovie', movieTitle); // Store the selected movie in local storage
            window.location.href = 'boo.html'; // Redirect to boo.html
        }
    });
});




