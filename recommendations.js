document.addEventListener('DOMContentLoaded', function() {
    const favoriteGenres = localStorage.getItem('checkboxValues');
    const favoriteGenresElement = document.getElementById('favoriteGenres');
    if (!favoriteGenres || favoriteGenres === 'undefined') {
        document.getElementById('favoriteGenres').textContent = 'No favorite genres selected.';
    } else {
        const genreArray = favoriteGenres.split(',').filter(genre => genre.trim() !== '');
        document.getElementById('favoriteGenres').textContent = genreArray.join(', ');
    }

    favoriteGenresElement.style.color = '#fede7e';
    favoriteGenresElement.style.fontWeight = 'bold';

    const movie1Rating = parseInt(localStorage.getItem('movie1Rating'));
    const movie2Rating = parseInt(localStorage.getItem('movie2Rating'));
    const movie3Rating = parseInt(localStorage.getItem('movie3Rating'));

    const movieRatingsMap = {
        'Movie1': movie1Rating,
        'Movie2': movie2Rating,
        'Movie3': movie3Rating
    };

    const recommendationContainer = document.querySelector('.recommendation');

    const sortedMovies = Object.entries(movieRatingsMap)
        .sort(([, rating1], [, rating2]) => rating2 - rating1)
        .map(([movie, ]) => document.querySelector(`.${movie}`));

    sortedMovies.forEach(movie => recommendationContainer.appendChild(movie));
});

let watchlist = [];

document.querySelectorAll('.recommendation button[type="submit"]').forEach(button => {
    button.addEventListener('click', function(event) {
        event.preventDefault();

        const movieID = this.parentElement.parentElement.parentElement.querySelector('div').textContent;

        watchlist.push(movieID);
        
        localStorage.setItem('watchlist', watchlist);

        console.log('Updated Watchlist:', watchlist);
    });
});

document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();
});