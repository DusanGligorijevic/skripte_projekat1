const express = require('express');
const { sequelize } = require('./models');
const users = require('./routes/users');
const authors = require('./routes/authors');
const books = require('./routes/books');
const publishers = require('./routes/publishers');
const path = require('path');
const jwt = require('jsonwebtoken');
require('dotenv').config();



const app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});



function getCookies(req) {
    if (req.headers.cookie == null) return {};

    const rawCookies = req.headers.cookie.split('; ');
    const parsedCookies = {};

    rawCookies.forEach( rawCookie => {
        const parsedCookie = rawCookie.split('=');
        parsedCookies[parsedCookie[0]] = parsedCookie[1];
    });

    return parsedCookies;
};

function authToken(req, res, next) {
    const cookies = getCookies(req);
    const token = cookies['token'];

    if (token == null) return res.redirect(301, '/login');

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {

        if (err) return res.redirect(301, '/login');

        req.user = user;

        next();
    });
}
function parseJwt (token) {
    console.log(token);
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};

function isAdmin (req, res, next){
    const cookies = getCookies(req);
    const token = cookies['token'];
    const user = parseJwt(token);
    if(user.isAdmin){
            return true;
    }else return false;
}
app.get('/register', (req, res) => {
    res.sendFile('register.html', { root: './static' });

});
app.get('/login', (req, res) => {
    res.sendFile('login.html', { root: './static' });
});
app.get('/naslovna', (req, res) => {
    res.sendFile('naslovna.html', { root: './static' });
});
app.get('/', authToken,  (req, res) => {
    res.sendFile('naslovna.html', { root: './static' });
});

app.get('/users', authToken, (req, res) => {
    res.sendFile('users.html', { root: './static' });
});
app.get('/authors', authToken,  (req, res) => {
    res.sendFile('authors.html', { root: './static' });
});
app.get('/publishers', authToken,  (req, res) => {
    res.sendFile('publishers.html', { root: './static' });
});
app.get('/books', authToken,  (req, res) => {
    res.sendFile('books.html', { root: './static' });
});

app.use(express.static(path.join(__dirname, 'static')));


app.listen({ port: 8080 }, async () => {
    await sequelize.authenticate();
});