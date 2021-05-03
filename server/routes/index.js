const express = require("express");

const router = express.Router();

router.use('/auth', require('./auth'));
router.use('/todo', require('./todo'));
router.use('/note', require("./note"));
router.use('/file', require("./file"));

module.exports = router;