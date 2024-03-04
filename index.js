const express = require('express');
const app = express();

const port = process.argv.length > 2 ? process.argv[2] : 3000;

let users = [
    { id: 1, username: 'user1', password: 'password1' },
    { id: 2, username: 'user2', password: 'password2' },
    { id: 3, username: 'user3', password: 'password3' }
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
        const newUser = { id: users.length + 1, username, password };
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

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});