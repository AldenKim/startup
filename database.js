const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('startup');
const userCollection = db.collection('user');

(async function testConnection() {
    await client.connect();
    await db.command({ ping: 1 });
  })().catch((ex) => {
    console.log(`Unable to connect to database with ${url} because ${ex.message}`);
    process.exit(1);
  });

function getUser(userName) {
    return userCollection.findOne({ userName: userName });
}

function getUserByToken(token) {
  return userCollection.findOne({ token: token })
}

function addFavGenres(userName, fav_genres) {
  return userCollection.updateOne(
    { userName: userName },
    { $addToSet: { fav_genres: { $each: fav_genres } } }
);
}

async function createUser(userName, password) {
    const passwordHash = await bcrypt.hash(password, 10);

    const user = {
        userName: userName,
        password: passwordHash,
        token: uuid.v4(),
        fav_genres: [],
        movieRatings: {},
        watchlist: []
      };

    await userCollection.insertOne(user);

    return user;
}

module.exports = {
    getUser,
    createUser,
    getUserByToken,
    addFavGenres
}