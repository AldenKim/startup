document.addEventListener('DOMContentLoaded', function() {
    /*const favoriteGenres = localStorage.getItem('checkboxValues');
    const favoriteGenresElement = document.getElementById('favoriteGenres');
    if (!favoriteGenres || favoriteGenres === 'undefined') {
        document.getElementById('favoriteGenres').textContent = 'No favorite genres selected.';
    } else {
        const genreArray = favoriteGenres.split(',').filter(genre => genre.trim() !== '');
        document.getElementById('favoriteGenres').textContent = genreArray.join(', ');
    }

    favoriteGenresElement.style.color = '#fede7e';
    favoriteGenresElement.style.fontWeight = 'bold';*/

    fetch(`/api/user/${localStorage.getItem('userName')}/genres`)
        .then(response => response.json())
        .then(genres => {
            const favoriteGenresElement = document.getElementById('favoriteGenres');
            if (!genres || genres.length === 0) {
                favoriteGenresElement.textContent = 'No favorite genres selected.';
            } else {
                favoriteGenresElement.textContent = genres.join(', ');
            }

            favoriteGenresElement.style.color = '#fede7e';
            favoriteGenresElement.style.fontWeight = 'bold';
        })
        .catch(error => console.error('Error fetching favorite genres:', error));

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

    let watchlist = localStorage.getItem('watchlist');

    console.log(watchlist);

    if(!watchlist) {
        watchlist = [];
    }
    else{
        watchlist = watchlist.split(',').filter(item => item.trim() !== '');
    }

    document.querySelectorAll('.recommendation button[type="submit"]').forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();

            const movieID = this.parentElement.parentElement.parentElement.querySelector('div').textContent;

            if (!watchlist.includes(movieID)) {
                watchlist.push(movieID);
        
                localStorage.setItem('watchlist', watchlist);

                alert('Movie added to watchlist: ' + movieID);
            }
            else {
                alert('Movie is already in the watchlist: ' + movieID);
            }

            console.log('Updated Watchlist:', watchlist);
        });
    });

    document.querySelector('form').addEventListener('submit', function(event) {
        event.preventDefault();
    });
});