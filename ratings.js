
class Ratings{
    constructor(){
        const userName = document.querySelector('.user-name');
        userName.textContent = this.getUserName();
    }

    getUserName() {
        return localStorage.getItem('userName') ?? 'Unknown';
    }
}

const ratings = new Ratings();

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

function generateRandomRating() {
    return Math.floor(Math.random() * 5) + 1;
}

setInterval(() => {
    const rating = generateRandomRating();
    const message = `<span class="user-name">Pam</span> rated a movie ${rating} stars`;
    addMessageToQueue(message); // Add message to the queue
    displayMessages(); // Display messages
}, 5000);

setInterval(() => {
    const randomIndex = Math.floor(Math.random() * sampleNews.length);
    const randomNews = sampleNews[randomIndex];
    addNewsToQueue(randomNews); // Add news to the queue
    displayNews(); // Display news
}, 5000);
