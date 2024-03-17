const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const express = require('express');
const app = express();
const DB = require('./database.js');

const authCookieName = 'movieToken';

const port = process.argv.length > 2 ? process.argv[2] : 3000;

let users = [
    { id: 1, username: 'user1', password: 'password1' , fav_genres: [], movieRatings: {}, watchlist: []},
    { id: 2, username: 'user2', password: 'password2' , fav_genres: [], movieRatings: {}, watchlist: []},
    { id: 3, username: 'user3', password: 'password3' , fav_genres: [], movieRatings: {}, watchlist: []}
];

app.use(express.json());

app.use(cookieParser());

app.use(express.static('public'));

app.set('trust proxy', true);

var apiRouter = express.Router();
app.use(`/api`, apiRouter);

apiRouter.post('/auth/create', async (req, res) => {
    if (await DB.getUser(req.body.userName)) {
        res.status(409).send({ error: 'Existing user' });
    } else {
        const user = await DB.createUser(req.body.userName, req.body.password);
        
        setAuthCookie(res, user.token);

        res.send({
            id:user._id,
        });
    }
});

apiRouter.post('/auth/login', async (req, res) => {
    const { userName, password } = req.body;

    if (!userName || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    try {
        let user = await DB.getUser(userName);

        if (!user) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }
        setAuthCookie(res, user.token);
        res.json({ message: 'Login successful', user });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

apiRouter.delete('/auth/logout', (_req, res) => {
    res.clearCookie(authCookieName);
    res.status(204).end();
})

apiRouter.get('/user/:userName', async (req, res) => {
    const user = await DB.getUser(req.params.userName);

    if (user) {
        const token = req?.cookies.token;
        res.send({ userName: user.userName, authenticated: token === user.token });
        return;
    }

    res.status(404).json({ error: 'User not found' });
});

var secureApiRouter = express.Router();
apiRouter.use(secureApiRouter);

secureApiRouter.use(async (req, res, next) => {
    authToken = req.cookies[authCookieName];
    const user = await DB.getUserByToken(authToken);
    if (user) {
      next();
    } else {
      res.status(401).send({ msg: 'Unauthorized' });
    }
});

secureApiRouter.get('/user/:userName/genres', async (req, res) => {
    const user = await DB.getUser(req.params.userName);

    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    res.json(user.fav_genres);
});

secureApiRouter.post('/user/:userName/genres', async (req, res) => {
    const { genres } = req.body;
    const user = await DB.getUser(req.params.userName);
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    DB.addFavGenres(req.params.userName, genres);

    res.json({ message: 'Favorite genres updated successfully', user });
});

secureApiRouter.post('/user/:userName/rate/:movie', async (req, res) => {
    const movie = req.params.movie;
    const rating = req.body.rating;
    const user = await DB.getUser(req.params.userName);

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

function setAuthCookie(res, authToken) {
    res.cookie(authCookieName, authToken, {
      secure: true,
      httpOnly: true,
      sameSite: 'strict',
    });
}

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});