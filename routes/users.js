const { sequelize, Users} = require('../models');
const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
require('dotenv').config();
const Joi = require('joi');

const sema = Joi.object().keys({
    name: Joi.string().required(),
    admin: Joi.required() ,
    password: Joi.string().required(),
    email: Joi.string().email().required()

});



const route = express.Router();
route.use(express.json());
route.use(express.urlencoded({ extended: true }));
route.use(bodyParser.json());


function authToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.status(401).json({ msg: 'Gresssska' });

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).json({ msg: 'Greskaaaaa' });

        req.user = user;
        next();
    });
}
function isAdmin(req, res, next) {
    if( req.user.admin == "true" ){
        return res.status(401).send("Access Denied");
    }
    next();
}
//route.use(authToken);

route.get('/users',(req, res) => {

        Users.findAll()
            .then(rows => res.json(rows))
            .catch(err => res.status(500).json(err));

});

route.get('/users/:id', (req, res) => {

    Users.findOne({ where: { id: req.params.id } })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );

});

route.post('/users',isAdmin,(req, res) => {
    let { error } = sema.validate(req.body);  // Object decomposition - dohvatamo samo gresku

    // Ako su podaci neispravni prijavimo gresku
    if (error)
        res.status(400).send(error.details[0].message);  // Greska zahteva
    else {
        Users.create({
            name: req.body.name, email: req.body.email, admin: req.body.admin,
            password: req.body.password
        })
            .then(rows => res.json(rows))
            .catch(err => res.status(500).json(err));
    }
});


route.put('/users/:id',isAdmin, (req, res) => {
    let { error } = sema.validate(req.body);  // Object decomposition - dohvatamo samo gresku

    // Ako su podaci neispravni prijavimo gresku
    if (error)
        res.status(400).send(error.details[0].message);  // Greska zahteva
    else {
        Users.findOne({where: {id: req.params.id}})
            .then(usr => {
                usr.email = req.body.email;
                usr.password = req.body.password;

                usr.save()
                    .then(rows => res.json(rows))
                    .catch(err => res.status(500).json(err));
            })
            .catch(err => res.status(500).json(err));
    }
});

route.delete('/users/:id', (req, res) => {

    Users.findOne({ where: { id: req.params.id } })
        .then( usr => {
            usr.destroy()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) );
});

module.exports = route;