'use-strict';

const todo = require("./todo");

module.exports = (sequelize, DataTypes) => {
    const File = sequelize.define('file', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            field: 'id',
            defaultValue: DataTypes.UUIDV4,
        },
        name: {
            type: DataTypes.STRING,
            field: 'name'
        },
        size: {
            type: DataTypes.INTEGER,
            field: 'size',
            defaultValue: 0,
        },
        url: {
            type: DataTypes.STRING,
            field: 'url',
        },
        type: {
            type: DataTypes.INTEGER,
            field: 'type',
            validate: {
                min: 0, max: 1
            }
        },
        parentId: {
            type: DataTypes.UUID,
            field: 'parent_id'
        },
        createdAt: {
            type: DataTypes.DATE,
            field: 'created_at',
        },
        updatedAt: {
            type: DataTypes.DATE,
            field: 'updated_at',
        },
    }, { tableName: 'file' });

    File.associate = ({ User }) => {
        File.belongsTo(User, {
            foreignKey: {
                name: 'userId',
                field: 'user_id',
            }
        });
    }

    return File;
}