import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function App() {
    return (
        <div className = 'body bg-dark text-light'>
            <header className = "container-fluid">
                <nav className = "navbar">
                    <a className="navbar-brand" href = "index.html">My Movie Recommendations<sup>&reg;</sup></a>
                    <menu className = "navbar-menu">
                        <li className = "nav-item">
                            <a className ="nav-link" href = "index.html">Home Page</a>
                        </li>
                        <li className = "nav-item"> 
                            <a className = "nav-link" href="ratings.html">Rate Movies</a>
                        </li>
                        <li className = "nav-item"> 
                            <a className = "nav-link" href="recommendations.html">Recommendations List</a>
                        </li>
                        <li className = "nav-item"> 
                            <a className = "nav-link" href="watchlist.html">Watchlist</a>
                        </li>
                        <li className = "nav-item"> 
                            <a className = "nav-link" href = "about.html">About Page</a>
                        </li>
                    </menu>
                </nav>
            </header>

            <main>Components go here</main>

            <footer>
                <div className = "container-fluid">
                    <span className = "text-reset">Alden Kim</span>
                    <a href = "https://github.com/AldenKim/startup">GitHub Link</a>
                </div>
            </footer>
        </div>
    );
}