const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const UsersControllers = require('../controllers/users');

router.post('/signup', UsersControllers.user_signup);

router.post('/login', UsersControllers.user_login);

router.delete('/:userId', UsersControllers.user_delete);

module.exports = router