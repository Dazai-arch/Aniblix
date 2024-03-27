const animeContainer = document.getElementById('anime-container');

fetch('https://api.jikan.moe/v3/search/anime?q=naruto')
    .then(response => response.json())
    .then(data => {
        data.results.forEach(anime => {
            const animeCard = document.createElement('div');
            animeCard.className = 'anime-card';

            const img = document.createElement('img');
            img.src = anime.image_url;
            img.alt = anime.title;

            const title = document.createElement('h3');
            title.textContent = anime.title;

            animeCard.appendChild(img);
            animeCard.appendChild(title);

            animeContainer.appendChild(animeCard);
        });
    })
    .catch(error => console.error('Error fetching data:', error));
