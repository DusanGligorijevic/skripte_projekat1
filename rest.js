const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');
const users = require('./routes/users');
const authors = require('./routes/authors');
const books = require('./routes/books');
const publishers = require('./routes/publishers');
const bcrypt = require('bcrypt');
const http = require('http');
const path = require('path');
const { Server } = require("socket.io");
const history = require('connect-history-api-fallback');
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:8080',
        methods: ['GET', 'POST'],
        credentials: true
    },
    allowEIO3: true
});

var corsOptions = {
    origin: 'http://localhost:8080',
    optionsSuccessStatus: 200
}

app.use(express.json());

app.use(cors(corsOptions));
app.use('/api', books);
app.use('/api', authors);
app.use('/api', users);
app.use('/api', publishers);
app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Credentials", "true");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });
function authSocket(msg, next) {
    if (msg[1].token == null) {
        next(new Error("Not authenticated"));
    } else {
        jwt.verify(msg[1].token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) {
                next(new Error(err));
            } else {
                msg[1].user = user;
                next();
            }
        });
    }
}

io.on('connection', socket => {
    socket.use(authSocket);

        socket.on('comment', msg => {
            Books.create({ body: msg.Name, artId: msg.Description, userId: msg.user.userId })
                .then( rows => {
                    Books.findOne({ where: { id: rows.id }, include: ['user'] })
                        .then( msg => io.emit('comment', JSON.stringify(msg)) )
                }).catch( err => res.status(500).json(err) );
        });



    socket.on('error', err => socket.emit('error', err.message) );
});
const staticMdl = express.static(path.join(__dirname, 'dist'));
app.use(staticMdl);

app.use(history({ index: '/index.html' }));

app.use(staticMdl);

server.listen({ port: 8001 }, async () => {
    await sequelize.authenticate();
});