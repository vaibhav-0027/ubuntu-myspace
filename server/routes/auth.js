const express = require("express");
const UserControls = require("../controllers/user.controller");
const bcrypt = require("bcryptjs");
const jwtGenerator = require("../utils/jwtGenerator");
const authorize = require("../middleware/authorize");
const router = express.Router();

router.post('/check-email', async (req, res) => {
    try {   
        const { email } = req.body;
        const user = await UserControls.findUserByEmail(email);

        if(user) {
            return res.send("User already exist");
        }

        return res.send("OK");
    } catch (err) {
        return res.send(err);
    }
});

router.post('/signup', async (req, res) => {
    try {   
        const { email, password, name } = req.body;
        const user = await UserControls.findUserByEmail(email);

        if(user !== null) {
            return res.status(501).send({ success: false, exist: true });
        }
        
        await UserControls.createUser(name, email, password);
        return res.send({ success: true });
    } catch (err) {
        return res.status(501).send(err);
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await UserControls.findUserByEmail(email);
        if(!user) {
            return res.status(400).send("User does not exist");
        }

        bcrypt.compare(password, user.password, (err, isMatch) => {
            if(isMatch) {
                const jwtToken = jwtGenerator(user.id);
                return res.json({ jwtToken, id: user.id, name: user.name });
            } else {
                return res.status(401).send(`Invalid Password ${password}`);
            }
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Something went wrong!");
    }
});

router.get('/verify', authorize, async (req, res) => {
    try {
        res.json(true);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

module.exports = router;