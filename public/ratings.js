class Ratings{
    constructor(){
        const userName = document.querySelector('.user-name');
        //userName.textContent = this.getUserName();
        this.fetchUserData(this.getUserName());
        this.checkboxes = document.querySelectorAll('.form-check-input');
        this.checkboxes.forEach((checkbox) => {
            checkbox.addEventListener('change', () => {
                this.updateCheckboxValues();
            });
        });
    }

    fetchUserData(userName) {
        fetch(`/api/user/${userName}`)
            .then(response => response.json())
            .then(user => {
                const userNameElement = document.querySelector('.user-name');
                userNameElement.textContent = user.username;
            })
            .catch(error => console.error('Error fetching user data:', error));
    }

    getUserName() {
        return localStorage.getItem('userName') ?? 'Unknown';
    }

    updateCheckboxValues() {
        // Reset checkboxValues array
        this.checkboxValues = [];
        // Iterate over checkboxes to check their state
        this.checkboxes.forEach((checkbox) => {
            if (checkbox.checked) {
                // If checkbox is checked, add its value to the array
                this.checkboxValues.push(checkbox.value);
            }
        });
        updateGenres(this.getUserName(), this.checkboxValues);
    }

    getCheckboxValues() {
        return this.checkboxValues;
    }
}

const ratings = new Ratings();

document.querySelector('button[type="submit"]').addEventListener('click', function() {
    event.preventDefault();
    const checkboxValues = ratings.getCheckboxValues();
    console.log('Checkbox values:', checkboxValues);
    localStorage.setItem('checkboxValues', checkboxValues);
});

document.querySelector('button[type="submit"]').addEventListener('click', function() {
    event.preventDefault();
    
    const movie1Rating = document.querySelector('input[name="rate"]:checked').value;
    const movie2Rating = document.querySelector('input[name="rate2"]:checked').value;
    const movie3Rating = document.querySelector('input[name="rate3"]:checked').value;

    console.log('Movie 1 Rating:', movie1Rating);
    console.log('Movie 2 Rating:', movie2Rating);
    console.log('Movie 3 Rating:', movie3Rating);
    
    localStorage.setItem('movie1Rating', movie1Rating);
    localStorage.setItem('movie2Rating', movie2Rating);
    localStorage.setItem('movie3Rating', movie3Rating);

    updateMovieRatings(ratings.getUserName(), 'movie1', movie1Rating);
    updateMovieRatings(ratings.getUserName(), 'movie2', movie2Rating);
    updateMovieRatings(ratings.getUserName(), 'movie3', movie3Rating);

    window.location.href = "recommendations.html";
});

const MAX_MESSAGES = 3;
const messageQueue = [];
const newsQueue = [];

function addMessageToQueue(message) {
    messageQueue.push(message);
    if (messageQueue.length > MAX_MESSAGES) {
        messageQueue.shift();
    }
}

function addNewsToQueue(news) {
    newsQueue.push(news);
    if(newsQueue.length > MAX_MESSAGES) {
        newsQueue.shift();
    }
}

function displayMessages() {
    const chatText = document.querySelector('.notification');
    chatText.innerHTML = ''; // Clear existing messages
    
    messageQueue.forEach(message => {
        const messageElement = document.createElement('div');
        messageElement.classList.add('user-notif');
        messageElement.innerHTML = message;
        chatText.appendChild(messageElement);
    });
}

function generateRandomRating() {
    return Math.floor(Math.random() * 5) + 1;
}

setInterval(() => {
    const rating = generateRandomRating();
    const message = `<span class="user-name">Pam</span> rated a movie ${rating} stars`;
    addMessageToQueue(message); // Add message to the queue
    displayMessages(); // Display messages
}, 5000);

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
        console.error('Error fetching movie news:', error);
    });

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
            // You can perform additional actions after updating favorite genres if needed
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
    })
    .catch(error => console.error(`Error updating rating for ${movie}:`, error));
}