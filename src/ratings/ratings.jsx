import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ratings.css';
import { useNavigate } from 'react-router-dom';

export function Ratings(props) {
    const navigate = useNavigate();
    const [newsMessages, setNewsMessages] = React.useState([]);
    const MAX_MESSAGES = 3;
    const newsQueue = [];
    let checkboxValues = [];
    let checkboxes;
    let socket;
    React.useEffect(() => {
        checkboxes = document.querySelectorAll('.form-check-input');
        checkboxes.forEach((checkbox) => {
            checkbox.addEventListener('change', () => {
                updateCheckboxValues();
            });
        });
        fetchNews();
        configureSocket();
    }, []); 

    function submitAll() {
        event.preventDefault();
        const checkBoxVals = getCheckboxValues();
        console.log('Checkbox values:', checkBoxVals);
        localStorage.setItem('checkboxValues', checkBoxVals);

        const movie1Rating = document.querySelector('input[name="rate"]:checked').value;
        const movie2Rating = document.querySelector('input[name="rate2"]:checked').value;
        const movie3Rating = document.querySelector('input[name="rate3"]:checked').value;

        console.log('Movie 1 Rating:', movie1Rating);
        console.log('Movie 2 Rating:', movie2Rating);
        console.log('Movie 3 Rating:', movie3Rating);
        
        localStorage.setItem('movie1Rating', movie1Rating);
        localStorage.setItem('movie2Rating', movie2Rating);
        localStorage.setItem('movie3Rating', movie3Rating);

        updateMovieRatings(props.userName, 'Movie1', movie1Rating);
        updateMovieRatings(props.userName, 'Movie2', movie2Rating);
        updateMovieRatings(props.userName, 'Movie3', movie3Rating);

        alert("Ratings Submitted, continue to the recommendations page");
    }

    function updateCheckboxValues() {
        
        checkboxValues = [];
        
        checkboxes.forEach((checkbox) => {
            if (checkbox.checked) {
                
                checkboxValues.push(checkbox.value);
            }
        });
        updateGenres(props.userName, checkboxValues);
    }

    function getCheckboxValues() {
        return checkboxValues;
    }

    function updateGenres(username, favoriteGenres) {
        fetch(`/api/user/${username}/genres`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ genres: favoriteGenres })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Favorite genres updated:', data);
        })
        .catch(error => console.error('Error updating favorite genres:', error));
    }

    function updateMovieRatings(username, movie, rating) {
        fetch(`/api/user/${username}/rate/${movie}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ rating: rating })
        })
        .then(response => response.json())
        .then(data => {
            console.log(`Rating for ${movie} updated successfully:`, data);
            broadcast(username, 'movie_rating', { movie: movie, rating: rating });
        })
        .catch(error => console.error(`Error updating rating for ${movie}:`, error));
    }

    function addNewsToQueue(news) {
        newsQueue.push(news);
        if(newsQueue.length > MAX_MESSAGES) {
            newsQueue.shift();
        }
    }

    function displayNews() {
        const newsContainer = document.querySelector('.news');
        newsContainer.innerHTML = ''; 
    
        newsQueue.forEach(newsItem => {
            const newsElement = document.createElement('div');
            newsElement.classList.add('news-notif');
            newsElement.textContent = newsItem;
            newsContainer.appendChild(newsElement);
        });
    }

    const sampleNews = [
        "Ryan Reynolds appears in new superbowl trailer",
        "LALALAND sequel announced",
        "Tom Cruise earns a high rating on his new movie"
    ];

    function fetchNews() {
        fetch('https://newsapi.org/v2/everything?q=movie&sortBy=popularity&apiKey=41d98d4d3d784d2a8b4a4c44bd6c6360')
        .then(response => response.json())
        .then(data => {
            const articles = data.articles;
            const newsContainer = document.querySelector('.news');
    
            newsContainer.innerHTML = '';
    
            articles.sort(() => Math.random() - 0.5);
    
            for (let i = 0; i < Math.min(3, articles.length); i++) {
                const article = articles[i];
                const newsElement = document.createElement('div');
                newsElement.classList.add('news-notif');
                newsElement.textContent = article.title;
                newsContainer.appendChild(newsElement);
            }
        })
        .catch(error => {
            setInterval(() => {
                const randomIndex = Math.floor(Math.random() * sampleNews.length);
                const randomNews = sampleNews[randomIndex];
                addNewsToQueue(randomNews); // Add news to the queue
                displayNews(); // Display news
            }, 5000);
        });
    }

    function configureSocket() {
        const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
        socket = new WebSocket(`${protocol}://${window.location.host}/ws`);

        socket.onopen = (event) => {
            displayMessage('system', 'User', 'connected');
        };

        socket.onclose = (event) => {
            displayMessage('system', 'User', 'disconnected');
        };

        socket.onmessage = async (event) => {
            const msg = JSON.parse(await event.data.text());
            switch(msg.type) {
                case 'movie_rating':
                    displayMessage('user', msg.from, `rated ${msg.value.movie} ${msg.value.rating} stars`);
                    break;
                default:
                    console.error('Unknown message type:', msg.type);
            }
        };
    }

    function displayMessage(cls, from, msg) {
        const chatText = document.querySelector('#messages');
        chatText.innerHTML = `<div class="event"><span class="${cls}-event">${from}</span> ${msg}</div>` + chatText.innerHTML;
    }

    function broadcast(from, type, value) {
        const event = {
            from: from,
            type: type,
            value: value,
        };
        socket.send(JSON.stringify(event));
    }

    return (
        <main className="ratings-main container-fluid">
            <div className="users">
                User: {' '}
                <span className="user-name">{props.userName}</span>
            </div>
            <div className="notification" id="messages"></div>
            <div className="Updates">
                Movie/TV show updates in the News:
            </div>
            <div className="news">
                {newsMessages.map((news, index) => (
                    <div key={index} className="news-notif">{news}</div>
                ))}
            </div>

            <br />
            <div className="Checkboxes">
                <legend>Mark Genres You Like:</legend>
                <div className="ratings-checkboxdiv1 form-check">
                    <input className="ratings-checkbox1 form-check-input" type="checkbox" name="comedyCheckBox" id="comedies" value="Comedy" />
                    <label className="form-check-label" htmlFor="genre1">Comedies</label>
                </div>
                <div className="ratings-checkboxdiv2 form-check">
                    <input className="ratings-checkbox2 form-check-input" type="checkbox" name="actionCheckBox" id="action" value="Action" />
                    <label className="form-check-label" htmlFor="genre2">Action</label>
                </div>
                <div className="ratings-checkboxdiv3 form-check">
                    <input className="ratings-checkbox3 form-check-input" type="checkbox" name="romanceCheckBox" id="romance" value="Romance" />
                    <label className="form-check-label" htmlFor="genre3">Romance</label>
                </div>
            </div>
            <br />
            
            <legend className="rating-label">Rate the Following:</legend>
            <div className="rating-specific">
                <div className="RatingMovie1">
                    <div><b>Superbad 2007</b></div>
                    <img src="PhotosForWebsite/Comedy1.jpg" width="200" alt="Comedy" className="MoviePhoto" />
                    <legend>Rate 1 out of 5</legend>
                    <div className="rate">
                        <input type="radio" id="star5" name="rate" value="5" />
                        <label htmlFor="star5" title="text">5 stars</label>
                        <input type="radio" id="star4" name="rate" value="4" />
                        <label htmlFor="star4" title="text">4 stars</label>
                        <input type="radio" id="star3" name="rate" value="3" />
                        <label htmlFor="star3" title="text">3 stars</label>
                        <input type="radio" id="star2" name="rate" value="2" />
                        <label htmlFor="star2" title="text">2 stars</label>
                        <input type="radio" id="star1" name="rate" value="1" />
                        <label htmlFor="star1" title="text">1 star</label>
                    </div>
                </div>

                <div className="RatingMovie2">
                    <div><b>Spiderman 2023</b></div>
                    <img src="PhotosForWebsite/Action1.jpg" width="200" alt="Action" className="MoviePhoto" />
                    <legend>Rate 1 out of 5</legend>
                    <div className="rate2">
                        <input type="radio" id="star5-2" name="rate2" value="5" />
                        <label htmlFor="star5-2" title="text">5 stars</label>
                        <input type="radio" id="star4-2" name="rate2" value="4" />
                        <label htmlFor="star4-2" title="text">4 stars</label>
                        <input type="radio" id="star3-2" name="rate2" value="3" />
                        <label htmlFor="star3-2" title="text">3 stars</label>
                        <input type="radio" id="star2-2" name="rate2" value="2" />
                        <label htmlFor="star2-2" title="text">2 stars</label>
                        <input type="radio" id="star1-2" name="rate2" value="1" />
                        <label htmlFor="star1-2" title="text">1 star</label>
                    </div>
                </div>
                
                <div className="RatingMovie3">
                    <div><b>The Notebook 2004</b></div>
                    <img src="PhotosForWebsite/Romance1.jpg" width="200" alt="Romance" className="MoviePhoto" />
                    <legend>Rate 1 out of 5</legend>
                    <div className="rate3">
                        <input type="radio" id="star5-3" name="rate3" value="5" />
                        <label htmlFor="star5-3" title="text">5 stars</label>
                        <input type="radio" id="star4-3" name="rate3" value="4" />
                        <label htmlFor="star4-3" title="text">4 stars</label>
                        <input type="radio" id="star3-3" name="rate3" value="3" />
                        <label htmlFor="star3-3" title="text">3 stars</label>
                        <input type="radio" id="star2-3" name="rate3" value="2" />
                        <label htmlFor="star2-3" title="text">2 stars</label>
                        <input type="radio" id="star1-3" name="rate3" value="1" />
                        <label htmlFor="star1-3" title="text">1 star</label>
                    </div>
                </div>
            </div>
            <form className = "ratings-button-1" >
                <button type="submit" className="btn btn-primary" id="submission" onClick={() => submitAll()}>Submit Ratings</button>
            </form>
            <form className = "ratings-button-2" method = "get">
                <button type = "button" className = "btn btn-primary" id = "continue" onClick = {() => navigate('/recommendations')}>Continue</button>
            </form>
        </main>
    );
}