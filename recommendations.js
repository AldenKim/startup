document.addEventListener('DOMContentLoaded', function() {
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
        .catch(error => {
            const favoriteGenres = localStorage.getItem('checkboxValues');
            const favoriteGenresElement = document.getElementById('favoriteGenres');
            if (!favoriteGenres || favoriteGenres === 'undefined') {
                document.getElementById('favoriteGenres').textContent = 'No favorite genres selected.';
            } else {
                const genreArray = favoriteGenres.split(',').filter(genre => genre.trim() !== '');
                document.getElementById('favoriteGenres').textContent = genreArray.join(', ');
            }

            favoriteGenresElement.style.color = '#fede7e';
            favoriteGenresElement.style.fontWeight = 'bold'
        });

        fetch(`/api/user/${localStorage.getItem('userName')}/movieRatings`)
        .then(response => response.json())
        .then(movieRatings => {
            const recommendationContainer = document.querySelector('.recommendation');
            const sortedMovies = Object.entries(movieRatings)
                .sort(([, rating1], [, rating2]) => parseInt(rating2) - parseInt(rating1)) 
                .map(([movie, rating]) => ({ movie, rating }));
            console.log(sortedMovies);
            sortedMovies.forEach(({ movie }) => {
                const movieElement = document.querySelector(`.${movie}`);
                if (movieElement) {
                    recommendationContainer.appendChild(movieElement);
                } else {
                    console.error(`Movie element not found for class: ${movie}`);
                }
            });
        })
        .catch(error => {
            console.error('Error fetching movie ratings:', error);

            // Use local storage to order movies if fetch fails
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

                fetch(`/api/user/${localStorage.getItem('userName')}/watchlist`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ watchlist: watchlist })
                })
                .then(response => response.json())
                .then(data => {
                    console.log('Watchlist updated successfully:', data);
                    localStorage.setItem('watchlist', watchlist.join(',')); // Update local storage
                    alert('Movie added to watchlist: ' + movieID);
                })
                .catch(error => {
                    console.error('Error updating watchlist:', error);
                    alert('Failed to add movie to watchlist');
                });
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