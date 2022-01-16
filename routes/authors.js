const { sequelize, Authors} = require('../models');
const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const route = express.Router();
route.use(express.json());
route.use(express.urlencoded({ extended: true }));
const Joi = require('joi');

const sema = Joi.object().keys({
    name: Joi.string().required(),
    phoneNumber: Joi.string().required(),
    address: Joi.string().required()

});
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
route.get('/authors', (req, res) => {

    Authors.findAll({ include: ['books'] })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );

});

route.get('/authors/:id', (req, res) => {

    Authors.findOne({ where: { id: req.params.id }, include: ['books'] })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );

});

route.post('/authors', (req, res) => {
    let { error } = sema.validate(req.body);  // Object decomposition - dohvatamo samo gresku

    // Ako su podaci neispravni prijavimo gresku
    if (error)
        res.status(400).send(error.details[0].message);  // Greska zahteva
    else {
        Authors.create({name: req.body.name, phoneNumber: req.body.phoneNumber, address: req.body.address})
            .then(rows => res.json(rows))
            .catch(err => res.status(500).json(err));
    }
});

route.put('/authors/:id', (req, res) => {
    let { error } = sema.validate(req.body);  // Object decomposition - dohvatamo samo gresku

    // Ako su podaci neispravni prijavimo gresku
    if (error)
        res.status(400).send(error.details[0].message);  // Greska zahteva
    else {
        Authors.findOne({where: {id: req.params.id}, include: ['books']})
            .then(msg => {
                msg.name = req.body.name;
                msg.phoneNumber = req.body.phoneNumber;
                msg.address = req.body.address;

                msg.save()
                    .then(rows => res.json(rows))
                    .catch(err => res.status(500).json(err));
            })
            .catch(err => res.status(500).json(err));
    }
});

route.delete('/authors/:id', (req, res) => {

    Authors.findOne({ where: { id: req.params.id }, include: ['books'] })
        .then( msg => {
            msg.destroy()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) );
});
module.exports = route;