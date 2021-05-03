'use-strict';

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            field: 'id',
            defaultValue: DataTypes.UUIDV4,
        },
        name: {
            type: DataTypes.STRING,
            field: 'name',
        },
        email: {
            type: DataTypes.STRING,
            field: 'email',
        },
        password: {
            type: DataTypes.STRING,
            field: 'password',
        },
        createdAt: {
            type: DataTypes.DATE,
            field: 'created_at',
        },
        updatedAt: {
            type: DataTypes.DATE,
            field: 'updated_at',
        },
    }, { tableName: 'user' });

    User.associate = ({ Todo, Note, File }) => {
        User.hasMany(Todo, {
            foreignKey: {
                name: 'userId',
                field: 'user_id',
            },
            onDelete: 'CASCADE'
        });

        User.hasMany(Note, {
            foreignKey: {
                name: 'userId',
                field: 'user_id',
            },
            onDelete: 'CASCADE'
        });

        User.hasMany(File, {
            foreignKey: {
                name: 'userId',
                field: 'user_id',
            },
            onDelete: 'CASCADE'
        });
    }

    return User;
}