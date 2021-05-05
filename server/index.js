const express = require("express");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const sequelizeDb = require("./db");

const app = express();


// middleware
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

app.use('/api', require("./routes"));

app.get('/*', (req, res) => {
  return res.sendFile(path.join(__dirname, "..", 'client', 'build', 'index.html'));
});

// Sync Sequelize models with db, and then start the server
sequelizeDb.sequelize.sync({alter: true}).then(() => {
    app.listen(8080, () => {
      console.log("server has started on port 8080");
    });
});
  