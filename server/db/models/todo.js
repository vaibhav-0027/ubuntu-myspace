'use-strict';

module.exports = (sequelize, DataTypes) => {
    const Todo = sequelize.define('todo', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            field: 'id',
            defaultValue: DataTypes.UUIDV4,
        },
        text: {
            type: DataTypes.STRING,
            field: 'text',
        },
        status: {
            type: DataTypes.INTEGER,
            field: 'status',
            validate: {
                min: 0, max: 1
            }
        },
        createdAt: {
            type: DataTypes.DATE,
            field: 'created_at',
        },
        updatedAt: {
            type: DataTypes.DATE,
            field: 'updated_at',
        },
    }, { tableName: 'todo' });

    Todo.associate = ( { User } ) => {
        Todo.belongsTo(User, {
            foreignKey: {
                name: 'userId',
                field: 'user_id'
            }
        });
    }

    return Todo;
}