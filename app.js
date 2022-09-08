const express = require('express');
const { sequelize, Users, Messages } = require('./models');
//const msgs = require('./routes/messages');
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cors = require('cors');
const http = require('http');
const { Server } = require("socket.io");
const history = require('connect-history-api-fallback');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
        credentials: true
    },
    allowEIO3: true
});

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}

app.use(express.json());
app.use(cors(corsOptions));

app.post('/api_register', (req, res) => {

    const obj = {
        name: req.body.name,
        email: req.body.email,
        admin: req.body.admin,
        password: bcrypt.hashSync(req.body.password, 10)
    };

    Users.create(obj).then( rows => {

        const usr = {
            userId: rows.id,
            user: rows.name
        };

        const token = jwt.sign(usr, process.env.ACCESS_TOKEN_SECRET);

        res.json({ token: token });

    }).catch( err => res.status(500).json(err) );
});

app.post('/api_login', (req, res) => {

    Users.findOne({ where: { name: req.body.name } })
        .then( usr => {

            if (bcrypt.compareSync(req.body.password, usr.password)) {
                const obj = {
                    userId: usr.id,
                    user: usr.name
                };

                const token = jwt.sign(obj, process.env.ACCESS_TOKEN_SECRET);

                res.json({ token: token });
            } else {
                res.status(400).json({ msg: "Invalid credentials"});
            }
        })
        .catch( err => res.status(500).json(err) );
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
        Messages.create({ body: msg.body, artId: msg.artId, userId: msg.user.userId })
            .then( rows => {
                Messages.findOne({ where: { id: rows.id }, include: ['user'] })
                    .then( msg => io.emit('comment', JSON.stringify(msg)) )
            }).catch( err => res.status(500).json(err) );
    });


    socket.on('error', err => socket.emit('error', err.message) );
});

 //app.get('/', authToken, (req, res) => {
  //   res.sendFile('index.html', { root: './static' });
 //});

const staticMdl = express.static(path.join(__dirname, 'dist'));
app.use(staticMdl);

app.use(history({ index: '/index.html' }));

app.use(staticMdl);
server.listen({ port:process.env.PORT || 8000 }, async () => {
    await sequelize.authenticate();
});