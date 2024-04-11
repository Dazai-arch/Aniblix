fetch('http://localhost:3000/fetch-movies')
 .then(response => response.json())
 .then(data => {
    const container = document.querySelector('.container');
            data.forEach(movie => {
                const movieElement = document.createElement('div');
                movieElement.innerHTML = `
                    <a href="details.html?movie_id=${movie.movie_id}"><img src="${movie.movie_img}" alt="cmovie1" class="movie1"></a>
                    <div class="mname">
                        <a href="details.html?movie_id=${movie.movie_id}" class="m11"><p class="m1">${movie.title}<br><span class="sp1">${movie.subtitle}</span></p></a>
                    </div>
                `;
                container.appendChild(movieElement);
            });// Use the data
 })
 
 .catch(error => console.error('Error:', error));