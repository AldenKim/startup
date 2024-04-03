import React from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Ratings } from './ratings/ratings';
import { Recommendations } from './recommendations/recommendations';
import { Watchlist } from './watchlist/watchlist';
import { About } from './about/about';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function App() {
    return (
        <BrowserRouter>
            <div className = 'body'>
                <header className = "container-fluid">
                    <nav className = "navbar">
                        <NavLink className="navbar-brand" to = ''>My Movie Recommendations<sup>&reg;</sup></NavLink>
                        <menu className = "navbar-menu">
                            <li className = "nav-item">
                                <NavLink className ="nav-link" to = ''>Home Page</ NavLink>
                            </li>
                            <li className = "nav-item"> 
                                <NavLink className = "nav-link" to= 'ratings'>Rate Movies</NavLink>
                            </li>
                            <li className = "nav-item"> 
                                <NavLink className = "nav-link" to="recommendations">Recommendations List</NavLink>
                            </li>
                            <li className = "nav-item"> 
                                <NavLink className = "nav-link" to="watchlist">Watchlist</NavLink>
                            </li>
                            <li className = "nav-item"> 
                                <NavLink className = "nav-link" to = "about">About Page</NavLink>
                            </li>
                        </menu>
                    </nav>
                </header>

                <Routes>
                    <Route path = '/' element = {<Login />} exact/>
                    <Route path = '/ratings' element = {<Ratings />} />
                    <Route path = '/recommendations' element = {<Recommendations />} />
                    <Route path = '/watchlist' element = {<Watchlist />} />
                    <Route path = '/about' element = {<About />} />
                    <Route path = '*' element = {<NotFound />} />
                </Routes>

                <footer>
                    <div className = "container-fluid">
                        <span className = "text-reset">Alden Kim</span>
                        <NavLink to = "https://github.com/AldenKim/startup">GitHub Link</NavLink>
                    </div>
                </footer>
            </div>
        </BrowserRouter>
    );
}

function NotFound() {
    return <main className = 'container-fluid text-center'>404: Address unknown.</main>
}