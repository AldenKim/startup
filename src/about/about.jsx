import React from 'react';
import './about.css';

export function About() {

    const[quote, setQuote] = React.useState('Loading...');
    const[quoteAuthor, setQuoteAuthor] = React.useState('unkown');

    React.useEffect(() => {
        fetch('https://api.quotable.io/random')
            .then(response => response.json())
            .then(data => {
                setQuote(`"${data.content}"`);
                setQuoteAuthor(`- ${data.author}`);
            })
            .catch(error => {
                console.error('Error fetching quote:', error);
            });
    }, []);

    return (
        <main className = "container-fluid">
            <div id = "picture1" className = "picture_box1"><img src = "/movieposters.jpeg" alt = "movie posters" /></div>
            <div className = "about">
                <p className="top">
                    This Movie Recommendations app will allow you to rate movies, make a list of movies for a watchlist,
                    view movies you may like, and see what other users have rated the movies. 
                </p>

                <p> 
                    With the introduction of streaming services, finding movies and TV shows has become confusing
                    and convoluted, this app will help you find movies quickly and take you to the streaming service offering that piece of media
                </p>
            </div>

            <div id = "movie-quote" className = "quote-box">
                <div id = "quote">{quote}</div>
                <div id = "author">{quoteAuthor}</div>
            </div>
            <br />

            <div id = "picture2" className = "picture_box2"><img src = "/characterlineup.jpeg" alt = "movie characters" /></div>
        </main>
    );
}
