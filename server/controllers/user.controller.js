const db = require("../db");
const User = db.User;
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.findUserById = async (id) => {
    return await User.findByPk(id);
}

exports.findUserByEmail = async (email) => {
    return await User.findOne({
        where: {
            email,
        }
    });
}

exports.createUser = async (name, email, password) => {
    const hash = await bcrypt.hash(password, 10);

    const user = await User.create({
        name, 
        email,
        password: hash,
    });

    return user;
}