import React from 'react';
import './watchlist.css';

export function Watchlist() {
    React.useEffect(() => {
        fetch(`/api/user/${localStorage.getItem('userName')}/watchlist`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(watchlist => {
                const checkboxes = document.querySelectorAll('.form-check-input');
                const labels = document.querySelectorAll('.form-check-label');

                if (!watchlist || watchlist.length === 0 || !Array.isArray(watchlist)) {
                    const mainContainer = document.querySelector('.container-fluid');
                    labels[0].textContent = 'Nothing to see here';
                    for (let i = 1; i < labels.length; i++) {
                        labels[i].style.display = 'none';
                        checkboxes[i].style.display = 'none';
                    }
                } else {
                    const movies = watchlist;
                    const numMovies = movies.length;

                    movies.forEach((movie, index) => {
                        if (index < checkboxes.length && movie !== ',') {
                            const label = checkboxes[index].parentElement.querySelector('.form-check-label');
                            label.textContent = movie;
                            checkboxes[index].style.display = 'inline-block';
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

                    fetch(`/api/user/${localStorage.getItem('userName')}/watchlist`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ watchlist: updatedWatchlist.join(',') })
                    })
                    .then(response => response.json())
                    .then(data => {
                        console.log('Watchlist updated successfully:', data);
                        localStorage.setItem('watchlist', updatedWatchlist.join(',')); // Update local storage
                    })
                    .catch(error => {
                        console.error('Error updating watchlist:', error);
                        // Handle error if updating watchlist fails
                    });

                    if (updatedWatchlist.length === 0) {
                        labels[0].textContent = 'Nothing to see here';
                        labels[0].style.display = 'inline-block';
                    }
                });
            })
            .catch(error => {
                console.error('Error fetching watchlist:', error);
                // Use local storage to display watchlist as a fallback
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
    }, []);

    return (
        <main className = "container-fluid">
            <div>
                <h1>Your watchlist</h1>
                <div className = "option">
                    <label className = "form-check-label" for = "checkbox1"></label>
                    <input className  = "form-check-input" type = "checkbox" id = "checkbox1" name="varCheckBox" value= "checkbox1"/>
                </div>

                <div className = "option">
                    <label className = "form-check-label" for = "checkbox2"></label>
                    <input className  = "form-check-input" type = "checkbox" id = "checkbox2" name="varCheckBox" value= "checkbox2"/>
                </div>

                <div className = "option">
                    <label className = "form-check-label" for = "checkbox3"></label>
                    <input className  = "form-check-input" type = "checkbox" id = "checkbox3" name="varCheckBox" value= "checkbox3"/>
                </div>
            

                <div>
                    <form method = "get">
                        <button type = "submit" className = "btn btn-primary">Remove From Watchlist</button>
                    </form>
                </div>
            </div>
        </main>
    );
}