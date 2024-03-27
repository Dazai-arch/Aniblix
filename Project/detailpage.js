// Function to extract URL parameters
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
fetch('http://localhost:3000/movie-details', {
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

    // Parse the release date string
    const releaseDate = new Date(data.release_date);

    // Format the date to DD-MM-YYYY
    const formattedReleaseDate = `${('0' + releaseDate.getDate()).slice(-2)}-${('0' + (releaseDate.getMonth() + 1)).slice(-2)}-${releaseDate.getFullYear()}`;

    // Update the HTML element with the formatted release date
    document.querySelector('.release_date').innerHTML = `Release Date: ${formattedReleaseDate}`;

    // Update other details accordingly
  })
  .catch(error => console.error('Error:', error));


    fetch('http://localhost:3000/movie-details1', {
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
          listItem.querySelector('img').src = castMember.movie_img; // Set the src attribute
          listItem.querySelector('img').alt = castMember.name; // Set the alt attribute
        }
  });

  // Update other details accordingly
})
.catch(error => console.error('Error:', error));

    fetch('http://localhost:3000/movie-details2', {
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
        const castListItems = document.querySelectorAll('.ca1 li');

  // Loop through the cast data and update the list items
        data.forEach((castMember, index) => {
        if (index < castListItems.length) {
          const listItem = castListItems[index];
          listItem.querySelector('span').textContent = castMember.name;
          listItem.querySelector('img').src = castMember.movie_img; // Set the src attribute
          listItem.querySelector('img').alt = castMember.name; // Set the alt attribute
        }
  });

  // Update other details accordingly
})
.catch(error => console.error('Error:', error));

