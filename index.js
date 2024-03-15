const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const express = require('express');
const app = express();

const port = process.argv.length > 2 ? process.argv[2] : 3000;

let users = [
    { id: 1, username: 'user1', password: 'password1' , fav_genres: [], movieRatings: {}, watchlist: []},
    { id: 2, username: 'user2', password: 'password2' , fav_genres: [], movieRatings: {}, watchlist: []},
    { id: 3, username: 'user3', password: 'password3' , fav_genres: [], movieRatings: {}, watchlist: []}
];

app.use(express.json());

app.use(express.static('public'));

var apiRouter = express.Router();
app.use(`/api`, apiRouter);

apiRouter.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    let user = users.find(user => user.username === username);

    if (!user) {
        const newUser = { id: users.length + 1, username, password,fav_genres: [], movieRatings: {}, watchlist: [] };
        users.push(newUser);
        user = newUser;
    }

    res.json({ message: 'Login successful', user });
});

apiRouter.get('/user/:username', (req, res) => {
    const username = req.params.username;
    const user = users.find(user => user.username === username);

    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
});

apiRouter.get('/user/:username/genres', (req, res) => {
    const username = req.params.username;
    const user = users.find(user => user.username === username);

    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    res.json(user.fav_genres);
});

apiRouter.post('/user/:username/genres', (req, res) => {
    const username = req.params.username;
    const { genres } = req.body;
    const user = users.find(user => user.username === username);

    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    user.fav_genres = genres;

    res.json({ message: 'Favorite genres updated successfully', user });
});

apiRouter.post('/user/:username/rate/:movie', (req, res) => {
    const username = req.params.username;
    const movie = req.params.movie;
    const rating = req.body.rating;
    const user = users.find(user => user.username === username);

    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    if (!user.movieRatings) {
        user.movieRatings = {};
    }

    user.movieRatings[movie] = rating;

    res.json({ message: `Rating for ${movie} updated successfully`, user });
});

apiRouter.get('/user/:username/movieRatings', (req, res) => {
    const username = req.params.username;
    const user = users.find(user => user.username === username);

    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    if(!user.movieRatings) {
        user.movieRatings = {};
        
        const movies = ['movie1', 'movie2', 'movie3'];
        movies.forEach(movie => {
            user.movieRatings[movie] = 0; 
        });
    }

    res.json(user.movieRatings);
});

apiRouter.get('/user/:username/watchlist', (req, res) => {
    const username = req.params.username;
    const user = users.find(user => user.username === username);

    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    res.json(user.watchlist);
});

apiRouter.post('/user/:username/watchlist', (req, res) => {
    const username = req.params.username;
    const { watchlist } = req.body;
    const user = users.find(user => user.username === username);

    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    user.watchlist = watchlist;

    res.json({ message: 'Watchlist updated successfully', user });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});