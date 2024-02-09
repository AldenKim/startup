
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

function addMessageToQueue(message) {
    messageQueue.push(message);
    if (messageQueue.length > MAX_MESSAGES) {
        messageQueue.shift();
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
