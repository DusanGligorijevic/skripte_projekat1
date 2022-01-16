const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');
const users = require('./routes/users');
const authors = require('./routes/authors');
const books = require('./routes/books');
const publishers = require('./routes/publishers');
var corsOptions = {
    origin: 'http://localhost:8080',
    optionsSuccessStatus: 200
}

const app = express();
app.use(cors(corsOptions));
app.use('/api', books);
app.use('/api', authors);
app.use('/api', users);
app.use('/api', publishers);
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.listen({ port: 8000 }, async () => {
    await sequelize.authenticate();
});