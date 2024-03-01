document.addEventListener('DOMContentLoaded', function() {
    let watchlist = localStorage.getItem('watchlist');
    const checkboxes = document.querySelectorAll('.form-check-input');
    const labels = document.querySelectorAll('.form-check-label');

    if (!watchlist) {
        const mainContainer = document.querySelector('.container-fluid');
        labels[0].textContent = 'Nothing to see here';
        for (let i = 1; i < labels.length; i++) {
            labels[i].style.display = 'none';
            checkboxes[i].style.display = 'none';
        }
    } else {
        const movies = watchlist.split(',').filter(movie => movie.trim() !== '');
        const numMovies = movies.length;

        // Display movies from the watchlist
        movies.forEach((movie, index) => {
            if (index < checkboxes.length && movie !== ',') {
                const label = checkboxes[index].parentElement.querySelector('.form-check-label');
                label.textContent = movie;
                checkboxes[index].style.display = 'inline-block'; // Show the checkbox
                label.style.display = 'inline-block';
            }
        });

        for (let i = numMovies; i < checkboxes.length; i++) {
            checkboxes[i].style.display = 'none';
            checkboxes[i].parentElement.querySelector('.form-check-label').style.display = 'none';
        }
    }

    const removeButton = document.querySelector('button[type="submit"]');
    removeButton.addEventListener('click', function(event) {
        event.preventDefault();
        const updatedWatchlist = [];
        checkboxes.forEach((checkbox, index) => {
            if (!checkbox.checked) {
                const label = checkbox.parentElement.querySelector('.form-check-label');
                const movieName = label.textContent;
                updatedWatchlist.push(movieName);
            } else {
                checkbox.style.display = 'none';
                const label = checkbox.parentElement.querySelector('.form-check-label');
                label.style.display = 'none';
                label.textContent = '';
            }
        });
        watchlist = updatedWatchlist.join(',');
        localStorage.setItem('watchlist', watchlist);

        console.log(watchlist.length)
        if (watchlist.length === 0 || watchlist.length === 1) {
            labels[0].textContent = 'Nothing to see here';
            labels[0].style.display = 'inline-block';
        }
    });

    console.log(watchlist);
});



