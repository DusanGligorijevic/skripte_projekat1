const { sequelize, Books} = require('../models');
const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const Joi = require('joi');

const sema = Joi.object().keys({
    name: Joi.string().required(),
    authorId: Joi.required(),
    publisherId: Joi.required(),
    description: Joi.string().required()

});
const route = express.Router();
route.use(express.json());
route.use(express.urlencoded({ extended: true }));

function authToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.status(401).json({ msg: 'Greska' });

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).json({ msg: 'Greska' });

        req.user = user;

        next();
    });
}

//route.use(authToken);


route.get('/books', (req, res) => {

    Books.findAll({ include: ['author','publisher'] })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );

});

route.get('/books/:id', (req, res) => {

    Books.findOne({ where: { id: req.params.id }, include: ['author'] })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );

});

route.post('/books', (req, res) => {
    let { error } = sema.validate(req.body);  // Object decomposition - dohvatamo samo gresku

    // Ako su podaci neispravni prijavimo gresku
    if (error)
        res.status(400).send(error.details[0].message);  // Greska zahteva
    else {
        Books.create({
            name: req.body.name, description: req.body.description,
            authorId: req.body.authorId, publisherId: req.body.publisherId
        })
            .then(rows => res.json(rows))
            .catch(err => res.status(500).json(err));
    }
});

route.put('/books/:id', (req, res) => {
    let { error } = sema.validate(req.body);  // Object decomposition - dohvatamo samo gresku

    // Ako su podaci neispravni prijavimo gresku
    if (error)
        res.status(400).send(error.details[0].message);  // Greska zahteva
    else {
        Books.findOne({where: {id: req.params.id}, include: ['author']})
            .then(msg => {
                msg.name = req.body.name;

                msg.save()
                    .then(rows => res.json(rows))
                    .catch(err => res.status(500).json(err));
            })
            .catch(err => res.status(500).json(err));
    }
});

route.delete('/books/:id', (req, res) => {

    Books.findOne({ where: { id: req.params.id }, include: ['author'] })
        .then( msg => {
            msg.destroy()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) );
});
module.exports = route;