const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.user_signup = (req, res, next) => {
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length > 0) {
                return res.status(422).json({
                    message: "Mail existed!"
                })
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err)
                        return res.status(500).json({ err });
                    else {
                        const user = new User({
                            _id: mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash
                        });

                        user
                            .save()
                            .then(result => {
                                console.log(result);
                                res.status(201).json({
                                    message: 'User created'
                                })
                            })
                            .catch(err => res.status(500).json({ err }))
                    }

                })
            }
        })
        .catch(next)
}

exports.user_login = (req, res, next) => {
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(404).json({
                    message: "Auth failed!"
                });
            }

            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: "Auth failed!"
                    });
                }

                if (result) {
                    const token = jwt.sign(
                        {
                            email: user[0].email,
                            userId: user[0]._id
                        },
                        process.env.JWT_KEY,
                        {
                            expiresIn: "1h"
                        },
                    );

                    return res.status(200).json({
                        message: "Auth successful!",
                        token
                    })
                }

                return res.status(401).json({
                    message: "Auth failed!"
                })

            })
        })
        .catch(err => {
            res.status(500).json({
                err
            })
        })
}

exports.user_delete = (req, res, next) => {
    User.remove({ _id: req.params.userId })
        .exec()
        .then(response => {
            res.status(200).json({
                response,
                message: "User deleted"
            })
        })
        .catch(err => {
            res.status(500).json({
                err
            })
        })
}