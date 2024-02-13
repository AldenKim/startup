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
});