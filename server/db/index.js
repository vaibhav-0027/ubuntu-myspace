'use strict';

const {Sequelize, DataTypes} = require('sequelize');
const config = require("../config");

const UserModel = require("./models/user.js");
const TodoModel = require("./models/todo");
const NoteModel = require("./models/note");
const FileModel = require("./models/file");

const opts = {
    define: {
        freezeTableName: true
    }
}

const postgresConfig = config.postgres;
let sequelize = new Sequelize(
    postgresConfig.database, 
    postgresConfig.username, 
    postgresConfig.password, 
    Object.assign({}, 
    postgresConfig, 
    opts
));

const User = UserModel(sequelize, DataTypes);
const Todo = TodoModel(sequelize, DataTypes);
const Note = NoteModel(sequelize, DataTypes);
const File = FileModel(sequelize, DataTypes);

const dbModels = {
    sequelize, 
    Sequelize,
    User,
    Todo,
    Note,
    File,
};

Object.keys(dbModels).forEach(modelName => {
    if (dbModels[modelName].associate) {
      dbModels[modelName].associate(dbModels);
    }
});
  
  
module.exports = dbModels;