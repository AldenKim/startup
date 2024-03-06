document.addEventListener('DOMContentLoaded', function() {
    fetch('https://api.quotable.io/random')
        .then(response => response.json())
        .then(data => {
            const quoteElement = document.getElementById('quote');
            const authorNameElement = document.getElementById('author');

            quoteElement.textContent = `"${data.content}"`;

            authorNameElement.textContent = `- ${data.author}`;
        })
        .catch(error => {
            console.error('Error fetching quote:', error);
        });
});