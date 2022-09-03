const { sequelize, Publishers} = require('../models');
const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const Joi = require('joi');

const sema = Joi.object().keys({
    name: Joi.string().required(),
    address: Joi.string().required()

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

route.get('/publishers', (req, res) => {

    Publishers.findAll({ include: ['books'] })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );

});

route.get('/publishers/:id', (req, res) => {

    Publishers.findOne({ where: { id: req.params.id }, include: ['books'] })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );

});

route.post('/publishers', (req, res) => {
    let { error } = sema.validate(req.body);  // Object decomposition - dohvatamo samo gresku

    // Ako su podaci neispravni prijavimo gresku
    if (error)
        res.status(400).send(error.details[0].message);  // Greska zahteva
    else {
        Publishers.create({name: req.body.name, address: req.body.address})
            .then(rows => res.json(rows))
            .catch(err => res.status(500).json(err));
    }
});

route.put('/publishers/:id', (req, res) => {
    let { error } = sema.validate(req.body);  // Object decomposition - dohvatamo samo gresku

    // Ako su podaci neispravni prijavimo gresku
    if (error)
        res.status(400).send(error.details[0].message);  // Greska zahteva
    else {
        Publishers.findOne({where: {id: req.params.id}, include: ['books']})
            .then(msg => {
                msg.address = req.body.address;

                msg.save()
                    .then(rows => res.json(rows))
                    .catch(err => res.status(500).json(err));
            })
            .catch(err => res.status(500).json(err));
    }
});

route.delete('/publishers/:id', (req, res) => {

    Publishers.findOne({ where: { id: req.params.id }, include: ['books'] })
        .then( msg => {
            msg.destroy()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) );
});
module.exports = route;